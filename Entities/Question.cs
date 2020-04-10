using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastUpdate { get; set; }

        public Topic Topic { get; set; }

    }
}
