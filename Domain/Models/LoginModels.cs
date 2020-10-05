using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Models
{
    public class LoginResult
    {
        public string Username { get; set; }
        public string Role { get; set; }
        public bool Success { get; set; }
        public object Token { get; set; }
    }
}
