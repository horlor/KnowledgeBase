using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.EntityFrameworkCore;
using KnowledgeBase.Domain.Models;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbAnswer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, MaxLength(1000)]
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
        public AnswerType Type { get; set; } = AnswerType.Simple;

        public string ModeratorId { get; set; }
        public virtual DbUser Moderator { get; set; }
        public string ModeratorMessage { get; set; }

        public int QuestionId { get; set; }
        [Required]
        [ForeignKey("QuestionId")]
        public virtual DbQuestion Question { get; set; }

        public string UserId { get; set; }
        public virtual DbUser User { get; set; }
    }
}
