using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public int? QuestionId { get; set; }
        public bool Pending { get; set; }

        public bool Finished { get; set; }
    }
}
