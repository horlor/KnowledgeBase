using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.ObjectModel;
using KnowledgeBase.Domain.Services;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/questions")]
    [ApiController]
    //[EnableCors]
    public class QuestionController : ControllerBase
    {

        private QuestionService questionService;

        public QuestionController()
        {

        }

        [HttpGet]
        public ICollection<Question> GetQuestions()
        {
            var list = new List<Question>();
            list.Add(new Question() { Author = "author", Content = "This is the true message", Title = "supertitle" });
            return list;
        }

        [HttpGet("{id}")]
        public ActionResult<QuestionWithAnswers> GetQuestion(int id)
        {
            return new QuestionWithAnswers();

        }

        [HttpPost]
        public ActionResult AddQuestion([FromBody] Question question)
        {
            throw new NotImplementedException();
        }

        [HttpPost("{id}/answers")]
        public ActionResult AddAnswerToQuestion(int id, [FromBody] Answer answer)
        {
            return BadRequest();
        }

        [HttpGet("{id}/answers")]
        public ICollection<Answer> GetAnswersForQuestion(int id)
        {
            return new Collection<Answer>();
        }



    }
}