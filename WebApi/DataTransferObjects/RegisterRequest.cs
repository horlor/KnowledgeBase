using System;
using System.Collections.Generic;
using System.Text;
using KnowledgeBase.Domain.Models;

namespace KnowledgeBase.WebApi.DataTransferObjects
{
    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User ToUser()
        {
            return new User() { UserName = Username, Email = Email };
    }

    }

}
