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
                options.UseSqlServer(Configuration.GetConnectionString("Default")));

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


            services.AddScoped<QuestionService, QuestionService>();



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(AllowedOrigins);
            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
