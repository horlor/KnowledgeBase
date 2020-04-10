using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.DataAccess.Repos
{
    public class AnswerRepo : IAnswerRepo
    {
        private KnowledgeContext dbcontext;
        public AnswerRepo(KnowledgeContext context)
        {
            dbcontext = context;
        }

        public async Task Delete(Answer answer)
        {
            var ans = dbcontext.Answers.FirstOrDefault(a => a.Id == answer.Id);
            dbcontext.Remove(ans);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<Answer> FindById(int id)
        {
            return DbMapper.MapDbAnswer(await dbcontext.Answers.Include(a => a.User).FirstOrDefaultAsync(a => a.Id == id));
        }

        public async Task<Answer> Store(Answer answer)
        {
            var now = DateTime.Now;
            var dbAnswer = new DbAnswer()
            {
                Content = answer.Content,
                Created = now,
                LastUpdated = now,
            };
            var a = await dbcontext.Answers.AddAsync(dbAnswer);
            await dbcontext.SaveChangesAsync();
            answer.Id = a.Entity.Id;
            return answer;
        }

        public async Task<Answer> Update(Answer answer)
        {
            var ans = await dbcontext.Answers.FirstAsync(a => a.Id == answer.Id);
            ans.Content = answer.Content;
            ans.LastUpdated = DateTime.Now;
            var user = dbcontext.Users.FirstOrDefault(u => u.UserName == answer.Author);
            if(user !=null)
            {
                ans.User = user;
            }
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbAnswer(ans);
        }
    }
}
