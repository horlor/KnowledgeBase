using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.WebApi.DataTransferObjects
{
    public class PasswordRecoveryRequest
    {
        public string Username { get; set; }
    }

    public class PasswordResetRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }

    public class PasswordChangeRequest
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
