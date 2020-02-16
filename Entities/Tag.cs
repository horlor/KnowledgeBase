using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class Tag
    {
        public string Name { get; set; }

        public Tag Ancestor { get; set; }
    }
}
