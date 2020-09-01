﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.Entities;
using KnowledgeBase.Entities.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : BaseController
    {

        private UserService userService;
        private NotificationService notificationService;
        private readonly AvatarService avatarService;

        public UserController(UserService userService, NotificationService notificationService, AvatarService avatarService)
        {
            this.userService = userService;
            this.notificationService = notificationService;
            this.avatarService = avatarService;
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

        [HttpGet("search")]
        public async Task<UserSearchResponse> SearchUsers([FromQuery] string anywhere,[FromQuery] string username = null, 
            [FromQuery] string email = null, [FromQuery] int page = 1, [FromQuery] int countPerPage = 16)
        {
            return await userService.Search(new UserSearchRequest()
            {
                Anywhere = anywhere,
                CountPerPage = countPerPage,
                Email = email,
                Page = page,
                UserName = username,
            });
        }

        [HttpGet("{username}/avatar")]
        public IActionResult GetAvatarForUser([FromRoute] string username)
        {
            var (stream, ext) = avatarService.GetAvatar(username);
            if (stream == null)
                return NotFound();
            return new FileStreamResult(stream, $"image/{ext}");
        }

    }
}
