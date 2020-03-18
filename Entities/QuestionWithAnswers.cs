using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities
{
    public class QuestionWithAnswers : Question
    {
        public ICollection<Answer> Answers {get; set;}

    }
}
