using DevelopmentExcercise.ApplicationContext;
using DevelopmentExcercise.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevelopmentExcercise.Services
{
    public interface IProductService : IRepository
    {
    }

    public class ProductService : IProductService
    {
        DevelopmentExcerciseContext _context;

        public ProductService(DevelopmentExcerciseContext context)
        {
            _context = context;
        }

        public void AddProduct()
        {
            Product product = new Product();
            product.Name = "Product1";
            product.Price = Convert.ToDecimal(25.3);
            product.Company = "Matel";
            product.AgeRestriction = 14;

            //var sr = context.Products.Add(product);
        }

        public Task CreateAsync<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<List<T>> FindAll<T>() where T : class
        {
            throw new NotImplementedException();
        }

        public Task<T> FindById<T>(long id) where T : class
        {
            throw new NotImplementedException();
        }

        public void GetAll()
        {
            //DevelopmentExcerciseContext context = new DevelopmentExcerciseContext();
            //var products = context.Products.ToList();
        }

        public Task UpdateAsync<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }
    }
}
