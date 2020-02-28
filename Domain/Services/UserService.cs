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

namespace KnowledgeBase.Domain.Services
{
    public class UserService
    {
        private readonly IUserRepo userRepo;
        public UserService(IUserRepo repo)
        {
            this.userRepo = repo;
        }

        public async Task<User> Create(User user, string password)
        {
            var res = await userRepo.Create(user, password);
            if (!res.Succeeded)
                return null;
            return await userRepo.GetByName(user.Name);
        }

        public async Task<Session> Login(string username, string password)
        {
            var res = await userRepo.SignIn(username, password);
            if (res != SignInResult.Success)
                return null;
            var session = new Session();
            session.Token = GenerateJwtToken(username);
            session.Success = true;
            session.UserName = username;
            return session;
        }

        private object GenerateJwtToken(string name)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, name)
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
