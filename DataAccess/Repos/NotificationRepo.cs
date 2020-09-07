using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.DataAccess.Repos
{
    public class NotificationRepo : INotificationRepo
    {
        private KnowledgeContext dbcontext;

        public NotificationRepo(KnowledgeContext context)
        {
            dbcontext = context;
        }

        public async Task<Notification> CreateForUser(string username, Notification notification)
        {
            var dbUser = await dbcontext.Users.FirstOrDefaultAsync(u => u.UserName == username);
            if (dbUser == null)
                return null;
            
            var dbQuestion = await dbcontext.Questions.FirstOrDefaultAsync(q => q.Id == notification.QuestionId);
            if (dbQuestion == null)
                return null;
            DbNotification dbNotification = new DbNotification
            {
                User = dbUser,
                UserId = dbUser.Id,
                Question = dbQuestion,
                QuestionId = dbQuestion.Id,
                Content = notification.Content,
                Title = notification.Title,
            };
            var ret = await dbcontext.Notifications.AddAsync(dbNotification);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbNotification(ret.Entity);
        }

        public async Task<Notification> CreateWithUserId(string userId, Notification notification)
        {
            DbNotification dbNotification = new DbNotification
            {
                UserId = userId,
                QuestionId = notification.QuestionId,
                Content = notification.Content,
                Title = notification.Title,
            };
            var ret = await dbcontext.Notifications.AddAsync(dbNotification);
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbNotification(ret.Entity);
        }

        public async Task<ICollection<Notification>> GetByUsername(string username)
        {
            return await dbcontext.Notifications
                .Include(n => n.User)
                .Where(n => n.User.UserName == username)
                .OrderBy(n=>n.Seen)
                .Select(n => DbMapper.MapDbNotification(n))
                .ToListAsync();
        }

        public async Task Remove(Notification notification)
        {
            await Remove(notification.Id);
        }

        public async Task Remove(int id)
        {
            var dbNotification = await dbcontext.Notifications.FirstOrDefaultAsync(n => n.Id == id);
            dbcontext.Remove(dbNotification);
            await dbcontext.SaveChangesAsync();
        }

        public async Task<Notification> Update(Notification notification)
        {
            var dbNotification = await dbcontext.Notifications.FirstOrDefaultAsync(n => n.Id == notification.Id);
            dbNotification.Content = notification.Content;
            dbNotification.Title = notification.Title;
            await dbcontext.SaveChangesAsync();
            return DbMapper.MapDbNotification(dbNotification);
        }

        public async Task<Notification> GetById(int id)
        {
            return DbMapper.MapDbNotification(await dbcontext.Notifications.FirstOrDefaultAsync(n => n.Id == id));
        }

        public async Task<string> GetUserNameForNotification(int id)
        {
            var dbNotification = await dbcontext.Notifications
                .Include(n=>n.User)
                .FirstOrDefaultAsync(n => n.Id == id);
            if (dbNotification == null)
                return null;
            return dbNotification.User.UserName;
        }

        public async Task<string> GetUserNameForNotification(Notification notification)
        {
            return await GetUserNameForNotification(notification.Id);
        }

        public async Task<bool> SetImportant(int id, bool to)
        {
            var dbNotification = await dbcontext.Notifications.SingleOrDefaultAsync(n => n.Id == id);
            if(dbNotification != null)
            {
                dbNotification.Important = to;
                await dbcontext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> CheckUserForNotification(int id, string username)
        {
            var user = await GetUserNameForNotification(id);
            return (user == username);
        }

        public async Task<ICollection<Notification>> GetPendingNotifications(string username)
        {
            return await dbcontext.Notifications
                .Include(n => n.User)
                .Where(n => n.User.UserName == username)
                .Where(n => n.Seen)
                .Select(n => DbMapper.MapDbNotification(n))
                .ToListAsync();
        }

        public async Task<bool> SetSeen(int id, bool seen)
        {
            var dbNotification = await dbcontext.Notifications.SingleOrDefaultAsync(n => n.Id == id);
            if (dbNotification != null)
            {
                dbNotification.Seen = seen;
                await dbcontext.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
