using DevelopmentExcercise.ApplicationContext;
using DevelopmentExcercise.Models.Domain;
using DevelopmentExcercise.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace DevelopmentExcercise.Tests
{
    [TestCaseOrderer("FullNameOfOrderStrategyHere", "OrderStrategyAssemblyName")]
    public class ProductShould : IClassFixture<CustomWebApplicationFactory<DevelopmentExcercise.Api.Startup>>
    {
        public CustomWebApplicationFactory<DevelopmentExcercise.Api.Startup> _factory;
        public ProductShould(CustomWebApplicationFactory<DevelopmentExcercise.Api.Startup> factory)
        {
            _factory = factory;
            _factory.CreateClient();
        }

        [Fact]
        public void CreateNewProduct()
        {
            using (var scope = _factory.Server.Host.Services.CreateScope())
            {
                IProductService _productService = scope.ServiceProvider.GetRequiredService<IProductService>();

                Product sut = new Product();

                sut.Name = "Barbie1";
                sut.Price = Convert.ToDecimal(25.37);
                sut.AgeRestriction = 4;
                sut.Company = "Matel";
                sut.Description = "Is a Barbie";

                var sr = _productService.Add(sut);

                Assert.True(sr.Success);
            }
        }
        
        [Fact]
        public void UpdateExistingProduct()
        {
            using (var scope = _factory.Server.Host.Services.CreateScope())
            {
                IProductService _productService = scope.ServiceProvider.GetRequiredService<IProductService>();
                Product sut = _productService.GetfFirst();

                if (sut == null)
                    CreateNewProduct();

                sut.Name = "Barbie1";
                sut.Price = Convert.ToDecimal(19.99);
                sut.AgeRestriction = 5;
                sut.Company = "Matel";
                sut.Description = "Is a Barbie Updated";

                var sr = _productService.Update(1,sut);

                Assert.True(sr.Success);
            }
        }

        [Fact]
        public void GetProduct()
        {
            using (var scope = _factory.Server.Host.Services.CreateScope())
            {
                IProductService _productService = scope.ServiceProvider.GetRequiredService<IProductService>();
                Product sut = _productService.GetfFirst();

                if (sut == null)
                    CreateNewProduct();

                Assert.NotNull(sut);
            }
        }

        [Fact]
        public void GetAllProducts()
        {
            using (var scope = _factory.Server.Host.Services.CreateScope())
            {
                IProductService _productService = scope.ServiceProvider.GetRequiredService<IProductService>();
                var sut = _productService.GetList();

                if (sut == null)
                    CreateNewProduct();

                Assert.NotNull(sut);
            }
        }

        [Fact]
        public void DeleteExistingProduct()
        {
            using (var scope = _factory.Server.Host.Services.CreateScope())
            {
                IProductService _productService = scope.ServiceProvider.GetRequiredService<IProductService>();

                var sut = _productService.GetfFirst();

                if (sut == null)
                    CreateNewProduct();

                var sr = _productService.Delete(sut.Id);

                Assert.True(sr.Success);
            }
        }
    }

    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var serviceProvider = new ServiceCollection()
                    .AddEntityFrameworkInMemoryDatabase()
                    .BuildServiceProvider();

                services.AddDbContext<DevelopmentExcerciseContext>(options =>
                {
                    options.UseInMemoryDatabase("DBInMemoryTest");
                    options.UseInternalServiceProvider(serviceProvider);
                });
            });
        }
    }
}
