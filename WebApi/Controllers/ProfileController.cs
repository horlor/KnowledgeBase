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
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : BaseController
    {
        private UserService userService;
        private NotificationService notificationService;
        private readonly AvatarService avatarService;

        public ProfileController(UserService userService, NotificationService notificationService, AvatarService avatarService)
        {
            this.userService = userService;
            this.notificationService = notificationService;
            this.avatarService = avatarService;
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
        [HttpPut]
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
        [HttpGet]
        public async Task<UserDetailed> GetCurrentUser()
        {
            var user = await userService.GetUserDetailed(UserName);
            return user;
        }

        [Authorize]
        [HttpGet("notifications")]
        public async Task<ICollection<Notification>> GetNotifications()
        {
            return await notificationService.GetNotificationsForUser(UserName);
        }

        [Authorize]
        [HttpDelete("notifications/{id}")]
        public async Task<ActionResult> DeleteNotification([FromRoute] int id)
        {
            var res = await notificationService.RemoveNotification(UserName, id);
            if (res)
                return Ok();
            else
                return BadRequest();
        }

        [Authorize]
        [HttpPatch("notifications/{id}/finished")]
        public async Task<ActionResult> PatchNotificationRead([FromRoute] int id, [FromBody] NotificationPatchDto dto)
        {
            var res = await notificationService.ChangeFinished(UserName, id, dto.Finished);
            if (res)
                return Ok();
            else
                return BadRequest();
        }

        [Authorize]
        [HttpGet("notifications/pending")]
        public async Task<PendingNotificationsDto> GetPendingNotifications()
        {
            var notifications = await notificationService.GetPendingNotifications(UserName);
            return new PendingNotificationsDto()
            {
                Count = notifications.Count,
                Notifications = notifications,
            };
        }

        [Authorize]
        [HttpGet("avatar")]
        public PhysicalFileResult GetAvatar()
        {
            return avatarService.GetAvatar(UserName);
        }

        [Authorize]
        [HttpPut("avatar")]
        public async Task<IActionResult> SetAvatar(IFormFile image)
        {
            await avatarService.AddOrSetAvatar(UserName, image);
            return Ok();
        }

        [Authorize]
        [HttpDelete("avatar")]
        public async Task<IActionResult> DeleteAvatar()
        {
            await avatarService.DeleteAvatar(UserName);
            return NoContent();
        }
    }
}