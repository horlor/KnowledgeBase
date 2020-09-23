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
        public async Task SetNotificationSeen(int notificationId, bool to)
        {
            var result = await notificationService.ChangeSeen(Context.UserIdentifier, notificationId, to);

        }

        [Authorize]
        public async Task SetNotificationImportant(int notificationId, bool to)
        {
            var result = await notificationService.ChangeImportant(Context.UserIdentifier, notificationId, to);
        }

    }
}
