using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Services
{
    public class TopicService
    {
        private ITopicRepo topicRepo;

        public TopicService(ITopicRepo topicRepo)
        {
            this.topicRepo = topicRepo;
        }

        public async Task<Topic> GetTopic(int id)
        {
            return await topicRepo.FindById(id);
        }

        public async Task<TopicDetailed> GetTopicDetailed(int id)
        {
            return await topicRepo.FindDetailedByID(id);
        }


        public async Task<ICollection<Topic>> GetAll()
        {
            return await topicRepo.List();
        }

        public async Task<Topic> Store(TopicDetailed topic)
        {
            return await topicRepo.Store(topic);
        }

        public async Task<Topic> Store(Topic topic, int ancestorId)
        {
            return await topicRepo.Store(topic, ancestorId);
        }

        public async Task<Topic> Update(TopicDetailed topic)
        {
            return await topicRepo.Update(topic);
        }

        public async Task Delete(int id)
        {
            await topicRepo.Delete(id);
        }

    }
}
