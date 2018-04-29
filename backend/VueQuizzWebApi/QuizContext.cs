using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace VueQuizzWebApi
{
    public class QuizContext : DbContext
    {

        public QuizContext(DbContextOptions<QuizContext> options) : base(options) { }

        // dataset for questions
        public DbSet<Models.Question> QuestionsDb { get; set; }
    }
}
