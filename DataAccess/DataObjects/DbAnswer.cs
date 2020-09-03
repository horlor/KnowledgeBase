using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using KnowledgeBase.Entities;
using Microsoft.EntityFrameworkCore;

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

        [Required]
        public virtual DbQuestion Question { get; set; }

        [Required]
        public virtual DbUser User { get; set; }
    }
}
