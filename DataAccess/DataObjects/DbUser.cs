using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbUser
    {

        [Required, Key]
        public Guid Id { get; set; }

        [Required, MaxLength(100)]
        public string UserName { get; set; }

        public string Password { get; set; }

        public virtual ICollection<DbQuestion> Questions { get; set; }

        public virtual ICollection<DbAnswer> Answers { get; set; }

    }
}
