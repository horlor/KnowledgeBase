using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Entities.DataTransferObjects
{
    public class QuestionsWithPaging
    {
        public int Pages { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
