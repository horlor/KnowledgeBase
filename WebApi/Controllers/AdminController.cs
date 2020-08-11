using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private UserService userService;

        public AdminController(UserService userService)
        {
            this.userService = userService;
        }


        [HttpGet("users")]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<ICollection<User>>> GetUsers()
        {
            return Ok(await userService.GetAllUsers());
        }

        [HttpGet("users/{username}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserWithRole>> GetUserWithRole([FromRoute] string username)
        {
            return Ok(await userService.GetUserWithRole(username));
        }
    }
}