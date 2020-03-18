using KnowledgeBase.DataAccess.DataObjects;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.DataAccess.Repos
{
    internal class DbMapper
    {
        internal static Answer MapDbAnswer(DbAnswer dbAnswer)
        {
            if (dbAnswer == null)
                return null;
            return new Answer()
            {
                Id = dbAnswer.Id,
                Author = dbAnswer.User.UserName,
                Content = dbAnswer.Content
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
                Topic = MapDbTopic(dbQuestion.Topic)
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
                Topic = MapDbTopic(dbQuestion.Topic)
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
    }
}
