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
}
