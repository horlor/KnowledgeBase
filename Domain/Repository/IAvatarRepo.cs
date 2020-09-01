using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Repository
{
    public interface IAvatarRepo
    {
        Task AddOrSetAvatar(string userName, IFormFile image);

        Task AddOrSetAvatar(string username, Stream imageStream, string extension);
        Task DeleteAvatar(string username);
        (Stream, string) GetAvatar(string username);
    }
}
