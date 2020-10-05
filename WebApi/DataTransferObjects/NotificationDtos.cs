using System;
using System.Collections.Generic;
using System.Text;
using KnowledgeBase.Domain.Models;

namespace KnowledgeBase.WebApi.DataTransferObjects
{
    public class NotificationPatchDto
    {
        public bool B { get; set; }
    }

    public class UnseenNotificationsDto
    {
        public int Count { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }
}
