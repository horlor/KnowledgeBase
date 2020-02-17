using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KnowledgeBase.DataAccess.Repos
{
    public class UserRepo : IUserRepo
    {
        private KnowledgeContext context;

        public UserRepo(KnowledgeContext context)
        {
            this.context = context;
        }
        public void Delete(User user)
        {
            Delete(user.Id);
        }

        public void Delete(int id)
        {
            var dbUser = context.Users.First(u => u.Id == id);
            context.Users.Remove(dbUser);
        }

        public User FindById(int id)
        {
            var dbUser = context.Users.First(u => u.Id == id);
            throw new NotImplementedException();
        }

        public User Store(User user)
        {
            throw new NotImplementedException();
        }

        public void Update(User user)
        {
            throw new NotImplementedException();
        }
    }
}
