using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.Hubs
{
    public interface INotificationClient
    {
        Task RecieveNotification(Notification notification);
    }
}
