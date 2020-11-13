using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.Domain.Models;
using KnowledgeBase.WebApi.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : BaseController
    {
        private readonly UserService userService;
        private readonly NotificationService notificationService;
        private readonly AvatarService avatarService;

        public ProfileController(UserService userService, NotificationService notificationService, AvatarService avatarService)
        {
            this.userService = userService;
            this.notificationService = notificationService;
            this.avatarService = avatarService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResult>> Login([FromBody] LoginRequest request)
        {
            var session = await userService.Login(request.Username, request.Password);
            if (session.Success)
                return Ok(session);
            return Unauthorized(session);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            try
            {
                return Ok(await userService.RefreshAccessToken(request.Username, request.AccessToken, request.RefreshToken));
            }
            catch(UnathorizedException)
            {
                return Unauthorized();
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterResult>> Register([FromBody] RegisterRequest request)
        {
            var res = await userService.Register(request.ToUser(), request.Password);
            if (res.Success)
                return Ok(res);
            return BadRequest(res);

        }

        [HttpPost("password_recovery")]
        public async Task<IActionResult> PasswordRecovery([FromBody] PasswordRecoveryRequest recoveryRequest)
        {
            try
            {
                await userService.PasswordRecovery(recoveryRequest.Username);
                return Ok();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost("password_reset")]
        public async Task<IActionResult> PasswordReset([FromBody] PasswordResetRequest resetRequest)
        {
            try
            {
                await userService.ResetPassword(resetRequest.Username, resetRequest.Token, resetRequest.Password);
                return Ok();
            }
            catch(Exception)
            {
                return Forbid();
            }
        }

        [Authorize]
        [HttpPost("password_change")]
        public async Task<IActionResult> ChangePassword([FromBody] PasswordChangeRequest request)
        {
            try
            {
                await userService.ChangePassword(UserName, request.OldPassword, request.NewPassword);
                return Ok();
            }
            catch(Exception)
            {
                return Forbid();
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUser([FromBody] UserUpdateRequest request)
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
                return NotFound();
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
                return NoContent();
            else
                return BadRequest();
        }

        [Authorize]
        [HttpDelete("notifications")]
        public async Task<ActionResult> DeleteNotifications([FromQuery] int options)
        {
            await notificationService.DeleteAll(UserName, (NotificationsDeleteOptions)options);

            return NoContent();
        }

        [Authorize]
        [HttpPatch("notifications/{id}/important")]
        public async Task<IActionResult> PatchNotificationRead([FromRoute] int id, [FromBody] NotificationPatchDto dto)
        {
            return await HandleExceptionsWithOk(async () => await notificationService.ChangeImportant(UserName, id, dto.B));
        }

        [Authorize]
        [HttpPatch("notifications/{id}/seen")]
        public async Task<IActionResult> PatchNotificationSeen([FromRoute] int id, [FromBody] NotificationPatchDto dto)
        {
            return await HandleExceptionsWithOk(async () => await notificationService.ChangeSeen(UserName, id, dto.B));
        }

        [Authorize]
        [HttpGet("notifications/unseen")]
        public async Task<UnseenNotificationsDto> GetUnseenNotifications()
        {
            var notifications = await notificationService.GetUnseenNotifications(UserName);
            return new UnseenNotificationsDto()
            {
                Count = notifications.Count,
                Notifications = notifications,
            };
        }

        [Authorize]
        [HttpGet("avatar")]
        public IActionResult GetAvatar()
        {
            var (stream, ext) = avatarService.GetAvatar(UserName);
            if (stream == null)
                return NotFound();
            return new FileStreamResult(stream, $"image/{ext}");
        }

        [Authorize]
        [HttpPut("avatar")]
        public async Task<IActionResult> SetAvatar([FromForm(Name = "file")] IFormFile image)
        {
            using(var stream = image.OpenReadStream())
            {
                await avatarService.AddOrSetAvatar(UserName, stream, Path.GetExtension(image.FileName));
            }
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