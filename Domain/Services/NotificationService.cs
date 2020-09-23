using KnowledgeBase.Domain.Interfaces;
using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using KnowledgeBase.Entities.DataTransferObjects;
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
            foreach (var user in users)
            {
                if (user.UserName != q.Author)
                {
                    await CreateNotificationForUser(user.UserName, new Notification()
                    {
                        Title = $"New Question in {q.Topic.Name}",
                        Content = $"New Question was created in one of your followed topics: {q.Title}",
                        QuestionId = q.Id,
                    });
                }

            }
        }

        public async Task CreateNewAnswerNotification(Question q, Answer a)
        {
            if(a.Author != q.Author)
                await CreateNotificationForUser(q.Author, new Notification()
                {
                    Title = $"New answer submitted to your question",
                    Content = $"New answer was submitted to your question: {q.Title}",
                    QuestionId = q.Id,
                });
        }

        public async Task CreateHiddenQuestionEditedNotification(Question q)
        {
            await CreateNotificationForUser(q.Moderator, new Notification()
            {
                Title = $"Hidden question edited",
                Content = $"{q.Author} edited the question, you blocked: ${q.Title}",
                QuestionId = q.Id
            });
        }

        public async Task CreateHiddenAnswerEditedNotification(int questionId, Answer a)
        {
            await CreateNotificationForUser(a.Moderator, new Notification()
            {
                Title = $"Hidden answer edited",
                Content = $"{a.Author} edited the answer, you blocked.",
                QuestionId = questionId,
            });
        }

        public async Task CreateQuestionSetHiddenNotification(Question question)
        {
            await CreateNotificationForUser(question.Author, new Notification()
            {
                Title = $"Your question've got blocked",
                Content = $"{question.Moderator} blocked your question, with the following message:\n{question.ModeratorMessage}",
                QuestionId = question.Id,
            });
        }

        public async Task CreateAnswerSetHiddenNotification(int questionId, Answer a)
        {
            await CreateNotificationForUser(a.Moderator, new Notification()
            {
                Title = $"Your answer've got blocked ",
                Content = $"{a.Moderator} blocked your question, with the following message:\n{a.ModeratorMessage}",
                QuestionId = questionId,
            });
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

        protected async Task<Notification> CreateNotificationForUser(string username, Notification n)
        {
            var notification  = await notificationRepo.CreateForUser(username, n); 
            await notificationHub.SendNotificationToUser(username, notification);
            return notification;
        }

        public async Task<Notification> ChangeImportant(string username, int nId, bool important)
        {
            var notification = await notificationRepo.GetById(nId);
            if (notification == null)
                throw new NotFoundException();
            if (username != notification.Username)
                throw new UnathorizedException();
            notification.Important = important;
            return await notificationRepo.Update(notification);
        }

        public async Task<Notification> ChangeSeen(string username, int nId, bool seen)
        {
            var notification = await notificationRepo.GetById(nId);
            if (notification == null)
                throw new NotFoundException();
            if (username != notification.Username)
                throw new UnathorizedException();
            notification.Seen = seen;
            return await notificationRepo.Update(notification);
        }

        public async Task<ICollection<Notification>> GetUnseenNotifications(string username)
        {
            var nots = await notificationRepo.GetUnseenNotifications(username);
            return nots;
        }

        public async Task DeleteAll(string username, NotificationsDeleteOptions options)
        {
            await notificationRepo.RemoveAll(username, options);
        }
    }
}
