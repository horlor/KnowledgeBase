﻿// <auto-generated />
using System;
using KnowledgeBase.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace KnowledgeBase.DataAccess.Migrations
{
    [DbContext(typeof(KnowledgeContext))]
    partial class KnowledgeContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("KnowledgeBase.DataAccess.DataObjects.DbAnswer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(1000)")
                        .HasMaxLength(1000);

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.HasIndex("UserId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("KnowledgeBase.DataAccess.DataObjects.DbQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Questions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Content = "Curabitur auctor bibendum dui, at posuere lorem tempor eu. Aenean porttitor vulputate ex, in ultricies mi dictum nec. Fusce maximus faucibus tortor, quis vestibulum augue ornare eu. Vestibulum ullamcorper diam sit amet urna vulputate efficitur. Ut ac finibus felis, sagittis blandit eros. Maecenas vulputate aliquet quam eu sodales. Vestibulum aliquet blandit mauris eu porttitor. Aliquam in porttitor nulla. Praesent ac tellus sapien. Morbi tempor varius eleifend. Pellentesque est tellus, maximus quis porttitor eu, sagittis ut libero. Cras ut tincidunt magna, vitae tempor mauris. Sed imperdiet dolor id dui luctus mollis. Etiam sit amet mattis est.",
                            Title = "This is a question about something extremely important"
                        },
                        new
                        {
                            Id = 2,
                            Content = "Curabitur auctor bibendum dui, at posuere lorem tempor eu. Aenean porttitor vulputate ex, in ultricies mi dictum nec. Fusce maximus faucibus tortor, quis vestibulum augue ornare eu. Vestibulum ullamcorper diam sit amet urna vulputate efficitur. Ut ac finibus felis, sagittis blandit eros. Maecenas vulputate aliquet quam eu sodales. Vestibulum aliquet blandit mauris eu porttitor. Aliquam in porttitor nulla. Praesent ac tellus sapien. Morbi tempor varius eleifend. Pellentesque est tellus, maximus quis porttitor eu, sagittis ut libero. Cras ut tincidunt magna, vitae tempor mauris. Sed imperdiet dolor id dui luctus mollis. Etiam sit amet mattis est.",
                            Title = "This is a question about something extremely important"
                        });
                });

            modelBuilder.Entity("KnowledgeBase.DataAccess.DataObjects.DbUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("KnowledgeBase.DataAccess.DataObjects.DbAnswer", b =>
                {
                    b.HasOne("KnowledgeBase.DataAccess.DataObjects.DbQuestion", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KnowledgeBase.DataAccess.DataObjects.DbUser", "User")
                        .WithMany("Answers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KnowledgeBase.DataAccess.DataObjects.DbQuestion", b =>
                {
                    b.HasOne("KnowledgeBase.DataAccess.DataObjects.DbUser", "User")
                        .WithMany("Questions")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
