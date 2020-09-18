﻿using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class KnowledgeBaseException : Exception
    {
        public KnowledgeBaseException(string message="", Exception inner = null) : base(message,inner) { }
    }

    public class UnathorizedException: KnowledgeBaseException
    {
        public UnathorizedException(string message = "", Exception inner = null) : base(message, inner) { }
    }

    public class NotFoundException : KnowledgeBaseException
    {
        public NotFoundException(string message = "", Exception inner = null) : base(message, inner) { }
    }



}
