using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KnowledgeBase.Entities;
using KnowledgeBase.Entities.DataTransferObjects;
using KnowledgeBase.Domain.Services;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private UserService userService;

        public LoginController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            var session = await userService.Login(request.Username, request.Password);
            if (session.Success)
                return Ok(session);
            return Unauthorized(session);
        }
    }
}