using Microsoft.EntityFrameworkCore;
using KnowledgeBase.DataAccess.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace KnowledgeBase.DataAccess
{
    /// <summary>
    /// The dbcontext class to hold the data necessary for the application
    /// </summary>
    public class KnowledgeContext: IdentityDbContext<DbUser>
    {
        public KnowledgeContext(DbContextOptions options): base(options) { }
        public KnowledgeContext(): base() { }

        public DbSet<DbAnswer> Answers { get; set; }
        public DbSet<DbQuestion> Questions { get; set; }
        public DbSet<DbTopic> Topics { get; set; }
        public DbSet<DbUserTopic> UserTopics { get; set; }

        public DbSet<DbNotification> Notifications { get; set; }


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
            
            modelBuilder.Entity<DbNotification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .IsRequired();

            modelBuilder.Entity<DbNotification>()
                .HasOne(n => n.Question)
                .WithMany()
                .HasForeignKey(n => n.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DbQuestion>()
                .HasOne(n => n.User)
                .WithMany(u => u.Questions)
                .HasForeignKey(q => q.UserId)
                .OnDelete(DeleteBehavior.NoAction); //We won't delete explicitly a user so we don't have to cascade or use set null

            modelBuilder.Entity<DbQuestion>()
                .HasOne(n => n.Moderator)
                .WithMany(u => u.ModeratedQuestions)
                .HasForeignKey(q => q.ModeratorId)
                .OnDelete(DeleteBehavior.NoAction); //We won't delete users, and MS SQL does not let to delete to the same class

            modelBuilder.Entity<DbAnswer>()
                .HasOne(a => a.User)
                .WithMany(u => u.Answers)
                .HasForeignKey(a =>a.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<DbAnswer>()
                .HasOne(a => a.Moderator)
                .WithMany(u => u.ModeratedAnswers)
                .HasForeignKey(a => a.ModeratorId)
                .OnDelete(DeleteBehavior.NoAction); //Same as with users



            base.OnModelCreating(modelBuilder);
        }


    }
}
