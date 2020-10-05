using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Models;

namespace KnowledgeBase.Domain.Repository
{
    public interface IAnswerRepo
    {
        Task<Answer> FindById(int id);
        Task<Answer> Store(Answer answer);
        Task<Answer> Update(Answer answer, bool updateTime = true);
        Task Delete(Answer answer);
    }
}
