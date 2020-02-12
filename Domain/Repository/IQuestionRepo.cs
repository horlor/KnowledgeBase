using System;
using System.Collections.Generic;
using System.Text;
using KnowledgeBase.Entities;

namespace KnowledgeBase.Domain.Repository
{
    public interface IQuestionRepo
    {
        Question FindById(Guid id);
        Question Store(Question question);
        void Update(Question question);
        void Delete(Question question);

        ICollection<Question> List();
    }
}
