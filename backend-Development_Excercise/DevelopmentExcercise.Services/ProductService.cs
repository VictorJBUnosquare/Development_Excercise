using DevelopmentExcercise.ApplicationContext;
using DevelopmentExcercise.Common;
using DevelopmentExcercise.Models.Domain;
using DevelopmentExcercise.Services.ServiceBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevelopmentExcercise.Services
{
    public interface IProductService : IServiceBase<Product>
    {
    }

    public class ProductService : Repository<Product>, IProductService
    {
        public ProductService(DevelopmentExcerciseContext context) : base(context)
        {
        }
        public ServiceResponse Delete(int id)
        {
            var sr = new ServiceResponse();

            try
            {
                var product = GetById(id);

                if (product == null)
                    return new ServiceEntityNotFound();

                Remove(product);
                SaveChanges();
            }
            catch (Exception e)
            {
                var methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                sr = new ServiceOperationFailed("Failed to obtain the products", e, GetType().Name, methodName);
                throw new ServiceException(sr.UserMessage);
            }

            return sr;
        }

        public IEnumerable<Product> GetList()
        {
            try
            {
                var products = GetAll();
                return products;
            }
            catch (Exception e)
            {
                var methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                var sr = new ServiceOperationFailed("Failed to obtain the products", e, GetType().Name, methodName);
                throw new ServiceException(sr.UserMessage);
            }
        }

        public Product GetById(int id)
        {
            try
            {
                var product = Get(id);
                return product;
            }
            catch (Exception e)
            {
                var methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                var sr = new ServiceOperationFailed("Failed to obtain the products", e, GetType().Name, methodName);
                throw new ServiceException(sr.UserMessage);
            }
        }

        public ServiceResponse Update(int id, Product product)
        {
            var sr = new ServiceResponse();

            try
            {
                var currentProduct = Get(id);

                if (product == null)
                    return new ServiceEntityNotFound();

                currentProduct.Name = product.Name;
                currentProduct.Description = product.Description;
                currentProduct.Company = product.Company;
                currentProduct.AgeRestriction = product.AgeRestriction;
                currentProduct.Price = product.Price;
                SaveChanges();
            }
            catch (Exception e)
            {
                var methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                sr = new ServiceOperationFailed("Failed to obtain the products", e, GetType().Name, methodName);
                throw new ServiceException(sr.UserMessage);
            }

            return sr;
        }

        ServiceResponse IServiceBase<Product>.Add(Product product)
        {
            var sr = new ServiceResponse();

            try
            {
                if (Any(p => p.Name == product.Name))
                    return new ServiceEntityDuplicated("product");

                Add(product);
                SaveChanges();
            }
            catch (Exception e)
            {
                var methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
                sr = new ServiceOperationFailed("Failed try to add product", e, GetType().Name, methodName);
                throw new ServiceException(sr.UserMessage);
            }

            return sr;
        }
    }
}
