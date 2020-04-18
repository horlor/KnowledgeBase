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
        private NotificationService notificationService;

        public UserController(UserService userService, NotificationService notificationService)
        {
            this.userService = userService;
            this.notificationService = notificationService;
        }

        [HttpGet]
        public async Task<ICollection<User>> GetAllUser()
        {
            return await userService.GetAllUsers();
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDetailed>> GetUser([FromRoute] string username)
        {
            var user = await userService.GetUserDetailed(username);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpPost("{username}")]
        public async Task PostNotification([FromRoute] string username, [FromBody] Notification notification)
        {
            await notificationService.CreateNotificationForUser(username, notification);
        }

        [Authorize(Roles ="Admin")]
        [HttpPatch("{username}/role")]
        public async Task<ActionResult> SetRoleForUser([FromRoute] string username, [FromBody] UserPatchRoleDto dto)
        {
            var user = await userService.GetUser(username);
            if (user == null)
                return NotFound();
            var ret = userService.SetUserRole(user, dto.Role);
            if (ret == null)
                return BadRequest();
            return Ok();
        }


    }
}
