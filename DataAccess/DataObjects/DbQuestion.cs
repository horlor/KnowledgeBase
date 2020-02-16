using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbQuestion
    {
        [Required, Key]
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }

        public DbUser User { get; set; }

        public ICollection<DbAnswer> Answers{ get; set; }
    }
}
