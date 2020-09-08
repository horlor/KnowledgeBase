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
            Console.WriteLine($"{Context.UserIdentifier} {notificationId} {to}");
            var result = await notificationService.ChangeSeen(Context.UserIdentifier, notificationId, to);
            Console.WriteLine($"\t{result}");
            if (!result)
                throw new Exception();
        }

        [Authorize]
        public async Task SetNotificationImportant(int notificationId, bool to)
        {
            var result = await notificationService.ChangeImportant(Context.UserIdentifier, notificationId, to);
            if (!result)
                throw new Exception();
        }

    }
}
