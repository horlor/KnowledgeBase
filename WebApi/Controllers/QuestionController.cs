using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/questions")]
    [ApiController]
    //[EnableCors]
    public class QuestionController : ControllerBase
    {
        [HttpGet]
        public ICollection<Question> GetQuestions()
        {
            var list = new List<Question>();
            list.Add(new Question() { Author = "author", Content = "This is the true message", Title = "supertitle" });
            return list;
        }
    }
}