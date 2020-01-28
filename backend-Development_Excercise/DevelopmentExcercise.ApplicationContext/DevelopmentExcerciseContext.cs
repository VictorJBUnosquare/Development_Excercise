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
        public DevelopmentExcerciseContext(DbContextOptions<DevelopmentExcerciseContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductConfiguration());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Product> Products { get; set; }
    }
}
