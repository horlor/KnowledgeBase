using System;
using System.Collections.Generic;
using System.Text;
using KnowledgeBase.Entities;

namespace KnowledgeBase.Domain.Repository
{
    public interface IUserRepo
    {
        User FindById(int id);
        User Store(User user);
        void Update(User user);
        void Delete(User user);
        void Delete(int id);
    }
}
