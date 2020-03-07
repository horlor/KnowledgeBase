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
                //Somewhy sub is not in the list :D (even though i put in it)
                return User.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
            } 
        }
    }
}
