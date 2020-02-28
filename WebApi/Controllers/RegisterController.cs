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
        public async Task<ActionResult> Register([FromBody] RegisterRequest request)
        {
            var res = await userService.Create(request.ToUser(), request.Password);
            if (res == null)
                return BadRequest();
            return Created($"/api/users/{res.Name}", res);
        }

    }
}