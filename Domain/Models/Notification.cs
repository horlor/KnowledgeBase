using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public int? QuestionId { get; set; }
        public bool Seen { get; set; }

        public bool Important { get; set; }

        public string Username { get; set; }
    }

    public enum NotificationsDeleteOptions
    {
        All = 0,
        AllSeen = 1,
        AllNotImportant = 2,
    }
}
