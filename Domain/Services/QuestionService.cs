using KnowledgeBase.Domain.Interfaces;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using KnowledgeBase.Entities.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Services
{
    public class QuestionService
    {
        private readonly IQuestionRepo questionRepo;
        private readonly NotificationService notificationService;
        private readonly IAnswerRepo answerRepo;
        private readonly IQuestionHub questionHub;

        public QuestionService(IQuestionRepo questionRepo, NotificationService notificationService, IAnswerRepo answerRepo, IQuestionHub questionHub)
        {
            this.questionRepo = questionRepo;
            this.notificationService = notificationService;
            this.answerRepo = answerRepo;
            this.questionHub = questionHub;
        }

        public async Task<ICollection<Question>> GetAllQuestions()
        {
            return await questionRepo.List();
        }

        public async Task DeleteQuestion(Question question)
        {
            //All the answers will be deleted because of Cascade delete in MS SQL
            await questionRepo.Delete(question);
        }

        public async Task<Question> AddNewQuestion(Question q)
        {
            var question = await questionRepo.Store(q);
            await notificationService.CreateNewQuestionNotification(question);
            return question;
        }

        public async Task<ICollection<Answer>> GetAnswersForQuestion(int id)
        {
            return await questionRepo.FindAnswersforQuestionById(id);
        }

        public async Task<Answer> AddAnswerToQuestion(int qId, Answer answer)
        {
            //To made sure that no opener or closer answer will be created without the consisting property
            answer.Type = AnswerType.Simple;
            var (ret, q) = await questionRepo.StoreAnswerForQuestion(qId, answer);
            await questionHub.OnNewAnswer(qId, ret);
            await notificationService.CreateNewAnswerNotification(q, ret);
            return ret;
        }

        public async Task<Question> GetQuestion(int id)
        {
            return await questionRepo.FindById(id);
        }

        public async Task<QuestionWithAnswers> GetQuestionWithAnswers(int id)
        {
            return await questionRepo.FindWithAnswersById(id);
        }

        public async Task<ICollection<Question>> GetQuestionsPaged(int pagenum, int pagesize)
        {
            return await questionRepo.GetQuestionsPaged(pagenum, pagesize);
        }

        public async Task<int> GetPageCount(int pagesize)
        {
            return await questionRepo.GetPageCount(pagesize);
        }

        public async Task<Answer> GetAnswer(int id)
        {
            return await answerRepo.FindById(id);
        }

        public async Task DeleteAnswer(int questionId, Answer answer)
        {
            await answerRepo.Delete(answer);
            await questionHub.OnAnswerDeleted(questionId, answer);
        }

        public async Task<Question> UpdateQuestion(Question question)
        {
            var ret = await questionRepo.Update(question);
            await questionHub.OnQuestionEdited(ret);
            return question;
        }

        public async Task<Answer> UpdateAnswer(int questionId, Answer answer)
        {
            var ret = await answerRepo.Update(answer);
            await questionHub.OnAnswerEdited(questionId, answer);
            return ret;
        }

        public async Task<QuestionSearchResponse> Search(QuestionSearchRequest request, string username, string role)
        {
            if (username != null)
            {
                request.Username = username;
                request.IncludeHidden = true;
            }
            else
                request.OnlyHidden = false;
            if (UserService.AuthenticateModerator(role))
            {
                request.IncludeHidden = true;
            }
            else
                request.OnlyHidden = false;
            return await questionRepo.Search(request);
        }

        public async Task<Answer> CloseQuestion(int questionId, Answer answer)
        {
            var ret = await questionRepo.CloseQuestion(questionId, answer);
            await questionHub.OnQuestionClosed(questionId, answer);
            return ret;
        }

        public async Task<Answer> ReopenQuestion(int questionId, Answer answer)
        {
            var ret = await questionRepo.ReopenQuestion(questionId, answer);
            await questionHub.OnQuestionReopend(questionId, answer);
            return ret;
        }

        public async Task<Question> HideQuestion(int questionId, string username, string role = "User", string message = "")
        {
            if (!UserService.AuthenticateModerator(role))
                throw new UnathorizedException();
            var question = await questionRepo.FindById(questionId);
            if (question == null)
                throw new NotFoundException();
            question.Type = QuestionType.HiddenByModerator;
            question.Moderator = username;
            question.ModeratorMessage = message;
            return await questionRepo.Update(question, false);
        }

        public async Task<Question> UnhideQuestion(int questionId, string username, string role = "User")
        {
            if (!UserService.AuthenticateModerator(role))
                throw new UnathorizedException();
            var question = await questionRepo.FindById(questionId);
            if (question == null)
                throw new NotFoundException();
            question.Type = QuestionType.Simple;
            return await questionRepo.Update(question, false);
        }

    }

}
