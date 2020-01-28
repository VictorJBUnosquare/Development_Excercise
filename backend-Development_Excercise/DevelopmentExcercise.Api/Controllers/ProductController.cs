using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DevelopmentExcercise.Api.ViewModels;
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
        private readonly IMapper _mapper;
        private readonly IProductService _productService;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _mapper = mapper;
            _productService = productService;
        }

        [HttpPost]
        [Route("product")]
        public ActionResult Add([FromBody] ProductViewModel productViewModel)
        {
            var payLoad = new Payload<ProductViewModel>();

            try
            {
                Product product = _mapper.Map<Product>(productViewModel);
                var sr = _productService.Add(product);

                if(sr.Success)
                {
                    productViewModel.Id = product.Id;
                    payLoad.Data = productViewModel;
                }

                else
                {
                    payLoad.Code = 500;
                    payLoad.Message = sr.UserMessage;
                }
            }

            catch (ServiceException e)
            {
                payLoad.Code = 500;
                payLoad.Message = e.Message;
            }
            catch (Exception e)
            {
                payLoad.Code = Convert.ToInt32(OperationError.InternalServerError);
                payLoad.Message = "An error occurred";
            }

            return Ok(payLoad);
        }

        [HttpGet]
        [Route("products")]
        public ActionResult GetAll()
        {
            var payLoad = new Payload<IEnumerable<ProductViewModel>>();
            try
            {
                var products = _productService.GetList();
                payLoad.Data = _mapper.Map<IEnumerable<ProductViewModel>>(products);
            }
            catch (ServiceException e)
            {
                payLoad.Code = Convert.ToInt32(OperationError.InternalServerError);
                payLoad.Message = e.Message;
            }
            catch (Exception e)
            {
                payLoad.Code = Convert.ToInt32(OperationError.InternalServerError);
                payLoad.Message = "An error occurred";
            }

            return Ok(payLoad);
        }
    }
}