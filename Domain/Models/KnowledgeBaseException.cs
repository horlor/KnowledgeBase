using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Models
{
    public class KnowledgeBaseException : Exception
    {
        public KnowledgeBaseException(string message="", Exception inner = null) : base(message,inner) { }
    }

    public class ForbiddenException: KnowledgeBaseException
    {
        public ForbiddenException(string message = "", Exception inner = null) : base(message, inner) { }
    }

    public class NotFoundException : KnowledgeBaseException
    {
        public NotFoundException(string message = "", Exception inner = null) : base(message, inner) { }
    }
    
    public class ConflictedDataException: KnowledgeBaseException
    {
        public ConflictedDataException(string message = "", Exception inner = null) : base(message, inner) { }
    }


}
