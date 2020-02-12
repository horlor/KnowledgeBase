using System;
using System.Collections.Generic;
using System.Text;
using KnowledgeBase.Entities;

namespace KnowledgeBase.Domain.Repository
{
    public interface IAnswerRepo
    {
        Answer FindByID(Guid id);
        Answer Store(Answer answer);
        void Update(Answer answer);
        void Delete(Answer answer);
    }
}
