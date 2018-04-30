using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VueQuizzWebApi.Models;
using Microsoft.EntityFrameworkCore;

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
            // return list of questions
            return DBContext.Questions;
        }

        // GET api/questions/test
        [HttpGet("test")]
        public string Test()
        {
            return "VueQuizz Web Api test route";
        }

        // POST api/questions
        [HttpPost]
        public IActionResult Post([FromBody]Question question)
        {
            try
            {
                // Add a test question
                this.DBContext.Questions.Add(question);
                this.DBContext.SaveChanges();
                return Ok(question);
            }
            catch (Exception)
            {
                return BadRequest("Adding the question failed");
            }
            
        }

        // PUT api/questions/
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Question question)
        {
            if (id == question.ID)
            {
                DBContext.Entry(question).State = EntityState.Modified;
                return Ok(question);
            }

            return BadRequest("Editing the question failed");
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var question = this.DBContext.Questions.SingleOrDefault(q => q.ID == id);
            this.DBContext.Questions.Remove(question);

            if (question == null)
            {
                return BadRequest("Not a valid question id");
            }
            this.DBContext.SaveChanges();
            return Ok(question);
        }
    }
}