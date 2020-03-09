using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.Entities;
using KnowledgeBase.Entities.DataTransferObjects;
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

        [HttpPut("{username}")]
        public async Task<ActionResult<UserDetailed>> UpdateUser([FromRoute] string username, [FromBody] UserDetailed userD)
        {
            var user = await userService.GetUser(username);
            if (user == null)
                return NotFound();
            //Somebody trying to edit in someone other's name
            if (username != UserName)
                return Conflict();
            var ret = await userService.UpdateUser(userD);
            return Ok(ret);

        }

    }
}
