using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VueQuizzWebApi.Models;

namespace VueQuizzWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Questions")]
    public class QuestionsController : Controller
    {

        readonly QuizContext DBContext;

        public QuestionsController(QuizContext DBContext)
        {
            this.DBContext = DBContext;
        }

        // GET api/questions
        [HttpGet]
        public IEnumerable<Question> Get()
        {
            // serve a list of questions

            return new Question[] {
                new Question() { Text = "Hello"}, 
                new Question() { Text = "Bye"}
            };
        }

        // GET api/questions/test
        [HttpGet("test")]
        public string Test()
        {
            return "VueQuizz Web Api test route";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Models.Question value)
        {
            // Add a test question
            this.DBContext.Add(new Question() { Text = "Test" });
        }
    }
}