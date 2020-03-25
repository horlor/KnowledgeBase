using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.Entities;
using KnowledgeBase.Entities.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : BaseController
    {

        private UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }


        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
        {
            var session = await userService.Login(request.Username, request.Password);
            if (session.Success)
                return Ok(session);
            return Unauthorized(session);
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterResult>> Register([FromBody] RegisterRequest request)
        {
            var res = await userService.Register(request.ToUser(), request.Password);
            if (res.Success)
                return Ok(res);
            return BadRequest(res);

        }

        [Authorize]
        [HttpGet]
        public async Task<ICollection<User>> GetAllUser()
        {
            return await userService.GetAllUsers();
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDetailed>> GetUser([FromRoute] string username)
        {
            var user =  await userService.GetUserDetailed(username);
            if (user == null)
                return NotFound();
            return Ok(user);
        }
        
        [Authorize]
        [HttpPut("profile")]
        public async Task<ActionResult> UpdateUser(UserUpdateRequest request)
        {
            var user = new UserDetailed
            {
                UserName = UserName,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Topics = request.Topics,
                Introduction = request.Introduction,
            };
            var ret = await userService.UpdateUser(user);
            if (ret == null)
                return BadRequest();
            return Ok();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<UserDetailed> GetCurrentUser()
        {
            var user = await userService.GetUserDetailed(UserName);
            return user;
        }
    }
}
