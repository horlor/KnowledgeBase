using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using KnowledgeBase.DataAccess.DataObjects;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeBase.DataAccess.Repos
{
    public class UserRepo : IUserRepo
    {
        private readonly KnowledgeContext context;
        private readonly UserManager<DbUser> userManager;
        private readonly SignInManager<DbUser> signInManager;

        public UserRepo(KnowledgeContext context, UserManager<DbUser> userManager, SignInManager<DbUser> signInManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;

        }

        public async Task<IdentityResult> Create(User user, string password)
        {
            DbUser dbUser = new DbUser()
            {
                UserName = user.Name,
                Email = user.Email
            };
            var res = await userManager.CreateAsync(dbUser, password);
            await context.SaveChangesAsync();
            return res;
        }

        public async Task<IdentityResult> Delete(User user)
        {
            var dbUser = await userManager.FindByNameAsync(user.Name);
            var res = await userManager.DeleteAsync(dbUser);
            await context.SaveChangesAsync();
            return res;
        }

        public async Task<User> GetByName(string name)
        {
            var dbUser = await userManager.FindByNameAsync(name);
            return DbMapper.MapDbUser(dbUser);
        }

        public async Task<ICollection<User>> List()
        {
            return await context.Users.Select(u => DbMapper.MapDbUser(u)).ToListAsync();
        }

        public async Task<SignInResult> SignIn(string username, string password)
        {
            var dbUser = await userManager.FindByNameAsync(username);
            if (dbUser == null)
                return SignInResult.Failed;
            return await signInManager.CheckPasswordSignInAsync(dbUser, password, false);
        }

        public async Task SignOut()
        {
             await signInManager.SignOutAsync();
        }

    }
}
