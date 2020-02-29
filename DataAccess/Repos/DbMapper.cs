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
                //Author = dbAnswer.User.UserName,
                //AuthorId = dbAnswer.User.Id,
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
                //Author = dbQuestion.User.UserName,
                //AuthorId = dbQuestion.User.Id,
                Title = dbQuestion.Title,
                Content = dbQuestion.Content
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
                //Author = dbQuestion.User.UserName,
                //AuthorId = dbQuestion.User.Id,
                Title = dbQuestion.Title,
                Content = dbQuestion.Content,
                Answers = answers
            };
        }

        internal static User MapDbUser(DbUser dbUser)
        {
            return new User
            {
                Email = dbUser.Email,
                Name = dbUser.UserName,
            };
        }
    }
}
