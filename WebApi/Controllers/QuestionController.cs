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
using System.Security.Claims;
using KnowledgeBase.Entities.DataTransferObjects;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/questions")]
    [ApiController]
    //[EnableCors]
    public class QuestionController : BaseController
    {

        private readonly QuestionService questionService;

        public QuestionController(QuestionService questionService)
        {
            this.questionService = questionService;
        }

        [HttpGet]
        public async Task<QuestionsWithPaging> GetQuestions([FromQuery] int pageNum = 1, [FromQuery] int pageSize = 10)
        {
            var questions = await questionService.GetQuestionsPaged(pageNum, pageSize);
            var pages = await questionService.GetPageCount(pageSize);
            return new QuestionsWithPaging()
            {
                Questions = questions,
                Pages = pages,
                CurrentPage = pageNum
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionWithAnswers>> GetQuestion(int id)
        {
            return await questionService.GetQuestionWithAnswers(id);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Question>> AddQuestion([FromBody] Question question)
        {
            if (question.Author != UserName)
                return Conflict();
            var q = await questionService.AddNewQuestion(question);
            return Created("api/questions/" + q.Id, q);
        }

        [Authorize]
        [HttpPost("{id}/answers")]
        public async Task<ActionResult<Answer>> AddAnswerToQuestion(int id, [FromBody] Answer answer)
        {
            //So no one can post in someone else's name
            //Jó ez, de lehet a DTO-s megoldás is
            if (UserName != answer.Author)
                return Conflict();
            var a = await questionService.AddAnswerToQuestion(id, answer);
            return Created("api/questions/" + id + "/answers/" + a.Id, a);
        }

        [HttpGet("{id}/answers")]
        public async Task<ActionResult<ICollection<Answer>>> GetAnswersForQuestion(int id)
        {
            return Ok( await questionService.GetAnswersForQuestion(id));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteQuestion([FromRoute] int id)
        {
            var question = await questionService.GetQuestion(id);
            if (question == null)
                return NotFound();
            if (question.Author != UserName)
                return Conflict();
            await questionService.DeleteQuestion(question);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{qId}/answers/{id}")]
        public async Task<ActionResult> DeleteAnswer([FromRoute] int qId, [FromRoute] int id)
        {
            var answer = await questionService.GetAnswer(id);
            if (answer == null)
                return NotFound();
            if (answer.Author != UserName)
                return Conflict();
            await questionService.DeleteAnswer(answer);
            return NoContent();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Question>> UpdateQuestion([FromRoute] int id, [FromBody] QuestionUpdateRequest request)
        {
            var question = await questionService.GetQuestion(id);
            if (question == null)
                return NotFound();
            if (question.Author != UserName)
                return Conflict();
            question.Content = request.Content;
            return Ok(await questionService.UpdateQuestion(question));
        }

        [Authorize]
        [HttpPut("{qId}/answers/{id}")]
        public async Task<ActionResult<Answer>> UpdateAnswer([FromRoute] int qId, [FromRoute] int id, [FromBody] AnswerUpdateRequest request)
        {
            var answer = await questionService.GetAnswer(id);
            if (answer == null)
                return NotFound();
            if (answer.Author != UserName)
                return Conflict();
            answer.Content = request.Content;
            return Ok(await questionService.UpdateAnswer(answer));
        }

        [HttpGet("search")]
        public async Task<QuestionSearchResponse> SearchQuestions([FromQuery] String anywhere, [FromQuery] String title, [FromQuery] String content, [FromQuery] int? topic)
        {
            return await questionService.Search(new QuestionSearchRequest()
            {
                Anywhere = anywhere,
                Title = title,
                Content = content,
                TopicId = topic,
            });
        }

    }
}