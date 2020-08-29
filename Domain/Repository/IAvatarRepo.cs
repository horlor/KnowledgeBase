using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Repository
{
    public interface IAvatarRepo
    {
        Task AddOrSetAvatar(string userName, IFormFile image);
        Task DeleteAvatar(string username);
        PhysicalFileResult GetAvatar(string username);
    }
}
