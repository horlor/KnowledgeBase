using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Models
{
    public class Error
    {
        public string Code { get; set; }
        public string Description { get; set; }

        public Error() { }

        public Error(string code, string description)
        {
            this.Code = code;
            this.Description = description;
        }
    }
}
