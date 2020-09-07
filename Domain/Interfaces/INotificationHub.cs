using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Interfaces
{
    public interface INotificationHub
    {
        Task SendNotificationToUser(string username, Notification notification);
    }
}
