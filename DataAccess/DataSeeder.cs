using KnowledgeBase.DataAccess.DataObjects;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.DataAccess
{
    public class DataSeeder
    {
        private readonly KnowledgeContext dbcontext;
        private readonly UserManager<DbUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public DataSeeder(KnowledgeContext context, UserManager<DbUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
            this.dbcontext = context;
            this.userManager = userManager;
        }
         
        public void Seed()
        {
            SeedRoles();
            SeedAdmin();
            SeedTopics();
        }

        public void SeedRoles()
        {
            if (!roleManager.RoleExistsAsync("User").Result)
            {
                Console.WriteLine("User adding");
                IdentityRole role = new IdentityRole
                {
                    Name = "User",
                };
                roleManager.CreateAsync(role).Wait();
            }
            if (!roleManager.RoleExistsAsync("Moderator").Result)
            {
                IdentityRole role = new IdentityRole
                {
                    Name = "Moderator",
                };
                roleManager.CreateAsync(role).Wait();
            }
            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                IdentityRole role = new IdentityRole
                {
                    Name = "Admin",
                };
                roleManager.CreateAsync(role).Wait();
            }
        }

        public void SeedAdmin()
        {
            if (!dbcontext.Users.Any())
            {
                var admin = new DbUser()
                {
                    UserName = "admin",
                };
                userManager.CreateAsync(admin, "Admin123").Wait();

                userManager.AddToRoleAsync(admin, "Admin").Wait();
            }
        }

        public void SeedTopics()
        {
            if (!dbcontext.Topics.Any())
            {
                var topic = new DbTopic()
                {
                    Name = "Other",
                    Ancestor = null,
                };
                dbcontext.Topics.Add(topic);
            }
        }

    }
}
