using KnowledgeBase.Domain.Interfaces;
using KnowledgeBase.Domain.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.Hubs
{
    public class NotificationHubProxy : INotificationHub
    {
        private readonly IHubContext<NotificationHub, INotificationClient> hubContext;

        public NotificationHubProxy(IHubContext<NotificationHub, INotificationClient> hubContext)
        {
            this.hubContext = hubContext;
        }

        public async Task SendNotificationToUser(string username, Notification notification)
        {
            Console.WriteLine($"{username}:{notification.Title}");
            await hubContext.Clients.User(username).RecieveNotification(notification);
        }
    }
}
