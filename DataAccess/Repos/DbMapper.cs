using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.DataAccess.Repos
{
    /// <summary>
    /// A few methods from changing from db types to domain types
    /// </summary>
    internal static class DbMapper
    {
        private static readonly string dateFormat = "yyyy.MM.dd HH:mm:ss";
        internal static Answer MapDbAnswer(DbAnswer dbAnswer)
        {
            if (dbAnswer == null)
                return null;
            return new Answer()
            {
                Id = dbAnswer.Id,
                QuestionId = dbAnswer.QuestionId,
                Author = dbAnswer.User?.UserName,
                Content = dbAnswer.Content,
                Created = dbAnswer.Created.ToString(dateFormat),
                LastUpdate = dbAnswer.LastUpdated.ToString(dateFormat),
                Type = dbAnswer.Type,
                Moderator = dbAnswer.Moderator?.UserName,
                ModeratorMessage = dbAnswer.ModeratorMessage
            };
        }

        internal static Question MapDbQuestion(DbQuestion dbQuestion)
        {
            if (dbQuestion == null)
                return null;
            var q = new Question()
            {
                Id = dbQuestion.Id,
                Author = dbQuestion.User?.UserName,
                Title = dbQuestion.Title,
                Content = dbQuestion.Content,
                Created = dbQuestion.Created.ToString(dateFormat),
                LastUpdate = dbQuestion.LastUpdated.ToString(dateFormat),
                Topic = MapDbTopic(dbQuestion.Topic),
                Closed = dbQuestion.Closed,
                Type = dbQuestion.Type,
                Moderator = dbQuestion.Moderator?.UserName,
                ModeratorMessage = dbQuestion.ModeratorMessage
            };
            return q;
        }

        internal static QuestionWithAnswers MapDbQuestionWithAnswers(DbQuestion dbQuestion)
        {
            if (dbQuestion == null)
                return null;
            var answers = new List<Answer>();
            foreach(var item in dbQuestion.Answers)
            {
                answers.Add(MapDbAnswer(item));
            }
            return new QuestionWithAnswers()
            {
                Id = dbQuestion.Id,
                Author = dbQuestion.User?.UserName,
                Title = dbQuestion.Title,
                Content = dbQuestion.Content,
                Answers = answers,
                Created = dbQuestion.Created.ToString(dateFormat),
                LastUpdate = dbQuestion.LastUpdated.ToString(dateFormat),
                Topic = MapDbTopic(dbQuestion.Topic),
                Closed = dbQuestion.Closed,
                Type = dbQuestion.Type,
                Moderator = dbQuestion.Moderator?.UserName,
                ModeratorMessage = dbQuestion.ModeratorMessage
            };
        }

        internal static User MapDbUser(DbUser dbUser)
        {
            if (dbUser == null)
                return null;
            var topics = new List<Topic>();
            foreach(var item in dbUser.UserTopics)
            {
                topics.Add(DbMapper.MapDbTopic(item.Topic));
            }
            return new User
            {
                Email = dbUser.Email,
                UserName = dbUser.UserName,
                FirstName = dbUser.FirstName,
                LastName = dbUser.LastName,
                Topics = topics,
            };
        }

        internal static UserDetailed MapDbUserDetailed(DbUser dbUser)
        {
            if (dbUser == null)
                return null;
            var topics = new List<Topic>();
            foreach (var item in dbUser.UserTopics)
            {
                topics.Add(DbMapper.MapDbTopic(item.Topic));
            }
            return new UserDetailed
            {
                UserName = dbUser.UserName,
                Email = dbUser.Email,
                FirstName = dbUser.FirstName,
                LastName = dbUser.LastName,
                Introduction = dbUser.Introduction,
                Topics = topics,
            };
        }

        internal static Topic MapDbTopic(DbTopic dbTopic)
        {
            if (dbTopic == null)
                return null;
            return new Topic()
            {
                Id = dbTopic.Id,
                Name = dbTopic.Name,
            };
        }

        internal static TopicDetailed MapDbTopicDetailed(DbTopic dbTopic)
        {
            if (dbTopic == null)
                return null;
            var ancestor = MapDbTopic(dbTopic.Ancestor);
            return new TopicDetailed()
            {
                Id = dbTopic.Id,
                Name = dbTopic.Name,
                Ancestor = ancestor,
            };
        }

        internal static Notification MapDbNotification(DbNotification dbNotification)
        {
            if (dbNotification == null)
                return null;
            return new Notification()
            {
                Id = dbNotification.Id,
                Title = dbNotification.Title,
                Content = dbNotification.Content,
                QuestionId = dbNotification.QuestionId,
                Seen = dbNotification.Seen,
                Important = dbNotification.Important,
                Username = dbNotification.User?.UserName,
            };
        }
    }
}
