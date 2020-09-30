using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Interfaces
{
    public interface IEmailHandler
    {
        Task SendPasswordRecoveryEmail(User user, string token);
    }
}
