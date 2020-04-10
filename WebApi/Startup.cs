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
            services.AddCors(options =>
            {
                options.AddPolicy(AllowedOrigins,
                             builder =>
                    {
                        builder.WithOrigins("http://localhost:3000");
                        builder.AllowAnyHeader();
                        //builder.AllowAnyOrigin();
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
                .AddEntityFrameworkStores<KnowledgeContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
            });

            //Handling wierd JWT handling of microsoft, ie. changing claim types
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
                   
               }
            );


            services.AddScoped<IQuestionRepo, QuestionRepo>();
            services.AddScoped<IAnswerRepo, AnswerRepo>();
            services.AddScoped<IUserRepo, UserRepo>();
            services.AddScoped<ITopicRepo, TopicRepo>();
            services.AddScoped<INotificationRepo, NotificationRepo>();

            services.AddScoped<ITokenGenerator, JwtTokenGenerator>(x => new JwtTokenGenerator()
            {
                Audience = Configuration["Jwt:Audience"],
                Issuer = Configuration["Jwt:Issuer"],
                Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                Expiration = DateTime.Now.AddDays(30),
            }) ;

            services.AddTransient<DataSeeder, DataSeeder>();

            //To create services for the Controllers
            services.AddScoped<QuestionService, QuestionService>();
            services.AddScoped<UserService, UserService>();
            services.AddScoped<TopicService, TopicService>();
            services.AddScoped<NotificationService, NotificationService>();


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
            });

            seeder.Seed();
        }
    }
}
