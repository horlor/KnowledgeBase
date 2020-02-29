using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class QuestionWithAnswers
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
        public string Author { get; set; }

        public ICollection<Answer> Answers {get; set;}

    }
}
