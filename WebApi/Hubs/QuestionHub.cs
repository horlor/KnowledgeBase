using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.Hubs
{
    public class QuestionHub : Hub<IQuestionHubClient>
    {
        public async Task JoinQuestion(int questionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, questionId.ToString());
        }

        public async Task LeaveQuestion(int questionId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, questionId.ToString());
        }
    }
}
