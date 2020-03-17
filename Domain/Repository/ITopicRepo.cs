using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Repository
{
    public interface ITopicRepo
    {
        Task<Topic> Store(TopicDetailed topic);
        Task<Topic> Store(Topic topic, int ancestorId);
        Task<Topic> Update(TopicDetailed topic);
        Task Delete(int id);
        Task<Topic> FindById(int id);
        Task<Topic> FindByName(string name);
        Task<ICollection<Topic>> List();
        Task<TopicDetailed> FindDetailedByID(int id);
    }
}
