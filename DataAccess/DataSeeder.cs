using KnowledgeBase.DataAccess.DataObjects;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
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
        }

        public void SeedRoles()
        {
            if (!roleManager.RoleExistsAsync("User").Result)
            {
                IdentityRole role = new IdentityRole
                {
                    Name = "User",
                };
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("Moderator").Result)
            {
                IdentityRole role = new IdentityRole
                {
                    Name = "Moderator",
                };
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                IdentityRole role = new IdentityRole
                {
                    Name = "Admin",
                };
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
        }

    }
}
