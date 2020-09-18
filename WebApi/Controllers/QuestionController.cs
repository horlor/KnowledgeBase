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
        // elvileg nem használt - kivenni ha biztos
        /*
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
        }*/

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

        [HttpGet("{id}/answers")]
        public async Task<ActionResult<ICollection<Answer>>> GetAnswersForQuestion(int id)
        {
            return Ok(await questionService.GetAnswersForQuestion(id));
        }

        [Authorize]
        [HttpPost("{id}/close")]
        public async Task<IActionResult> CloseQuestion([FromRoute] int id, [FromBody] Answer answer)
        {
            var question = await questionService.GetQuestion(id);
            if (question == null)
                return NotFound();
            if (!(UserName == answer.Author || question.Author == UserName || AuthenticateModerator()))
                return Conflict();
            return Ok( await  questionService.CloseQuestion(id, answer));
        }
        [Authorize]
        [HttpPost("{id}/reopen")]
        public async Task<IActionResult> ReopenQuestion([FromRoute] int id, [FromBody] Answer answer)
        {
            var question = await questionService.GetQuestion(id);
            if (question == null)
                return NotFound();
            if (!(UserName == answer.Author || question.Author == UserName || AuthenticateModerator()))
                return Conflict();
            Console.WriteLine("Reopen Question: " + AuthenticateModerator());
            return Ok( await questionService.ReopenQuestion(id, answer));
        }

        [Authorize]
        [HttpPost("{id}/hide")]
        public async Task<ActionResult<Question>> HideQuestion([FromRoute] int id, [FromBody] QuestionHideRequest request)
        {
            try
            {
                return Ok(await questionService.HideQuestion(id, UserName, Role, request.ModeratorMessage));
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch(UnathorizedException)
            {
                return Unauthorized();
            }
        }

        [Authorize]
        [HttpPost("{id}/unhide")]
        public async Task<ActionResult<Question>> UnhideQuestion([FromRoute] int id)
        {
            try
            {
                return Ok(await questionService.UnhideQuestion(id, UserName, Role));
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (UnathorizedException)
            {
                return Unauthorized();
            }
        }

        [Authorize]
        [HttpPost("{id}/answers")]
        public async Task<ActionResult<Answer>> AddAnswerToQuestion(int id, [FromBody] Answer answer)
        {
            Console.WriteLine("Http POST to Answers");
            if (UserName != answer.Author)
                return Conflict();
            var question = await questionService.GetQuestion(id);
            if (question.Closed)
                return BadRequest();
            var a = await questionService.AddAnswerToQuestion(id, answer);
            return Created("api/questions/" + id + "/answers/" + a.Id, a);
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
            await questionService.DeleteAnswer(qId, answer);
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
            return Ok(await questionService.UpdateAnswer(qId,answer));
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchQuestions([FromQuery] string anywhere, [FromQuery] string title, [FromQuery] string content,
            [FromQuery] int? topic, [FromQuery] int page = 1, [FromQuery] int countPerPage = 10,
            [FromQuery] string username = null, [FromQuery] bool myQuestions = false, [FromQuery] bool onlyHidden = false)
        {
                return Ok(await questionService.Search(new QuestionSearchRequest()
                {
                    Anywhere = anywhere,
                    Title = title,
                    Content = content,
                    TopicId = topic,
                    Page = page,
                    CountPerPage = countPerPage,
                    OnlyHidden = onlyHidden,
                    Username = username,
                }, myQuestions ? UserName : null, Role));
        }
    }
}