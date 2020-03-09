using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using KnowledgeBase.Domain.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace KnowledgeBase.WebApi.ServiceHelpers
{
    public class JwtTokenGenerator : ITokenGenerator
    {
        public object GenerateToken(string name)
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
