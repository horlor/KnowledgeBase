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
    public class QuestionRepo : IQuestionRepo
    {
        private KnowledgeContext dbcontext;
        private IAnswerRepo answerRepo;

        public QuestionRepo(KnowledgeContext context, IAnswerRepo answerRepo)
        {
            dbcontext = context;
            this.answerRepo = answerRepo;
        }


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

        public ICollection<Answer> FindAnswersforQuestionById(int id)
        {
            return dbcontext.Answers
                .Where(a => a.Question.Id == id)
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
                ///User = dbcontext.Users.SingleOrDefault(u => u.Id == question.AuthorId) //TODO error handling
            };
            dbcontext.Questions.Add(dbQ);
            dbcontext.SaveChanges();
            return DbMapper.MapDbQuestion(dbQ);
        }

        public Answer StoreAnswerForQuestion(int id, Answer answer)
        {
            DbAnswer dbAnswer = new DbAnswer()
            {
                Content = answer.Content,
                //TODO user handling
                Question = dbcontext.Questions.First(q => q.Id == id)
            };
            dbcontext.Answers.Add(dbAnswer);
            dbcontext.SaveChanges();
            return DbMapper.MapDbAnswer(dbAnswer);
        }

        public void Update(Question question)
        {
            var q = dbcontext.Questions.Single(q => q.Id == question.Id);
            if (q != null)
            {
                q.Content = question.Content;
                q.Title = question.Title;
                //TODO changing user
            }
            dbcontext.SaveChanges();
        }


    }
}
