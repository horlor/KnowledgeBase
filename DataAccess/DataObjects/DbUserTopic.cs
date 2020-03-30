using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbUserTopic
    {
        public string UserId { get; set; }
        public virtual DbUser User { get; set; }
        public virtual DbTopic Topic { get; set; }
        public int TopicId {get;set;} 
    }
}
