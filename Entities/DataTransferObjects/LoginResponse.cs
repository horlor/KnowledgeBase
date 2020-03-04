using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class LoginResponse
    {
        public string Username { get; set; }
        public bool Success { get; set; }
        public object Token { get; set; }
    }
}
