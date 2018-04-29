using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace VueQuizzWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Questions")]
    public class QuestionsController : Controller
    {
        // GET api/values
        [HttpGet]
        public string Get()
        {
            return "VueQuizz Web Api";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Models.Question value)
        {
        }
    }
}