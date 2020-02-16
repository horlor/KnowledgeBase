using Microsoft.EntityFrameworkCore;
using KnowledgeBase.DataAccess.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeBase.DataAccess
{
    public class KnowledgeContext: DbContext
    {
        public KnowledgeContext(DbContextOptions options): base(options) { }
        public KnowledgeContext(): base() { }

        public DbSet<DbAnswer> Answers { get; set; }
        public DbSet<DbQuestion> Questions { get; set; }
        public DbSet<DbUser> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 
                
        }


    }
}
