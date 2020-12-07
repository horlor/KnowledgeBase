using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using KnowledgeBase.DataAccess.DataObjects;

namespace KnowledgeBase.DataAccess.Repos
{
    /// <summary>
    /// It handles the operations for the Topics
    /// </summary>
    public class TopicRepo : ITopicRepo
    {
        private readonly KnowledgeContext dbcontext;

        public TopicRepo(KnowledgeContext context)
        {
            this.dbcontext = context;
        }
        public async Task Delete(int id)
        {
            var dbTopic = await dbcontext.Topics.FirstAsync(t => t.Id == id);
            dbcontext.Topics.Remove(dbTopic);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<Topic> FindById(int id)
        {
            var dbTopic = await dbcontext.Topics.FirstAsync(t => t.Id == id);
            return DbMapper.MapDbTopic(dbTopic);
        }

        public async Task<TopicDetailed> FindDetailedByID(int id)
        {
            var dbTopic = await
                dbcontext.Topics
                    .Include(t => t.Ancestor)
                    .FirstOrDefaultAsync(t => t.Id == id);
            return DbMapper.MapDbTopicDetailed(dbTopic);
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

        public async Task<Topic> Store(TopicDetailed topic)
        {
            DbTopic ancTopic = (topic.Ancestor == null)?null: await dbcontext.Topics.SingleOrDefaultAsync(t => t.Id == topic.Ancestor.Id);
            var dbTopic = new DbTopic()
            {
                Name = topic.Name,
                Ancestor = ancTopic,
            };
            var res = await dbcontext.Topics.AddAsync(dbTopic);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbTopic(res.Entity);
        }

        public async Task<Topic> Store(Topic topic, int ancestorId)
        {
            var ancestor = await dbcontext.Topics.FirstOrDefaultAsync(t => t.Id == ancestorId);
            var dbTopic = new DbTopic()
            {
                Name = topic.Name,
                Ancestor = ancestor,
            };
            var res = await dbcontext.Topics.AddAsync(dbTopic);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbTopic(res.Entity);
        }

        public async Task<Topic> Update(TopicDetailed topic)
        {
            var dbTopic = await dbcontext.Topics.FirstOrDefaultAsync(t => t.Id == topic.Id);
            if (dbTopic is null)
                return null;
            if (topic.Ancestor != null)
            {
                var ancestor = await dbcontext.Topics.FirstOrDefaultAsync(t => t.Id == topic.Ancestor.Id);
                if (ancestor != null)
                    dbTopic.Ancestor = ancestor;
            }
            else
            {
                dbTopic.Ancestor = null;
                dbTopic.AncestorId = null;
            }
            dbTopic.Name = topic.Name;
            Console.WriteLine(dbTopic.Ancestor == null ? "The dbtopic's ancestor is null":"wtf");
            await dbcontext.SaveChangesAsync();
            return topic;
        }
    }
}
