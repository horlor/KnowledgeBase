using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Repository
{
    public interface INotificationRepo
    {
        Task<ICollection<Notification>> GetByUsername(string username);
        Task<Notification> CreateForUser(string username, Notification notification);
        Task<Notification> Update(Notification notification);
        Task Remove(Notification notification);

        Task<string> GetUserNameForNotification(Notification notification);
    }
}
