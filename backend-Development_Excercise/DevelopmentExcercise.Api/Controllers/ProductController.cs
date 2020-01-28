using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevelopmentExcercise.ApplicationContext;
using DevelopmentExcercise.Common;
using DevelopmentExcercise.Models.Domain;
using DevelopmentExcercise.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DevelopmentExcercise.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        [Route("product")]
        public ActionResult Add()
        {
            var payload = new Payload<Product>();

            _productService.AddProduct();

            return Ok(payload);
        }

        [HttpGet]
        [Route("product")]
        public ActionResult Get()
        {
            var payload = new Payload<Product>();

            _productService.GetAll();

            return Ok(payload);
        }
    }
}