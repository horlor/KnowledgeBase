using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.WebApi.DataTransferObjects
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    public class RefreshRequest
    {
        public string Username { get; set; }

        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
