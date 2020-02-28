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
using Microsoft.AspNetCore.Authorization;

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
        public async Task<ICollection<Question>> GetQuestions()
        {
            //return NotFound();
            return await questionService.GetAllQuestions();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionWithAnswers>> GetQuestion(int id)
        {
            return await questionService.GetQuestionWithAnswers(id);
        }

        [HttpPost]
        public async Task<ActionResult<Question>> AddQuestion([FromBody] Question question)
        {
            var q = await questionService.AddNewQuestion(question);
            return Created("api/questions/" + q.Id, q);
        }

        [HttpPost("{id}/answers")]
        public async Task<ActionResult<Answer>> AddAnswerToQuestion(int id, [FromBody] Answer answer)
        {
            var a = await questionService.AddAnswerToQuestion(id, answer);
            return Created("api/questions/" + id + "/answers/" + a.Id, a);
        }

        [HttpGet("{id}/answers")]
        public async Task<ActionResult<ICollection<Answer>>> GetAnswersForQuestion(int id)
        {
            return Ok( await questionService.GetAnswersForQuestion(id));
        }



    }
}