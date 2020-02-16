using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeBase.DataAccess.Repos
{
    public class QuestionRepository : IQuestionRepo
    {
        private KnowledgeContext dbcontext = new KnowledgeContext();

        public void Delete(Question question)
        {
            var q = dbcontext.Questions.Single(q => q.Id == question.Id);
            dbcontext.Questions.Remove(q);
            dbcontext.SaveChanges();
        }

        public ICollection<Answer> FindAnswersforQuestion(Question question)
        {
            return dbcontext.Answers
                .Where(a => a.Question.Id == question.Id)
                .Select(a => DbMapper.MapDbAnswer(a)).ToList();  
        }

        public Question FindById(int id)
        {
            var q = dbcontext.Questions.Single(q => q.Id == id);
            return DbMapper.MapDbQuestion(q);
        }

        public QuestionWithAnswers FindWithAnswersById(int id)
        {
            var q = dbcontext.Questions
                .Include(q => q.Answers)
                .Single(q => q.Id == id);
            return DbMapper.MapDbQuestionWithAnswers(q);
        }

        public ICollection<Question> List()
        {
            return dbcontext.Questions.Select(q => DbMapper.MapDbQuestion(q)).ToList();
        }

        public Question Store(Question question)
        {
            var dbQ = new DbQuestion()
            {
                Content = question.Content,
                Title = question.Title,
                User = dbcontext.Users.Single(u => u.Id == question.AuthorId) //TODO error handling
            };
            dbcontext.Questions.Add(dbQ);
            dbcontext.SaveChanges();
            return DbMapper.MapDbQuestion(dbQ);
        }

        public void Update(Question question)
        {
            var q = dbcontext.Questions.Single(q => q.Id == question.Id);
            if (q != null)
            {
                q.Content = question.Content;
                q.Title = question.Title;
                //TODO user changing
            }
        }


    }
}
