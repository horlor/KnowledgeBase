﻿using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Models
{
    public class Topic
    {
        public string Name { get; set; }

        public int Id { get; set; }
    }
    public class TopicDetailed : Topic
    {
        public Topic Ancestor { get; set; }
    }
}
