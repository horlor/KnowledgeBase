using KnowledgeBase.Domain.Interfaces;
using KnowledgeBase.Entities;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.Hubs
{
    public class QuestionHubProxy : IQuestionHub
    {
        private readonly IHubContext<QuestionHub, IQuestionHubClient> hubContext;

        public QuestionHubProxy(IHubContext<QuestionHub, IQuestionHubClient> hubContext)
        {
            this.hubContext = hubContext;
        }

        public async Task OnAnswerDeleted(int questionId, Answer answer)
        {
            await hubContext.Clients.Group(questionId.ToString()).AnswerDeleted(answer);
        }

        public async Task OnAnswerEdited(int questionId, Answer answer)
        {
            await hubContext.Clients.Group(questionId.ToString()).AnswerEdited(answer);
        }

        public async Task OnNewAnswer(int questionId, Answer answer)
        {
            await hubContext.Clients.Group(questionId.ToString()).NewAnswer(answer);
        }

        public async Task OnQuestionEdited(Question question)
        {
            await hubContext.Clients.Group(question.Id.ToString()).QuestionEdited(question);
        }

        public async Task OnQuestionClosed(int questionId, Answer answer)
        {
            await hubContext.Clients.Group(questionId.ToString()).QuestionClosed(answer);
        }

        public async Task OnQuestionReopend(int questionId, Answer answer)
        {
            await hubContext.Clients.Group(questionId.ToString()).QuestionReopened(answer);
        }
    }
}
