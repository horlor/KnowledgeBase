using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBase.DataAccess.Repos
{
    public class QuestionRepo : IQuestionRepo
    {
        private KnowledgeContext dbcontext;
        private IAnswerRepo answerRepo;

        public QuestionRepo(KnowledgeContext context, IAnswerRepo answerRepo)
        {
            dbcontext = context;
            this.answerRepo = answerRepo;
        }


        public async Task Delete(Question question)
        {
            var q = await dbcontext.Questions.SingleAsync(q => q.Id == question.Id);
            dbcontext.Questions.Remove(q);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<ICollection<Answer>> FindAnswersforQuestion(Question question)
        {
            return await dbcontext.Answers
                .Where(a => a.Question.Id == question.Id)
                .Select(a => DbMapper.MapDbAnswer(a)).ToListAsync();  
        }

        public async Task<ICollection<Answer>> FindAnswersforQuestionById(int id)
        {
            return await dbcontext.Answers
                .Where(a => a.Question.Id == id)
                .Select(a => DbMapper.MapDbAnswer(a)).ToListAsync();
        }

        public async Task<Question> FindById(int id)
        {
            var q = await dbcontext.Questions.SingleAsync(q => q.Id == id);
            return DbMapper.MapDbQuestion(q);
        }

        public async Task<QuestionWithAnswers> FindWithAnswersById(int id)
        {
            var q = await dbcontext.Questions
                .Include(q => q.Answers)
                .SingleAsync(q => q.Id == id);
            return DbMapper.MapDbQuestionWithAnswers(q);
        }

        public async Task<ICollection<Question>> List()
        {
            return await dbcontext.Questions.Select(q => DbMapper.MapDbQuestion(q)).ToListAsync();
        }

        public async Task<Question> Store(Question question)
        {
            var dbQ = new DbQuestion()
            {
                Content = question.Content,
                Title = question.Title,
                ///User = dbcontext.Users.SingleOrDefault(u => u.Id == question.AuthorId) //TODO error handling
            };
            await dbcontext.Questions.AddAsync(dbQ);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbQuestion(dbQ);
        }

        public async Task<Answer> StoreAnswerForQuestion(int id, Answer answer)
        {
            DbAnswer dbAnswer = new DbAnswer()
            {
                Content = answer.Content,
                //TODO user handling
                Question = dbcontext.Questions.First(q => q.Id == id)
            };
            await dbcontext.Answers.AddAsync(dbAnswer);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbAnswer(dbAnswer);
        }

        public async Task Update(Question question)
        {
            var q = await dbcontext.Questions.SingleAsync(q => q.Id == question.Id);
            if (q != null)
            {
                q.Content = question.Content;
                q.Title = question.Title;
                //TODO changing user
            }
            await dbcontext.SaveChangesAsync();
        }


    }
}
