using KnowledgeBase.Domain.Models;
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

        public bool Closed { get; set; }

        public string UserId { get; set; }
        public virtual DbUser User { get; set; }

        public virtual DbTopic Topic { get; set; }

        public string ModeratorId { get; set; }
        public virtual DbUser Moderator {get;set;}
        public string ModeratorMessage { get; set; }

        public QuestionType Type { get; set; } 

        public virtual ICollection<DbAnswer> Answers{ get; set; }
    }
}
