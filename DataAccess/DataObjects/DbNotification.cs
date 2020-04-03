using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbNotification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Read { get; set; }
        public bool Finished { get; set; }
        public int? QuestionId { get; set; }
        [ForeignKey("QuestionId")]
        public virtual DbQuestion Question { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual DbUser User { get; set; }

        public DbNotification()
        {
            Read = false;
            Finished = false;
        }

    }
}
