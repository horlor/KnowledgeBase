using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class TopicDetailed : Topic
    {
        public Topic Ancestor { get; set; }
    }
}
