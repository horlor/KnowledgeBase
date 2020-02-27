using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbUser : IdentityUser
    {  

        public virtual ICollection<DbQuestion> Questions { get; set; }

        public virtual ICollection<DbAnswer> Answers { get; set; }

    }
}
