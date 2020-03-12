using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Repository
{
    public interface ITopicRepo
    {
        Task<Topic> Store(Topic topic);
        Task<Topic> Update(Topic topic);
        Task Delete(Topic topic);
        Task<Topic> FindById(int id);
        Task<Topic> FindByName(string name);
        Task<ICollection<Topic>> List();
    }
}
