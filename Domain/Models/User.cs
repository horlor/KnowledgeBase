using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Models
{
    public class User
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<Topic> Topics { get; set; }
    }
    
    public class UserWithRole
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Role { get; set; }
    }

    public class UserDetailed : User
    {
        public string Introduction { get; set; }

    }

    public class UserSearchParams
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
        public int Count { get; set; }
        public ICollection<User> Users { get; set; }
    }

    public class UserSearchResult
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Anywhere { get; set; }
        public int Page { get; set; }
        public int CountPerPage { get; set; }
    }
}
