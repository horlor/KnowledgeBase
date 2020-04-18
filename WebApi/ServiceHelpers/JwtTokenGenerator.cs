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
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public SymmetricSecurityKey Key { get; set; }
        public DateTime Expiration { get; set; }

        public object GenerateToken(string name, string role)

        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, role)
            };

            var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(Issuer, Audience, claims, null, Expiration, creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
