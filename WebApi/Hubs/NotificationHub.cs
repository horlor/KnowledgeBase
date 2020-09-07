using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Entities;
using KnowledgeBase.Domain.Services;

namespace KnowledgeBase.WebApi.Hubs
{
    public class NotificationHub : Hub<INotificationClient>
    {
        private readonly NotificationService notificationService;

        public NotificationHub(NotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [Authorize]
        public async Task SetNotificationSeen(string username, int notificationId, bool to)
        {
            await notificationService.ChangeSeen(username, notificationId, to);
        }

        [Authorize]
        public async Task SetNotificationImportant(string username, int notificationId, bool to)
        {
            await notificationService.ChangeImportant(username, notificationId, to);
        }

    }
}
