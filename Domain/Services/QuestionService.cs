using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.Domain.Services
{
    public class QuestionService
    {
        private IQuestionRepo questionRepo;
        public QuestionService(IQuestionRepo repo)
        {
            questionRepo = repo;
        }

        public ICollection<Question> GetAllQuestions()
        {
            return questionRepo.List();
        }

    }
}
