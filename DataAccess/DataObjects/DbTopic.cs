using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbTopic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual DbTopic Ancestor { get; set; }

        public virtual ICollection<DbUserTopic> UserTopics { get; set; }
    }
}
