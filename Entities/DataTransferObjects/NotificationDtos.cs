using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities.DataTransferObjects
{
    public class NotificationPatchDto
    {
        public bool Finished { get; set; }
    }

    public class PendingNotificationsDto
    {
        public int Count { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }
}
