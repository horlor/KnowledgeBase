using KnowledgeBase.Domain.Hubs;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Services
{
    public class NotificationService
    {
        private readonly INotificationRepo notificationRepo;
        private readonly IUserRepo userRepo;
        private readonly INotificationHub notificationHub;
        public NotificationService(INotificationRepo notificationRepo, IUserRepo userRepo, INotificationHub notificationHub)
        {
            this.notificationRepo = notificationRepo;
            this.userRepo = userRepo;
            this.notificationHub = notificationHub;
        }
        public async Task<ICollection<Notification>> GetNotificationsForUser(string username)
        {
            return await notificationRepo.GetByUsername(username);
        }

        public async Task CreateNewQuestionNotification(Question q)
        {
            var users = await userRepo.GetUsersByTopic(q.Topic);
            Console.WriteLine($"NewQuestion called: {users.Count}");
            foreach (var user in users)
            {
                
                if (user.UserName != q.Author)
                {
                    Console.WriteLine($"\tUser:{user.UserName}");
                    await CreateNotificationForUser(user.UserName, new Notification()
                    {
                        Title = "New Question",
                        Content = $"New Question was created in one of your followed topics: {q.Title}",
                        QuestionId = q.Id,
                    });
                }

            }
        }

        public async Task<bool> RemoveNotification(string username, int notificationId)
        {
            var notUser = await notificationRepo.GetUserNameForNotification(notificationId);
            if (username != notUser)
                return false;
            else
                await notificationRepo.Remove(notificationId);
            return true;

        }

        public async Task<Notification> CreateNotificationForUser(string username, Notification n)
        {
            Console.WriteLine("előtte");
            await notificationHub.SendNotificationToUser(username, n);
            Console.WriteLine("utána");
            return await notificationRepo.CreateForUser(username, n);
        }

        public async Task<bool> ChangeFinished(string username, int nId, bool finished)
        {
            var enabled = await notificationRepo.CheckUserForNotification(nId, username);
            var success = false;
            if (enabled)
            {
                success = await notificationRepo.SetImportant(nId, finished);
            }
            return success;
        }

        public async Task<bool> ChangeSeen(string username, int nId, bool seen)
        {
            var enabled = await notificationRepo.CheckUserForNotification(nId, username);
            var success = false;
            if (enabled)
                success = await notificationRepo.SetSeen(nId, seen);
            return success;
        }

        public async Task<ICollection<Notification>> GetPendingNotifications(string username)
        {
            var nots = await notificationRepo.GetPendingNotifications(username);
            foreach (var item in nots)
                await notificationRepo.SetSeen(item.Id, false);
            return nots;
        }
    }
}
