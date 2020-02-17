using System;
using System.Collections.Generic;
using System.Text;
using KnowledgeBase.Entities;

namespace KnowledgeBase.Domain.Repository
{
    public interface IQuestionRepo
    {
        Question FindById(int id);
        Question Store(Question question);
        void Update(Question question);
        void Delete(Question question);
        ICollection<Question> List();
        QuestionWithAnswers FindWithAnswersById(int id);
        ICollection<Answer> FindAnswersforQuestion(Question question);
        ICollection<Answer> FindAnswersforQuestionById(int id);
        Answer StoreAnswerForQuestion(int id, Answer answer);
    }
}
