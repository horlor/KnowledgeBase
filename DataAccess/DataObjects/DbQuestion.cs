using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbQuestion
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }

        public DbUser User { get; set; }

        public ICollection<DbAnswer> Answers{ get; set; }
    }
}
