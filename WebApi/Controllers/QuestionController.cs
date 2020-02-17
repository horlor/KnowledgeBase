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
using KnowledgeBase.DataAccess.Repos;
using KnowledgeBase.DataAccess;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/questions")]
    [ApiController]
    //[EnableCors]
    public class QuestionController : ControllerBase
    {

        private QuestionService questionService;

        public QuestionController(QuestionService questionService)
        {
            this.questionService = questionService;
        }

        [HttpGet]
        public ICollection<Question> GetQuestions()
        {
            return questionService.GetAllQuestions();
        }

        [HttpGet("{id}")]
        public ActionResult<QuestionWithAnswers> GetQuestion(int id)
        {
            return questionService.GetQuestionWithAnswers(id);
        }

        [HttpPost]
        public ActionResult<Question> AddQuestion([FromBody] Question question)
        {
            var q = questionService.AddNewQuestion(question);
            return Created("api/questions/" + q.Id, q);
        }

        [HttpPost("{id}/answers")]
        public ActionResult<Answer> AddAnswerToQuestion(int id, [FromBody] Answer answer)
        {
            var a = questionService.AddAnswerToQuestion(id, answer);
            return Created("api/questions/" + id + "/answers/" + a.Id, a);
        }

        [HttpGet("{id}/answers")]
        public ICollection<Answer> GetAnswersForQuestion(int id)
        {
            return questionService.GetAnswersForQuestion(id);
        }



    }
}