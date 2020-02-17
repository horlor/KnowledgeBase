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
            modelBuilder.Entity<DbQuestion>().HasData(
                new DbQuestion()
                {
                    Id = 1,
                    Title="This is a question about something extremely important",
                    Content= "Curabitur auctor bibendum dui, at posuere lorem tempor eu. Aenean porttitor vulputate ex, in ultricies mi dictum nec. Fusce maximus faucibus tortor, quis vestibulum augue ornare eu. Vestibulum ullamcorper diam sit amet urna vulputate efficitur. Ut ac finibus felis, sagittis blandit eros. Maecenas vulputate aliquet quam eu sodales. Vestibulum aliquet blandit mauris eu porttitor. Aliquam in porttitor nulla. Praesent ac tellus sapien. Morbi tempor varius eleifend. Pellentesque est tellus, maximus quis porttitor eu, sagittis ut libero. Cras ut tincidunt magna, vitae tempor mauris. Sed imperdiet dolor id dui luctus mollis. Etiam sit amet mattis est."
                }, 
                new DbQuestion()
                {
                    Id =2,
                    Title = "This is a question about something extremely important",
                    Content = "Curabitur auctor bibendum dui, at posuere lorem tempor eu. Aenean porttitor vulputate ex, in ultricies mi dictum nec. Fusce maximus faucibus tortor, quis vestibulum augue ornare eu. Vestibulum ullamcorper diam sit amet urna vulputate efficitur. Ut ac finibus felis, sagittis blandit eros. Maecenas vulputate aliquet quam eu sodales. Vestibulum aliquet blandit mauris eu porttitor. Aliquam in porttitor nulla. Praesent ac tellus sapien. Morbi tempor varius eleifend. Pellentesque est tellus, maximus quis porttitor eu, sagittis ut libero. Cras ut tincidunt magna, vitae tempor mauris. Sed imperdiet dolor id dui luctus mollis. Etiam sit amet mattis est."
                }
            );
        }


    }
}
