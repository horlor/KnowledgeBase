using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected string UserName { 
            get
            {
                return User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;
            } 
        }

        protected string Role
        {
            get
            {
                return User.Claims.FirstOrDefault(claim => claim.Type ==  ClaimTypes.Role)?.Value;
            }
        }

        protected bool AuthenticateModerator()
        {
            return String.Equals(Role, "Admin", StringComparison.OrdinalIgnoreCase) || String.Equals(Role, "Moderator", StringComparison.OrdinalIgnoreCase);
        }

        protected bool AuthenticateAdmin()
        {
            return String.Equals(Role, "Admin", StringComparison.OrdinalIgnoreCase);
        }
    }
}
