using KnowledgeBase.Domain.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
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

        public async Task AddOrSetAvatar(string username, IFormFile file)
        {
            await avatarRepo.AddOrSetAvatar(username, file);
        }

        public async Task AddOrSetAvatar(string username, Stream imageStream, string extension)
        {
            await avatarRepo.AddOrSetAvatar(username, imageStream, extension);
        }

        public (Stream, string) GetAvatar(string username)
        {
            return avatarRepo.GetAvatar(username);
            
        }

        public async Task DeleteAvatar(string username)
        {
            await avatarRepo.DeleteAvatar(username);
        }
    }
}
