using Microsoft.EntityFrameworkCore;
using KnowledgeBase.DataAccess.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace KnowledgeBase.DataAccess
{
    public class KnowledgeContext: IdentityDbContext<DbUser>
    {
        public KnowledgeContext(DbContextOptions options): base(options) { }
        public KnowledgeContext(): base() { }

        public DbSet<DbAnswer> Answers { get; set; }
        public DbSet<DbQuestion> Questions { get; set; }
        public DbSet<DbTopic> Topics { get; set; }
        public DbSet<DbUserTopic> UserTopics { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbUserTopic>()
                .HasKey(t => new { t.TopicId, t.UserId });
            modelBuilder.Entity<DbUserTopic>()
                .HasOne(ut => ut.User)
                .WithMany(u => u.UserTopics)
                .HasForeignKey(ut => ut.UserId);
            modelBuilder.Entity<DbUserTopic>()
                .HasOne(ut => ut.Topic)
                .WithMany(t => t.UserTopics)
                .HasForeignKey(ut => ut.TopicId);

            modelBuilder.Entity<DbTopic>()
                .HasIndex(t => t.Name)
                .IsUnique();


            base.OnModelCreating(modelBuilder);
        }


    }
}
