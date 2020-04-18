using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeBase.WebApi.Controllers
{
    [Route("api/ping")]
    [ApiController]
    public class PingController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("pong");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public ActionResult<string> PongAdmin()
        {
            return Ok("ponga");
        }
    }
}