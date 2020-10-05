using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.ObjectModel;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.DataAccess.Repos;
using KnowledgeBase.DataAccess;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using KnowledgeBase.WebApi.DataTransferObjects;
using System.Runtime.CompilerServices;

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
            return await questionService.GetQuestionWithAnswers(id,UserName,Role);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Question>> AddQuestion([FromBody] Question question)
        {
            try
            {
                var q = await questionService.AddNewQuestion(question, UserName, Role);
                return Created("api/questions/" + q.Id, q);
            }
            catch (ConflictedDataException)
            {
                return Conflict();
            }

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
            return await HandleExceptionsWithOk(
                async () => await questionService.CloseQuestion(id, answer, UserName, Role));
        }
        [Authorize]
        [HttpPost("{id}/reopen")]
        public async Task<IActionResult> ReopenQuestion([FromRoute] int id, [FromBody] Answer answer)
        {
            return await HandleExceptionsWithOk(
                            async () => await questionService.ReopenQuestion(id, answer, UserName, Role));
        }

        [Authorize]
        [HttpPost("{id}/hide")]
        public async Task<ActionResult<Question>> HideQuestion([FromRoute] int id, [FromBody] QuestionAnswerHideRequest request)
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
            try
            {
                var ans = await questionService.AddAnswerToQuestion(id, answer, UserName, Role);
                return Created($"/api/questions/{id}/answers/{ans.Id}", ans);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (ConflictedDataException)
            {
                return Conflict();
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            return await HandleExceptionsWithNoContent(
                async () => await questionService.DeleteQuestion(id, UserName, Role));
        }

        [Authorize]
        [HttpDelete("{qId}/answers/{id}")]
        public async Task<IActionResult> DeleteAnswer([FromRoute] int qId, [FromRoute] int id)
        {
            return await HandleExceptionsWithNoContent(
                async () => await questionService.DeleteAnswer(qId, id, UserName, Role)
                ) ;
        }

        [Authorize]
        [HttpPost("{qId}/answers/{aId}/hide")]
        public async Task<IActionResult> HideAnswer([FromRoute] int qId, [FromRoute] int aId,[FromBody] QuestionAnswerHideRequest request)
        {
            try
            {
                return Ok(await questionService.HideAnswer(qId, aId, request.ModeratorMessage, UserName, Role));
            }
            catch (UnathorizedException)
            {
                return Unauthorized();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost("{qId}/answers/{aId}/unhide")]
        public async Task<IActionResult> UnhideAnswer([FromRoute] int qId, [FromRoute] int aId)
        {
            try
            {
                return Ok(await questionService.UnhideAnswer(qId, aId, UserName, Role));
            }
            catch (UnathorizedException)
            {
                return Unauthorized();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }



        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion([FromRoute] int id, [FromBody] QuestionUpdateModel request)
        {
            return await HandleExceptionsWithOk(
                async() => await questionService.UpdateQuestion(id, request, UserName, Role)
                );
        }

        [Authorize]
        [HttpPut("{qId}/answers/{id}")]
        public async Task<IActionResult> UpdateAnswer([FromRoute] int qId, [FromRoute] int id, [FromBody] AnswerUpdateModel request)
        {
            return await HandleExceptionsWithOk(
                async () => await questionService.UpdateAnswer(qId, id, request, UserName, Role)
                );
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchQuestions([FromQuery] string anywhere, [FromQuery] string title, [FromQuery] string content,
            [FromQuery] int? topic, [FromQuery] int page = 1, [FromQuery] int countPerPage = 10,
            [FromQuery] string username = null, [FromQuery] bool myQuestions = false, [FromQuery] bool onlyHidden = false)
        {
                return Ok(await questionService.Search(new QuestionSearchParams()
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