using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbAnswer
    {
        [Required, Key]
        public Guid Id { get; set; }

        [Required, MaxLength(1000)]
        public string Content { get; set; }

        [Required]
        public virtual DbQuestion Question { get; set; }

        [Required]
        public virtual DbUser User { get; set; }
    }
}
