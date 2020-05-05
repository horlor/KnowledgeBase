using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities.DataTransferObjects
{
    public class QuestionsWithPaging
    {
        public int Pages { get; set; }

        public int CurrentPage { get; set; }
        public ICollection<Question> Questions { get; set; }
    }

    public class QuestionUpdateRequest
    {
        public string Content { get; set; }
    }

    public class AnswerUpdateRequest
    {
        public string Content { get; set; }
    }

    public class QuestionSearchRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Anywhere { get; set; }
        public int? TopicId { get; set; }
        public int Page { get; set; }
        public int CountPerPage { get; set; }
    }

    public class QuestionSearchResponse
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
        public int Count { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
