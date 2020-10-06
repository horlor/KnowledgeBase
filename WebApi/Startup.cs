using KnowledgeBase.DataAccess;
using KnowledgeBase.DataAccess.Repos;
using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Domain.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using KnowledgeBase.WebApi.ServiceHelpers;
using KnowledgeBase.Domain.Interfaces;
using KnowledgeBase.WebApi.Hubs;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public readonly string AllowedOrigins = "_Allowed_";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSignalR(builder =>
            {
                builder.ClientTimeoutInterval = TimeSpan.FromMinutes(1);
                builder.EnableDetailedErrors = true;
            });
            services.AddCors(options =>
            {
                options.AddPolicy(AllowedOrigins,
                             builder =>
                    {
                        builder.WithOrigins("http://localhost:3000");
                        builder.AllowAnyHeader();
                        builder.AllowAnyMethod();
                        builder.AllowCredentials();
                    });
            });
            services.AddDbContext<KnowledgeContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("Default"));
                options.EnableDetailedErrors();
                options.EnableSensitiveDataLogging();
            });

            services.AddIdentityCore<DbUser>();
            new IdentityBuilder(typeof(DbUser), typeof(IdentityRole), services)
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddUserManager<UserManager<DbUser>>()
                .AddSignInManager<SignInManager<DbUser>>()
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<KnowledgeContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
            });

            //Handling weird JWT handling of microsoft, ie. changing claim types
            //More on: https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet/issues/415
            //
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(cfg =>
               {
                   cfg.RequireHttpsMetadata = false;
                   cfg.SaveToken = true;
                   cfg.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidIssuer = Configuration["Jwt:Issuer"],
                       ValidAudience = Configuration["Jwt:Audience"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                       ClockSkew = TimeSpan.Zero
                   };

                   cfg.Events = new JwtBearerEvents
                   {
                       OnMessageReceived = context =>
                       {
                           var accessToken = context.Request.Query["access_token"];

                           // If the request is for our hub...
                           var path = context.HttpContext.Request.Path;
                           if (!string.IsNullOrEmpty(accessToken) &&
                               (path.StartsWithSegments("/api/notificationhub")))
                           {
                               // Read the token out of the query string
                               context.Token = accessToken;
                           }
                           return Task.CompletedTask;
                       }
                   };
                   
               }
            );
            services.AddSingleton<DatabaseSettings, DatabaseSettings>(t => new DatabaseSettings()
            {
                avatarPath = Configuration["AvatarPath"]
            });

            services.AddScoped<IQuestionRepo, QuestionRepo>();
            services.AddScoped<IAnswerRepo, AnswerRepo>();
            services.AddScoped<IUserRepo, UserRepo>();
            services.AddScoped<ITopicRepo, TopicRepo>();
            services.AddScoped<INotificationRepo, NotificationRepo>();
            services.AddScoped<IAvatarRepo, AvatarRepo>();

            services.AddScoped<ITokenGenerator, JwtTokenGenerator>(x => new JwtTokenGenerator()
            {
                Audience = Configuration["Jwt:Audience"],
                Issuer = Configuration["Jwt:Issuer"],
                Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                Expiration = DateTime.Now.AddMinutes(Configuration.GetValue<double>("Jwt:ExpirationInMinutes")),
            });
            services.AddScoped<IEmailHandler, EmailHandler>(x => new EmailHandler(new EmailSettings()
            {
                ServerAddress = Configuration["Email:ServerAddress"],
                ServerPort = Configuration.GetValue<int>("Email:Port"),
                Username = Configuration["Email:Username"],
                Password = Configuration["Email:Password"],
                EmailAddress = Configuration["Email:EmailAddress"],
                WebAddress = Configuration["Email:WebAddress"],
            })) ;

            services.AddTransient<DataSeeder, DataSeeder>();

            //To create services for the Controllers
            services.AddScoped<QuestionService, QuestionService>();
            services.AddScoped<UserService, UserService>();
            services.AddScoped<TopicService, TopicService>();
            services.AddScoped<NotificationService, NotificationService>();
            services.AddScoped<AvatarService, AvatarService>();

            services.AddScoped<INotificationHub, NotificationHubProxy>();
            services.AddScoped<IQuestionHub, QuestionHubProxy>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataSeeder seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(AllowedOrigins);

            app.UseAuthentication();
            app.UseAuthorization();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("/api/notificationhub");
                endpoints.MapHub<QuestionHub>("/api/questionhub");
            });

            seeder.Seed();
        }
    }
}
