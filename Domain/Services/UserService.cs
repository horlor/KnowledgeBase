using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using KnowledgeBase.Domain.Interfaces;
using Microsoft.AspNetCore.Http.Features.Authentication;

namespace KnowledgeBase.Domain.Services
{
    /// <summary>
    /// It handles the operation for handling users, and also the authentication.
    /// </summary>
    public class UserService
    {
        private readonly IUserRepo userRepo;
        private readonly ITokenGenerator tokenGenerator;
        private readonly IEmailHandler emailHandler;
        public UserService(IUserRepo repo, ITokenGenerator tokenGenerator, IEmailHandler emailHandler)
        {
            this.userRepo = repo;
            this.tokenGenerator = tokenGenerator;
            this.emailHandler = emailHandler;
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

        public async Task<LoginResult> Login(string username, string password)
        {
            var (result, role, refreshToken) = await userRepo.SignIn(username, password);
            var session = new LoginResult() { Success = false };
            if (result == SignInResult.Success)
            {
                session.Success = true;
                session.Role = role;
                session.AccessToken = tokenGenerator.GenerateToken(username, role);
                session.RefreshToken = refreshToken;
                session.Username = username;
            }
            return session;
        }

        public async Task<LoginResult> RefreshAccessToken(string username, string accessToken, string refreshToken)
        {
            var (res, role, token) = await userRepo.ValidateRefreshToken(username, refreshToken);
            if (!res)
                throw new ForbiddenException();
            return new LoginResult()
            {
                Success = true,
                Role = role,
                AccessToken = tokenGenerator.GenerateToken(username, role),
                RefreshToken = token,
                Username = username,
            };
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

        public Task<UserSearchParams> Search(UserSearchResult request)
        {
            return userRepo.Search(request);
        }

        public async Task PasswordRecovery(string username)
        {
            var (user, token) = await userRepo.GetPasswordRecoveryToken(username);
            if (user == null)
                throw new NotFoundException();
            await emailHandler.SendPasswordRecoveryEmail(user, token);
        }

        public async Task ResetPassword(string username, string token, string password)
        {
            var result = await userRepo.ResetPassword(username, token, password);
            if (result != IdentityResult.Success)
                throw new ForbiddenException();
        }

        public async Task ChangePassword(string username, string oldPassword, string newPassword)
        {
            var result = await userRepo.ChangePassword(username, oldPassword, newPassword);
            if (result != IdentityResult.Success)
                throw new ForbiddenException();
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
