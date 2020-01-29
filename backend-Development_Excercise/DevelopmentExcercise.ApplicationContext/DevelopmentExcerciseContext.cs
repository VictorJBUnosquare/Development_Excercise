using DevelopmentExcercise.ApplicationContext.Configurations;
using DevelopmentExcercise.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevelopmentExcercise.ApplicationContext
{
    public class DevelopmentExcerciseContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public DevelopmentExcerciseContext(DbContextOptions<DevelopmentExcerciseContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = -1,
                    Name = "Barbie Developer",
                    Company = "Matel",
                    AgeRestriction = 5,
                    Description = "Nothing",
                    Price = Convert.ToDecimal(19.99)
                },
                new Product
                {
                    Id = -2,
                    Name = "Barbie QA",
                    Company = "Matel",
                    AgeRestriction = 4,
                    Description = "Nothing",
                    Price = Convert.ToDecimal(22.99)
                },
                new Product
                {
                    Id = -3,
                    Name = "Barbie Scrum master",
                    Company = "Matel",
                    AgeRestriction = 6,
                    Description = "Nothing",
                    Price = Convert.ToDecimal(21.99)     
                });
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
