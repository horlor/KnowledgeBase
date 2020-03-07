using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using KnowledgeBase.Entities.DataTransferObjects;
using KnowledgeBase.Domain.Interfaces;

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
                result.Username = user.Name;
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
            var result = await userRepo.SignIn(username, password);
            var session = new LoginResponse() { Success = false };
            if (result == SignInResult.Success)
            {
                session.Success = true;
                session.Token = tokenGenerator.GenerateToken(username);
                session.Username = username;
            }
            return session;
        }

    }
}
