using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using KnowledgeBase.Entities.DataTransferObjects;
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
                .Include(q => q.Topic)
                .SingleAsync(q => q.Id == id);
            return DbMapper.MapDbQuestion(q);
        }

        public async Task<QuestionWithAnswers> FindWithAnswersById(int id)
        {
            var q = await dbcontext.Questions
                .Include(q => q.Answers)
                    .ThenInclude(a => a.User)
                .Include(q => q.User)
                .Include(q => q.Topic)
                .SingleAsync(q => q.Id == id);
            return DbMapper.MapDbQuestionWithAnswers(q);
        }

        public async Task<ICollection<Question>> List()
        {
            return await dbcontext.Questions
                .Include(q => q.User)
                .Include(q => q.Topic)
                .Select(q => DbMapper.MapDbQuestion(q)).ToListAsync();
        }

        public async Task<Question> Store(Question question)
        {
            //So there would be the same for the creation
            var now = DateTime.Now;
            var dbQ = new DbQuestion()
            {
                Content = question.Content,
                Title = question.Title,
                Created = now,
                LastUpdated = now,
            };
            var user = await dbcontext.Users.SingleOrDefaultAsync(u => u.UserName == question.Author);
            if (user == null)
                return null;
            dbQ.User = user;
            var topic = await dbcontext.Topics.FirstOrDefaultAsync(t => t.Id == question.Topic.Id);
            dbQ.Topic = topic;
            await dbcontext.Questions.AddAsync(dbQ);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbQuestion(dbQ);
        }

        public async Task<Answer> StoreAnswerForQuestion(int id, Answer answer)
        {
            var now = DateTime.Now;
            DbAnswer dbAnswer = new DbAnswer()
            {
                Content = answer.Content,
                Created = now,
                LastUpdated = now,
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

        public async Task<Question> Update(Question question)
        {
            var q = await dbcontext.Questions.SingleAsync(q => q.Id == question.Id);
            if (q != null)
            {
                q.Content = question.Content;
                q.Title = question.Title;
                q.LastUpdated = DateTime.Now;
                await dbcontext.SaveChangesAsync();
            }
            return DbMapper.MapDbQuestion(q);
        }

        public async Task<ICollection<Question>> GetQuestionsPaged(int pagenum, int pagesize)
        {
            return await dbcontext.Questions
                .Include(q => q.User)
                .Include(q => q.Topic)
                .Skip((pagenum -1) * pagesize)
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

        public async Task<QuestionSearchResponse> Search(QuestionSearchRequest request)
        {
            var query = dbcontext.Questions
                .Include(q => q.User)
                .Include(q => q.Topic)
                .Where(q => EF.Functions.Like(q.Title, $"%{request.Anywhere}%") || EF.Functions.Like(q.Content, $"%{request.Anywhere}%"));
            if (!String.IsNullOrEmpty(request.Title))
                query = query.Where(q => EF.Functions.Like(q.Title, $"%{request.Title}%"));
            if (!String.IsNullOrEmpty(request.Content))
                query = query.Where(q => EF.Functions.Like(q.Content, $"%{request.Content}%"));
            if (request.TopicId != null)
                query = query.Where(q => q.Topic.Id == request.TopicId);
            var count = await query.CountAsync();
            query = query
                .OrderByDescending(q => q.LastUpdated)
                .Skip((request.Page - 1) * request.CountPerPage)
                .Take(request.CountPerPage);
            var list = await query.Select(q => DbMapper.MapDbQuestion(q)).ToListAsync();
            return new QuestionSearchResponse()
            {
                Page = request.Page,
                PageSize = request.CountPerPage,
                PageCount = (int)Math.Ceiling(((float)count)/request.CountPerPage),
                Count = count,
                Questions = list,
            };

        }
    }
}
