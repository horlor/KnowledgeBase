using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using KnowledgeBase.Entities.DataTransferObjects;
using KnowledgeBase.Domain.Interfaces;
using Microsoft.AspNetCore.Http.Features.Authentication;

namespace KnowledgeBase.Domain.Services
{
    public class UserService
    {
        private readonly IUserRepo userRepo;
        private readonly ITokenGenerator tokenGenerator;
        public UserService(IUserRepo repo, ITokenGenerator tokenGenerator)
        {
            this.userRepo = repo;
            this.tokenGenerator = tokenGenerator;
        }

        public async Task<RegisterResult> Register(User user, string password)
        {
            var res = await userRepo.Create(user, password);
            var result = new RegisterResult();
            if (res.Succeeded)
            {
                result.Success = true;
                result.Username = user.UserName;
            }
            else
            {
                result.Success = false;
                foreach (var item in res.Errors)
                {
                    result.Errors.Add(new Error(item.Code, item.Description));
                }
            }
            return result;
        }

        public async Task<LoginResponse> Login(string username, string password)
        {
            var (result, role) = await userRepo.SignIn(username, password);
            var session = new LoginResponse() { Success = false };
            if (result == SignInResult.Success)
            {
                session.Success = true;
                session.Role = role;
                session.Token = tokenGenerator.GenerateToken(username, role);
                session.Username = username;
            }
            return session;
        }

        public async Task<User> GetUser(string username)
        {
            return await userRepo.GetByName(username);
        }

        public async Task<UserDetailed> GetUserDetailed(string username)
        {
            return await userRepo.GetDetailedByName(username);
        }

        public async Task<ICollection<User>> GetAllUsers()
        {
            return await userRepo.GetAllUser();
        }

        public async Task<UserDetailed> UpdateUser(UserDetailed user)
        {
            return await userRepo.UpdateUser(user);
        }

        public async Task<string> SetUserRole(User user, string role)
        {
            return await userRepo.SetUserRole(user, role);
        }

        public async Task<UserWithRole> GetUserWithRole(string username)
        {
            return await userRepo.GetUserWithRole(username);
        }

        public async Task<ICollection<User>> GetUsersPaged(int pagenum, int pagesize)
        {
            return await userRepo.GetUsersPaged(pagenum, pagesize);
        }

        public async Task<int> GetPageCount(int pagesize)
        {
            return await userRepo.PageCount(pagesize);
        }

        public Task<UserSearchResponse> Search(UserSearchRequest request)
        {
            return userRepo.Search(request);
        }

        internal static bool AuthenticateModerator(string role)
        {
            return String.Equals(role, "admin", StringComparison.OrdinalIgnoreCase) || String.Equals(role, "moderator", StringComparison.OrdinalIgnoreCase);
        }

        internal static bool AuthenticateAdmin(string role)
        {
            return String.Equals(role, "admin", StringComparison.OrdinalIgnoreCase);
        }
    }
}
