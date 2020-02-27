using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class Session
    {
        public string UserName { get; set; }
        public bool Success { get; set; }
        public object Token { get; set; }
    }
}
