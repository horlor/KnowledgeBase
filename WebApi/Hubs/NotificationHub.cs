using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Hubs;
using KnowledgeBase.Entities;
using KnowledgeBase.Domain.Services;

namespace KnowledgeBase.WebApi.Hubs
{
    public class NotificationHub : Hub, INotificationHub
    {
        private IHubContext<NotificationHub> hubContext;

        public NotificationHub(IHubContext<NotificationHub> hubContext)
        {
            this.hubContext = hubContext;
        }


        public async Task SendNotificationToUser(string username, Notification notification)
        {
            Console.WriteLine($"{username}:{notification.Title}");
            await hubContext.Clients.User("lorant").SendAsync("RecieveNotification", notification);
        }

        public async Task Ping()
        {
            Console.WriteLine("User: "+Context.UserIdentifier+ ", "+Context.User);
        }

    }
}
