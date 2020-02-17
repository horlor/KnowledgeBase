using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KnowledgeBase.DataAccess.Repos
{
    public class AnswerRepo : IAnswerRepo
    {
        private KnowledgeContext dbcontext;
        public AnswerRepo(KnowledgeContext context)
        {
            dbcontext = context;
        }

        public void Delete(Answer answer)
        {
            var ans = dbcontext.Answers.First(a => a.Id == answer.Id);
            dbcontext.Remove(ans);
        }

        public Answer FindById(int id)
        {
            return DbMapper.MapDbAnswer(dbcontext.Answers.First(a => a.Id == id));
        }

        public Answer Store(Answer answer)
        {
            var dbAnswer = new DbAnswer()
            {
                Content = answer.Content
            };
            var a = dbcontext.Answers.Add(dbAnswer);
            dbcontext.SaveChanges();
            answer.Id = a.Entity.Id;
            return answer;
        }

        public void Update(Answer answer)
        {
            var ans = dbcontext.Answers.First(a => a.Id == answer.Id);
            ans.Content = answer.Content;
            //TODO Author - User Pairing
        }
    }
}
