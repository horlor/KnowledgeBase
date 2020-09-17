using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
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

    public enum QuestionType
    {
        Simple = 0,
        HiddenByModerator = 1,

    }
}
