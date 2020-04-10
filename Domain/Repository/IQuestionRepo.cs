using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KnowledgeBase.Entities;

namespace KnowledgeBase.Domain.Repository
{
    public interface IQuestionRepo
    {
        Task<Question> FindById(int id);
        Task<Question> Store(Question question);
        Task<Question> Update(Question question);
        Task Delete(Question question);
        Task<ICollection<Question>> List();
        Task<QuestionWithAnswers> FindWithAnswersById(int id);
        Task<ICollection<Answer>> FindAnswersforQuestion(Question question);
        Task<ICollection<Answer>> FindAnswersforQuestionById(int id);
        Task<Answer> StoreAnswerForQuestion(int id, Answer answer);

        Task<ICollection<Question>> GetQuestionsPaged(int pagenum, int pagesize);
        Task<int> Count();
        Task<int> GetPageCount(int pagesize);
    }
}
