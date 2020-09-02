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

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }

        public Boolean Closed { get; set; } = false;

        public virtual DbUser User { get; set; }

        public virtual DbTopic Topic { get; set; }

        public virtual ICollection<DbAnswer> Answers{ get; set; }
    }
}
