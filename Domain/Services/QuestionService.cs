using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using KnowledgeBase.Entities.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Services
{
    public class QuestionService
    {
        private IQuestionRepo questionRepo;
        private NotificationService notificationService;
        private IAnswerRepo answerRepo;

        public QuestionService(IQuestionRepo questionRepo, NotificationService notificationService, IAnswerRepo answerRepo)
        {
            this.questionRepo = questionRepo;
            this.notificationService = notificationService;
            this.answerRepo = answerRepo;
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
            var question =  await questionRepo.Store(q);
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

        public async Task DeleteAnswer(Answer answer)
        {
            await answerRepo.Delete(answer);
        }

        public async Task<Question> UpdateQuestion(Question question)
        {
            return await questionRepo.Update(question);
        }

        public async Task<Answer> UpdateAnswer(Answer answer)
        {
            return await answerRepo.Update(answer);
        }

        public async Task<QuestionSearchResponse> Search(QuestionSearchRequest request)
        {
            return await questionRepo.Search(request);
        }
        
        public async Task<Answer> CloseQuestion(int questionId, Answer answer)
        {
            return await questionRepo.CloseQuestion(questionId, answer);
        }

        public async Task<Answer> ReopenQuestion(int questionId, Answer answer)
        {
            return await questionRepo.ReopenQuestion(questionId, answer);
        }
    }

}
