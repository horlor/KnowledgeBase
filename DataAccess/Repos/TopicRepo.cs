using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using KnowledgeBase.DataAccess.DataObjects;

namespace KnowledgeBase.DataAccess.Repos
{
    public class TopicRepo : ITopicRepo
    {
        private KnowledgeContext dbcontext;

        public TopicRepo(KnowledgeContext context)
        {
            this.dbcontext = context;
        }
        public async Task Delete(Topic topic)
        {
            var dbTopic = await dbcontext.Topics.FirstAsync(t => t.Id == topic.Id);
            dbcontext.Topics.Remove(dbTopic);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<Topic> FindById(int id)
        {
            var dbTopic = await dbcontext.Topics.FirstAsync(t => t.Id == id);
            return DbMapper.MapDbTopic(dbTopic);
        }

        public async Task<Topic> FindByName(string name)
        {
            var dbTopic = await dbcontext.Topics.FirstAsync(t => t.Name == name);
            return DbMapper.MapDbTopic(dbTopic);
        }

        public async Task<ICollection<Topic>> List()
        {
            return await dbcontext.Topics
                .Select(t => DbMapper.MapDbTopic(t))
                .ToListAsync();
        }

        public async Task<Topic> Store(Topic topic)
        {
            var dbTopic = new DbTopic()
            {
                Name = topic.Name,
            };
            var res = await dbcontext.Topics.AddAsync(dbTopic);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbTopic(res.Entity);
            
        }

        public async Task<Topic> Update(Topic topic)
        {
            var dbTopic = await dbcontext.Topics.FirstAsync(t => t.Id == topic.Id);
            if (dbTopic is null)
                return null;
            dbTopic.Name = topic.Name;
            return topic;
        }
    }
}
