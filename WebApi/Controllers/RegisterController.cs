using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.Entities.DataTransferObjects;
using KnowledgeBase.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/register")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private UserService userService;

        public RegisterController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<RegisterResult>> Register([FromBody] RegisterRequest request)
        {
            var res = await userService.Register(request.ToUser(), request.Password);
            if (res.Success)
                return Ok(res);
            return BadRequest(res);
           
        }

    }
}