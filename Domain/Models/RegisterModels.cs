using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Models
{
    public class RegisterResult
    {
        public string Username { get; set; }
        public bool Success { get; set; }
        public ICollection<Error> Errors { get; set; }

        public RegisterResult()
        {
            Errors = new List<Error>();
        }
    }
}
