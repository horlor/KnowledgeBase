using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KnowledgeBase.Entities;
using Microsoft.AspNetCore.Identity;

namespace KnowledgeBase.Domain.Repository
{
    public interface IUserRepo
    {
        Task<IdentityResult> Create(User user, string password);
        Task<IdentityResult> Delete(User user);
        Task<User> GetByName(string name);
        Task<ICollection<User>> List();

        Task<SignInResult> SignIn(string username, string password);

        Task SignOut();


    }

}
