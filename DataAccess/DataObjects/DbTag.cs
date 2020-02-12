using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbTag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public virtual DbTag Ancestor { get; set; }
    }
}
