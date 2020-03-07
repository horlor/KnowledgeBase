using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected string UserName { 
            get
            {
                return User.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;
            } 
        }
    }
}
