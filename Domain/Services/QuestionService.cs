using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
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
        private IAnswerRepo answerRepo;
        public QuestionService(IQuestionRepo repo)
        {
            questionRepo = repo;
        }

        public async Task<ICollection<Question>> GetAllQuestions()
        {
            return await questionRepo.List();
        }

        public async Task UpdateQuestion(Question question)
        {
            //What if the object passed not exists till now
            await questionRepo.Update(question);
        }

        public async Task DeleteQuestion(Question question)
        {
            //Maybe I should explicitly delete all answers for this questions
            await questionRepo.Delete(question);
        }

         public async Task<Question> AddNewQuestion(Question question)
        {
            return await questionRepo.Store(question);
        }

        public async Task<ICollection<Answer>> GetAnswersForQuestion(int id)
        {
            return await questionRepo.FindAnswersforQuestionById(id);
        }

        public async Task<Answer> AddAnswerToQuestion(int qId, Answer answer)
        {
            return await questionRepo.StoreAnswerForQuestion(qId, answer);
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
    }

}
