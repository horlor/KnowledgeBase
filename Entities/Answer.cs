using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastUpdate { get; set; }

    }
}
