using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.Hubs
{
    public interface IQuestionHubClient
    {
        Task NewAnswer(Answer answer);
        Task AnswerEdited(Answer answer);
        Task AnswerDeleted(Answer answer);
        Task QuestionEdited(Question question);
        Task QuestionClosed(Answer answer);
        Task QuestionReopened(Answer answer);
    }
}
