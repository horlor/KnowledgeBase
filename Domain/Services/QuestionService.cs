using KnowledgeBase.Domain.Interfaces;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Domain.Models;

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net.Http;
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

        public async Task DeleteQuestion(int id, string username, string role)
        {
            var question = await questionRepo.FindById(id);
            if (question == null)
                throw new NotFoundException();
            if (question.Author != username)
                throw new ConflictedDataException();
            //All the answers will be deleted because of Cascade delete in MS SQL
            await questionRepo.Delete(question);
        }

        public async Task<Question> AddNewQuestion(Question q, string username, string role)
        {
            if (q.Author != username)
                throw new ConflictedDataException();
            var question = await questionRepo.Store(q);
            await notificationService.CreateNewQuestionNotification(question);
            return question;
        }

        public async Task<ICollection<Answer>> GetAnswersForQuestion(int id, string username = null, string role = null)
        {
            var answers = await questionRepo.FindAnswersforQuestionById(id);
            if (!UserService.AuthenticateModerator(role))
                answers = answers.Select(a =>
                {
                    if (a.Type == AnswerType.HiddenByModerator && a.Author != username)
                    {
                        a.Content = "";
                        a.Moderator = "";
                        a.ModeratorMessage = "";
                    }

                    return a;
                }).ToList();
            return answers;
        }

        public async Task<Answer> AddAnswerToQuestion(int qId, Answer answer, string username, string role)
        {
            if (answer.Author != username)
                throw new ConflictedDataException();
            answer.Type = AnswerType.Simple;
            var (ret, q) = await questionRepo.StoreAnswerForQuestion(qId, answer);
            if (q == null)
                throw new NotFoundException();
            await questionHub.OnNewAnswer(qId, ret);
            await notificationService.CreateNewAnswerNotification(q, ret);
            return ret;
        }

        public async Task<Question> GetQuestion(int id)
        {
            return await questionRepo.FindById(id);
        }

        public async Task<QuestionWithAnswers> GetQuestionWithAnswers(int id, string username=null, string role=null)
        {
            var question = await questionRepo.FindWithAnswersById(id);
            if (question.Type == QuestionType.HiddenByModerator && username != question.Author && !UserService.AuthenticateModerator(role))
                throw new ForbiddenException();
            if(!UserService.AuthenticateModerator(role))
                question.Answers = question.Answers.Select(a =>
                {
                    if (a.Type == AnswerType.HiddenByModerator && a.Author != username)
                    {
                        a.Content = "";
                        a.Moderator = "";
                        a.ModeratorMessage = "";
                    }
                       
                    return a;
                }).ToList();
            return question;
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

        public async Task DeleteAnswer(int questionId, int answerId, string username, string role)
        {
            var answer = await answerRepo.FindById(answerId);
            if (answer == null)
                throw new NotFoundException();
            if (answer.Author != username || answer.Type != AnswerType.Simple)
                throw new ConflictedDataException();
            answer.Content = "";
            answer.Type = AnswerType.Deleted;
            await answerRepo.Update(answer);
            await questionHub.OnAnswerEdited(questionId, answer);
        }

        public async Task<Question> UpdateQuestion(int id, QuestionUpdateModel request, string username, string role)
        {
            var question = await questionRepo.FindById(id);
            if (question == null)
                throw new NotFoundException();
            if (question.Author != username)
                throw new ConflictedDataException();
            question.Content = request.Content;
            var ret = await questionRepo.Update(question);
            await questionHub.OnQuestionEdited(ret);
            if (question.Moderator != null)
                await notificationService.CreateHiddenQuestionEditedNotification(question);
            return question;
        }

        public async Task<Answer> UpdateAnswer(int questionId, int answerId, AnswerUpdateModel request, string username, string role)
        {
            var answer = await answerRepo.FindById(answerId);
            if (answer == null)
                throw new NotFoundException();
            if (answer.Author != username)
                throw new ConflictedDataException();
            answer.Content = request.Content;
            var ret = await answerRepo.Update(answer);
            await questionHub.OnAnswerEdited(answer.QuestionId, answer);
            if (answer.Moderator != null)
                await notificationService.CreateHiddenAnswerEditedNotification(answer.QuestionId, answer);
            return ret;
        }

        public async Task<QuestionSearchResult> Search(QuestionSearchParams request, string username, string role)
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

        public async Task<Answer> CloseQuestion(int questionId, Answer answer, string username, string role)
        {
            var question = await questionRepo.FindById(questionId);
            if (question == null)
                throw new NotFoundException();
            if (!(username == question.Author || UserService.AuthenticateModerator(role)))
                throw new ForbiddenException();
            if (username != answer.Author || question.Closed == true)
                throw new ConflictedDataException();
            question.Closed = true;
            answer.Type = AnswerType.Closer;
            var q = await questionRepo.Update(question, false);
            var (ret, _) = await questionRepo.StoreAnswerForQuestion(questionId, answer);
            await questionHub.OnQuestionClosed(questionId, answer);
            return ret;
        }

        public async Task<Answer> ReopenQuestion(int questionId, Answer answer, string username, string role)
        {
            var question = await questionRepo.FindById(questionId);
            if (question == null)
                throw new NotFoundException();
            if (!(username == question.Author || UserService.AuthenticateModerator(role)))
                throw new ForbiddenException();
            if (username != answer.Author || question.Closed == false)
                throw new ConflictedDataException();
            question.Closed = false;
            answer.Type = AnswerType.Reopener;
            await questionRepo.Update(question, false);
            var (ret, _) = await questionRepo.StoreAnswerForQuestion(questionId, answer);
            await questionHub.OnQuestionReopened(questionId, answer);
            return ret;
        }

        public async Task<Question> HideQuestion(int questionId, string username, string role = "User", string message = "")
        {
            if (!UserService.AuthenticateModerator(role))
                throw new ForbiddenException();
            var question = await questionRepo.FindById(questionId);
            if (question == null)
                throw new NotFoundException();

            question.Type = QuestionType.HiddenByModerator;
            question.Moderator = username;
            question.ModeratorMessage = message;
            var ret = await questionRepo.Update(question, false);
            await questionHub.OnQuestionEdited(question);
            await notificationService.CreateQuestionSetHiddenNotification(ret);
            return ret;
        }

        public async Task<Question> UnhideQuestion(int questionId, string username, string role = "User")
        {
            if (!UserService.AuthenticateModerator(role))
                throw new ForbiddenException();
            var question = await questionRepo.FindById(questionId);
            if (question == null)
                throw new NotFoundException();

            question.Type = QuestionType.Simple;
            question.Moderator = null;
            question.ModeratorMessage = null;
            var ret = await questionRepo.Update(question, false);
            await questionHub.OnQuestionEdited(question);
            return ret;
        }

        public async Task<Answer> HideAnswer(int questionId, int answerId, string message, string username, string role)
        {
            if (!UserService.AuthenticateModerator(role))
                throw new ForbiddenException();
            var answer = await answerRepo.FindById(answerId);
            if (answer == null)
                throw new NotFoundException();

            answer.Type = AnswerType.HiddenByModerator;
            answer.ModeratorMessage = message;
            answer.Moderator = username;
            var ret = await answerRepo.Update(answer, false);
            await questionHub.OnAnswerEdited(ret.QuestionId, answer);
            await notificationService.CreateAnswerSetHiddenNotification(ret.QuestionId, ret);
            return ret;
        }

        public async Task<Answer> UnhideAnswer(int questionId, int answerId, string username, string role)
        {
            if (!UserService.AuthenticateModerator(role))
                throw new ForbiddenException();
            var answer = await answerRepo.FindById(answerId);
            if (answer == null)
                throw new NotFoundException();

            answer.Type = AnswerType.Simple;
            answer.ModeratorMessage = "";
            answer.Moderator = null;
            var ret = await answerRepo.Update(answer, false);
            await questionHub.OnAnswerEdited(ret.QuestionId, answer);
            return ret;
        }

    }

}
