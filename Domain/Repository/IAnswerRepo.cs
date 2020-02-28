using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KnowledgeBase.Entities;

namespace KnowledgeBase.Domain.Repository
{
    public interface IAnswerRepo
    {
        Task<Answer> FindById(int id);
        Task<Answer> Store(Answer answer);
        Task Update(Answer answer);
        Task Delete(Answer answer);
    }
}
