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

namespace KnowledgeBase.Domain.Services
{
    public class UserService
    {
        private readonly IUserRepo userRepo;
        public UserService(IUserRepo repo)
        {
            this.userRepo = repo;
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
                session.Token = GenerateJwtToken(username);
                session.Username = username;
            }
            return session;
        }

        private object GenerateJwtToken(string name)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Secret key for JWT $42&"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(30));
            var issuer = "Viknowledge";
            var audience = "Viknowledge-users";

            var token = new JwtSecurityToken(issuer, audience, claims, null, expires, creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
