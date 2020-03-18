﻿using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class User
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<Topic> Topics { get; set; }
    }
}
