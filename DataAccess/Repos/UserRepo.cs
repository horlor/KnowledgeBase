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
        private readonly KnowledgeContext dbcontext;
        private readonly UserManager<DbUser> userManager;
        private readonly SignInManager<DbUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public UserRepo(KnowledgeContext context, UserManager<DbUser> userManager, SignInManager<DbUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.dbcontext = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }

        public async Task<IdentityResult> Create(User user, string password)
        {
            DbUser dbUser = new DbUser()
            {
                UserName = user.UserName,
                Email = user.Email,
            };
            var res = await userManager.CreateAsync(dbUser, password);
            if(res.Succeeded)
                await userManager.AddToRoleAsync(dbUser, "User");
            await dbcontext.SaveChangesAsync();
            return res;
        }

        public async Task<IdentityResult> Delete(User user)
        {
            var dbUser = await userManager.FindByNameAsync(user.UserName);
            var res = await userManager.DeleteAsync(dbUser);
            await dbcontext.SaveChangesAsync();
            return res;
        }

        public async Task<User> GetByName(string name)
        {
            var dbUser = await dbcontext.Users
                .Include(u => u.UserTopics)
                .ThenInclude(ut => ut.Topic)
                .FirstOrDefaultAsync(  u => u.UserName == name);
            return DbMapper.MapDbUser(dbUser);
        }

        public async Task<ICollection<User>> List()
        {
            return await dbcontext.Users.Select(u => DbMapper.MapDbUser(u)).ToListAsync();
        }

        public async Task<(SignInResult, string)> SignIn(string username, string password)
        {
            var dbUser = await userManager.FindByNameAsync(username);
            if (dbUser == null)
                return (SignInResult.Failed, null);
            var signinresult = await signInManager.CheckPasswordSignInAsync(dbUser, password, false);
            var userrole = await userManager.GetRolesAsync(dbUser);
            return (signinresult, userrole.First());

        }

        public async Task SignOut()
        {
             await signInManager.SignOutAsync();
        }

        public async Task<UserDetailed> GetDetailedByName(string name)
        {
            var dbUser = await userManager.Users
               .Include(u => u.UserTopics)
                    .ThenInclude(ut => ut.Topic)
                .FirstOrDefaultAsync(u => u.UserName == name);
            return DbMapper.MapDbUserDetailed(dbUser);
        }

        public async Task<ICollection<User>> GetAllUser()
        {
            return await userManager.Users
                .Include(u => u.UserTopics)
                    .ThenInclude(ut => ut.Topic)
                .Select(u => DbMapper.MapDbUser(u))
                .ToListAsync();
        }

        public async Task<UserDetailed> UpdateUser(UserDetailed user)
        {
            var dbUser = await dbcontext.Users
                .Include(u => u.UserTopics)
                .SingleOrDefaultAsync(u => u.UserName == user.UserName);
            if (dbUser == null)
                return null;
            dbUser.Email = user.Email;
            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            dbUser.Introduction = user.Introduction;

            dbUser.UserTopics.Clear();

            foreach(var item in user.Topics)
            {
                var dbTopic = await dbcontext.Topics.SingleOrDefaultAsync(t => t.Id == item.Id);
                if (dbTopic != null)
                    dbUser.UserTopics.Add(new DbUserTopic()
                    {
                        Topic = dbTopic,
                        TopicId = dbTopic.Id,
                        User = dbUser,
                        UserId = dbUser.Id,
                    });
            }
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbUserDetailed(dbUser);
        }

        public async Task<ICollection<User>> GetUsersByTopic(Topic topic)
        {
            return await dbcontext.Users
                .Include(u => u.UserTopics)
                    .ThenInclude(ut => ut.Topic)
                    .Where(u => u.UserTopics.FirstOrDefault(ut => ut.TopicId == topic.Id) != null)
                .Select(u => DbMapper.MapDbUser(u))
                .ToListAsync();
        }

        public async Task<string> SetUserRole(User user, string role)
        {
            var dbUser = await userManager.FindByNameAsync(user.UserName);
            var roles = await userManager.GetRolesAsync(dbUser);
            await userManager.RemoveFromRolesAsync(dbUser, roles);
            try
            {
                var res = await userManager.AddToRoleAsync(dbUser, role);
            Console.WriteLine(res);
                return role;
            }
            catch(Exception)
            { 
                return null;
            }
            
        }

        public async Task<UserWithRole> GetUserWithRole(string username)
        {
            var dbUser = await userManager.FindByNameAsync(username);
            var roles = await userManager.GetRolesAsync(dbUser);
            return new UserWithRole()
            {
                UserName = dbUser.UserName,
                FirstName = dbUser.FirstName,
                LastName = dbUser.LastName,
                Email = dbUser.Email,
                Role = roles.FirstOrDefault(),
            };
        }


    }
}
