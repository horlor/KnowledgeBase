using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Interfaces
{
    public interface ITokenGenerator
    {
        object GenerateToken(string username);
    }
}
