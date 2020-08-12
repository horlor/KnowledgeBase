using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities.DataTransferObjects
{
    public class UserUpdateRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Introduction { get; set; }
        public ICollection<Topic> Topics { get; set; }
    }

    public class UserPatchRoleDto
    {
        public string Role { get; set; }
    }

    public class UserSearchResponse
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
        public int Count { get; set; }
        public ICollection<User> Users { get; set; }
    }

    public class UserSearchRequest
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Anywhere { get; set; }
        public int Page { get; set; }
        public int CountPerPage { get; set; }
    }
}