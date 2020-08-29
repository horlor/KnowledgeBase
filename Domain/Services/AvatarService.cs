using KnowledgeBase.Domain.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Services
{
    public class AvatarService
    {
        private readonly IAvatarRepo avatarRepo;

        public AvatarService(IAvatarRepo avatarRepo)
        {
            this.avatarRepo = avatarRepo;
        }

        public Task AddOrSetAvatar(string username, IFormFile file)
        {
            return avatarRepo.AddOrSetAvatar(username, file);
        }

        public PhysicalFileResult GetAvatar(string username)
        {
            return avatarRepo.GetAvatar(username);
        }

        public Task DeleteAvatar(string username)
        {
            return avatarRepo.DeleteAvatar(username);
        }
    }
}
