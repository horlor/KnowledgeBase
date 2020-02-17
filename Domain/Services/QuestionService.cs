using KnowledgeBase.Domain.Repository;
using KnowledgeBase.Entities;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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

        public void UpdateQuestion(Question question)
        {
            //What if the object passed not exists till now
            questionRepo.Update(question);
        }

        public void DeleteQuestion(Question question)
        {
            //Maybe I should explicitly delete all answers for this questions
            questionRepo.Delete(question);
        }

        public Question AddNewQuestion(Question question)
        {
            return  questionRepo.Store(question);
        }

        public ICollection<Answer> GetAnswersForQuestion()
        {
            return new Collection<Answer>();
        }

        public void AddAnswerToQuestion()
        {

        }
    }

}
