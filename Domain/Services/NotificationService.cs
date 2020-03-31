﻿using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KnowledgeBase.Domain.Services
{
    public class NotificationService
    {
        private INotificationRepo notificationRepo;
        private IUserRepo userRepo;
        public NotificationService(INotificationRepo notificationRepo, IUserRepo userRepo)
        {
            this.notificationRepo = notificationRepo;
            this.userRepo = userRepo;
        }
        public async Task<ICollection<Notification>> GetNotificationsForUser(string username)
        {
            return await notificationRepo.GetByUsername(username);
        }

        public async Task CreateNewQuestionNotification(Question q)
        {
            var users = await userRepo.GetUsersByTopic(q.Topic);
            foreach(var user in users)
            {
                if(user.UserName != q.Author)
                await notificationRepo.CreateForUser(user.UserName, new Notification()
                {
                    Title="New Question",
                    Content="New Question was created in one of your followed topics",
                    QuestionId = q.Id,
                });
            }
        }

        public async Task<bool> RemoveNotification(string username, Notification notification)
        {
            var notUser = await notificationRepo.GetUserNameForNotification(notification);
            if (username != notUser)
                return false;
            else
                await notificationRepo.Remove(notification);
            return true;

        }

        public async Task<Notification> CreateNotificationForUser(string username, Notification n)
        {
            return await notificationRepo.CreateForUser(username, n);
        }
    }
}
