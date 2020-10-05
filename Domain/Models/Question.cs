using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string Created { get; set; }
        public string LastUpdate { get; set; }
        public bool Closed { get; set; }
        public Topic Topic { get; set; }
        public QuestionType Type { get; set; }
        public string Moderator { get; set; }
        public string ModeratorMessage { get; set; }

    }

    public class QuestionWithAnswers : Question
    {
        public ICollection<Answer> Answers { get; set; }

    }

    public enum QuestionType
    {
        Simple = 0,
        HiddenByModerator = 1,

    }

    public class QuestionsWithPaging
    {
        public int Pages { get; set; }

        public int CurrentPage { get; set; }
        public ICollection<Question> Questions { get; set; }
    }

    public class QuestionSearchParams
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Anywhere { get; set; }
        public int? TopicId { get; set; }
        public int Page { get; set; }
        public int CountPerPage { get; set; }
        public string Username { get; set; }
        public bool IncludeHidden { get; set; }
        public bool OnlyHidden { get; set; }
    }

    public class QuestionSearchResult
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
        public int Count { get; set; }
        public ICollection<Question> Questions { get; set; }
    }

    public class QuestionUpdateModel
    {
        public string Content { get; set; }
    }
}
