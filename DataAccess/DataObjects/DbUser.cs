using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KnowledgeBase.DataAccess.DataObjects
{
    public class DbUser : IdentityUser
    {  
        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        [MaxLength(1000)]
        public string Introduction { get; set; }


        public virtual ICollection<DbQuestion> Questions { get; set; }

        public virtual ICollection<DbAnswer> Answers { get; set; }

    }
}
