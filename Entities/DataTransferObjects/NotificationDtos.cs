using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities.DataTransferObjects
{
    public class NotificationPatchDto
    {
        public bool B { get; set; }
    }

    public class UnseenNotificationsDTO
    {
        public int Count { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }

    public enum NotificationsDeleteOptions
    {
        All=0,
        AllSeen = 1,
        AllNotImportant = 2,
    }
}
