using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Interfaces
{
    public interface IQuestionHub
    {
        Task OnNewAnswer(int questionId, Answer answer);
        Task OnAnswerEdited(int questionId, Answer answer);
        Task OnAnswerDeleted(int questionId, Answer answer);
        Task OnQuestionEdited(Question question);
        Task OnQuestionReopened(int questionId, Answer answer);
        Task OnQuestionClosed(int questionId, Answer answer);
    }
}
