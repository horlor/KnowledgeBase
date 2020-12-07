using KnowledgeBase.Domain.Repository;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.DataAccess.Repos
{
    /// <summary>
    /// The repo for storing the avatar images, it stores them in the filesystem, not the database.
    /// </summary>
    public class AvatarRepo : IAvatarRepo
    {
        private readonly string avatarPath;

        public AvatarRepo(DatabaseSettings databaseSettings)
        {
            avatarPath = databaseSettings.avatarPath;
        }

        public async Task AddOrSetAvatar(string username, Stream imageStream, string extension)
        {
            await DeleteAvatar(username);
            using (var stream = new FileStream($"{avatarPath}/{username}{extension}", FileMode.Create))
            {
                await imageStream.CopyToAsync(stream);
            }

        }

        public async Task AddOrSetAvatar(string userName, IFormFile image)
        {
            if (image == null)
                return;
            await DeleteAvatar(userName);
            string extension = Path.GetExtension(image.FileName);
            using (var stream = new FileStream($"{avatarPath}/{userName}{extension}", FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
        }

        public async Task DeleteAvatar(string username)
        {
            await Task.Run(() =>
            {
                var files = Directory.GetFiles(avatarPath, $"{username}.*");
                foreach (var file in files)
                {
                    File.Delete(file);
                }
            });
        }

        public (Stream, string) GetAvatar(string username)
        {
            var files = Directory.GetFiles(avatarPath, $"{username}.*");
            if (files.Length > 0)
            {
                string extension = Path.GetExtension(files.First());
                return (new FileStream(files.First(), FileMode.Open, FileAccess.Read, FileShare.Read), extension);
            }
            return (null, null);
        }
    }
}
