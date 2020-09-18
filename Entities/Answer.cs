using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string Created { get; set; }
        public string LastUpdate { get; set; }
        public int QuestionId { get; set; }
        public AnswerType Type { get; set; }
        public string Moderator { get; set; }
        public string ModeratorMessage { get; set; }
    }

    public enum AnswerType
    {
        Simple = 0,
        Closer = 1,
        Reopener = 2,
        HiddenByModerator = 3,
    }
}
