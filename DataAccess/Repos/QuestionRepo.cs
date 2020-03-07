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
            return await FindAnswersforQuestionById(question.Id);  
        }

        public async Task<ICollection<Answer>> FindAnswersforQuestionById(int id)
        {
            return await dbcontext.Answers
                .Where(a => a.Question.Id == id)
                .Include(a => a.User)
                .Select(a => DbMapper.MapDbAnswer(a)).ToListAsync();
        }

        public async Task<Question> FindById(int id)
        {
            var q = await dbcontext.Questions
                .Include(q =>q.User)                
                .SingleAsync(q => q.Id == id);
            return DbMapper.MapDbQuestion(q);
        }

        public async Task<QuestionWithAnswers> FindWithAnswersById(int id)
        {
            var q = await dbcontext.Questions
                .Include(q => q.Answers)
                    .ThenInclude(a => a.User)
                .Include(q => q.User)
                .SingleAsync(q => q.Id == id);
            return DbMapper.MapDbQuestionWithAnswers(q);
        }

        public async Task<ICollection<Question>> List()
        {
            return await dbcontext.Questions
                .Include(q => q.User)
                .Select(q => DbMapper.MapDbQuestion(q)).ToListAsync();
        }

        public async Task<Question> Store(Question question)
        {
            var dbQ = new DbQuestion()
            {
                Content = question.Content,
                Title = question.Title,
            };
            var user = await dbcontext.Users.SingleOrDefaultAsync(u => u.UserName == question.Author);
            if (user == null)
                return null;
            dbQ.User = user;
            await dbcontext.Questions.AddAsync(dbQ);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbQuestion(dbQ);
        }

        public async Task<Answer> StoreAnswerForQuestion(int id, Answer answer)
        {
            DbAnswer dbAnswer = new DbAnswer()
            {
                Content = answer.Content,
            };
            var question = await dbcontext.Questions.SingleOrDefaultAsync(q => q.Id == id);
            var user = await dbcontext.Users.SingleOrDefaultAsync(u => u.UserName == answer.Author);
            if (question == null || user == null)
                return null;
            dbAnswer.Question = question;
            dbAnswer.User = user;
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

        public async Task<ICollection<Question>> GetQuestionsPaged(int pagenum, int pagesize)
        {
            return await dbcontext.Questions
                .Include(q => q.User)
                .Skip(pagenum * pagesize)
                .Take(pagesize)
                .Select(q => DbMapper.MapDbQuestion(q))
                .ToListAsync();
        }

        public async Task<int> Count()
        {
            return await dbcontext.Questions.CountAsync();
        }
        
        public async Task<int> GetPageCount(int pagesize)
        {
            return (int)(Math.Ceiling((float)(await Count()) / pagesize));
        }
    }
}
