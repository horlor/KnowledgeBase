using System;
using System.Collections.Generic;
using System.Text;
using KnowledgeBase.Domain.Models;

namespace KnowledgeBase.WebApi.DataTransferObjects
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


}