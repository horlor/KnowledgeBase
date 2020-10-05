using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.Domain.Models;
using KnowledgeBase.WebApi.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserService userService;

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

        [Authorize(Roles = "Admin")]
        [HttpPatch("users/{username}/role")]
        public async Task<ActionResult> SetRoleForUser([FromRoute] string username, [FromBody] UserPatchRoleDto dto)
        {
            var user = await userService.GetUser(username);
            Console.WriteLine("1");
            if (user == null)
                return NotFound();
            Console.WriteLine("2");
            var ret = await userService.SetUserRole(user, dto.Role);
            if (ret == null)
                return BadRequest();
            return Ok();
        }
    }
}