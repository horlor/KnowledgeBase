using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeBase.Domain.Services;
using KnowledgeBase.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/topics")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private TopicService topicService;

        public TopicController(TopicService topicService)
        {
            this.topicService = topicService;
        }

        [HttpGet]
        public async Task<ICollection<Topic>> List()
        {
            return await topicService.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TopicDetailed>> GetTopic([FromRoute] int id)
        {
            var topic =  await topicService.GetTopicDetailed(id);
            if (topic == null)
                return NotFound();
            return Ok(topic);
        }

        [Authorize(Roles ="Admin, Moderator")]
        [HttpPost]
        public async Task<ActionResult<Topic>> CreateTopic([FromBody] TopicDetailed topic)
        {
            var created = await topicService.Store(topic);
            return  Created("/api/topics/"+created.Id, created);
        }

        [Authorize(Roles ="Admin, Moderator")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTopic([FromRoute] int id)
        {
            await topicService.Delete(id);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Topic>> UpdateTopic(TopicDetailed topicDetailed)
        {
            var ret = await topicService.Update(topicDetailed);
            Console.WriteLine(topicDetailed.Ancestor == null? "null":"nemnull");
            if (ret == null)
                return NotFound();
            else
                return Ok(ret);
        }
    }
}