﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace KnowledgeBase.Domain.Repository
{
    public interface IUserRepo
    {
        Task<IdentityResult> Create(User user, string password);
        Task<IdentityResult> Delete(User user);
        Task<User> GetByName(string name);
        Task<ICollection<User>> List();

        Task<(SignInResult, string, string)> SignIn(string username, string password);
        Task<(bool, string, string)> ValidateRefreshToken(string username, string token);

        Task SignOut();

        Task<UserDetailed> GetDetailedByName(string name);

        Task<ICollection<User>> GetAllUser();
        Task<UserDetailed> UpdateUser(UserDetailed user);
        Task<ICollection<User>> GetUsersByTopic(Topic topic);

        Task<string> SetUserRole(User user, string role);
        Task<UserWithRole> GetUserWithRole(string username);

        Task<int> Count();
        Task<int> PageCount(int pagesize = 16);
        Task<ICollection<User>> GetUsersPaged(int pagenum, int pagesize = 16);

        Task<UserSearchParams> Search(UserSearchResult request);

        Task<IdentityResult> ResetPassword(string username, string token, string password);
        Task<(User, string)> GetPasswordRecoveryToken(string username);
        Task<IdentityResult> ChangePassword(string username, string oldPassword, string newPassword);

    }

}
