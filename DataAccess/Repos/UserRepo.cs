using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using KnowledgeBase.DataAccess.DataObjects;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Entities.DataTransferObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http.Headers;

namespace KnowledgeBase.DataAccess.Repos
{
    public class UserRepo : IUserRepo, IAvatarRepo
    {
        private readonly KnowledgeContext dbcontext;
        private readonly UserManager<DbUser> userManager;
        private readonly SignInManager<DbUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly string avatarPath;

        public UserRepo(KnowledgeContext context, UserManager<DbUser> userManager, SignInManager<DbUser> signInManager, RoleManager<IdentityRole> roleManager, DatabaseSettings settings)
        {
            this.dbcontext = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.avatarPath = settings.avatarPath;
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

        public async Task<(Microsoft.AspNetCore.Identity.SignInResult, string)> SignIn(string username, string password)
        {
            var dbUser = await userManager.FindByNameAsync(username);
            if (dbUser == null)
                return (Microsoft.AspNetCore.Identity.SignInResult.Failed, null);
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

        public async Task<ICollection<User>> GetUsersPaged(int pagenum, int pagesize = 16)
        {
            return await userManager.Users
                .Include(u => u.UserTopics)
                .ThenInclude(ut => ut.Topic)
                .Select(u => DbMapper.MapDbUser(u))
                .Skip((pagenum - 1) * pagesize)
                .Take(pagesize)
                .ToListAsync();
        }

        public async Task<int> Count()
        {
            return await userManager.Users.CountAsync();
        }

        public async Task<int> PageCount(int pagesize = 16)
        {
            return (int)(Math.Ceiling((float)(await Count()) / pagesize));
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

        public async Task<UserSearchResponse> Search(UserSearchRequest request)
        {
            string anywhere = $"%{request.Anywhere}%";
            var query = userManager.Users
                .Include(u => u.UserTopics)
                .ThenInclude(ut => ut.Topic)
                .Where(u => EF.Functions.Like(u.UserName, anywhere)
                || EF.Functions.Like(u.Email, anywhere));
            if (request.UserName != null)
                query = query.Where(u => EF.Functions.Like(u.UserName, $"%{request.UserName}%"));
            if (request.Email != null)
                query = query.Where(u => EF.Functions.Like(u.Email, $"%{request.Email}%"));
            var count = await query.CountAsync();
            query = query.Skip((request.Page - 1) * request.CountPerPage)
                .Take(request.CountPerPage);
            var list = await query.Select(u => DbMapper.MapDbUser(u)).ToListAsync();
            return new UserSearchResponse()
            {
                Page = request.Page,
                PageSize = request.CountPerPage,
                PageCount = (int)Math.Ceiling(((float)count) / request.CountPerPage),
                Count = count,
                Users = list,
            };
        }

        public async Task AddOrSetAvatar(string userName, IFormFile image)
        {
            if (image == null)
                return;
            await DeleteAvatar(userName);
            string extension = Path.GetExtension(image.FileName);
            using (var stream = new FileStream($"{avatarPath}/{userName}{extension}",FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
        }

        public async Task DeleteAvatar(string username)
        {
            await Task.Run(() =>
            {
                var files = Directory.GetFiles(avatarPath, $"{username}.*");
                foreach (var file in files)
                {
                    File.Delete(file);
                }
            });
        }

        public (Stream, string) GetAvatar(string username)
        {
            var files = Directory.GetFiles(avatarPath, $"{username}.*");
            if (files.Length > 0)
            {
                string extension = Path.GetExtension(files.First());
                return (new FileStream(files.First(), FileMode.Open), extension);
                //return new PhysicalFileResult(files.First(), $"image/{extension.Substring(1)}");
            }
            return (null,null);
        }

        public async Task AddOrSetAvatar(string username, Stream imageStream, string extension)
        {
            await DeleteAvatar(username);
            using (var stream = new FileStream($"{avatarPath}/{username}{extension}", FileMode.Create))
            {
                await imageStream.CopyToAsync(stream);
            }

        }
    }
}
