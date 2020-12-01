using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Domain.Models;
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
        private readonly KnowledgeContext dbcontext;
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
            return DbMapper.MapDbAnswer(
                await dbcontext.Answers
                .Include(a => a.User)
                .Include(a=> a.Moderator)
                .FirstOrDefaultAsync(a => a.Id == id));
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

        public async Task<Answer> Update(Answer answer, bool updateTime = true)
        {
            var ans = await dbcontext.Answers.FirstAsync(a => a.Id == answer.Id);
            ans.Content = answer.Content;
            if(updateTime)
                ans.LastUpdated = DateTime.Now;
            var user = await dbcontext.Users.FirstOrDefaultAsync(u => u.UserName == answer.Author);
            if(user !=null)
            {
                ans.User = user;
            }
            var moderator = await dbcontext.Users.FirstOrDefaultAsync(u => u.UserName == answer.Moderator);
            ans.Type = answer.Type;
            ans.Moderator = moderator;
            ans.ModeratorMessage = answer.ModeratorMessage;
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbAnswer(ans);
        }
    }
}
