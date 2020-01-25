using AutoMapper;
using DevelopmentExcercise.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DevelopmentExcercise.Api.Config
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Domain to ViewModel
            //CreateMap<Product, ProductViewModel>();

            //ViewModel to Domain
            //CreateMap<ProductViewModel, Product>();
        }
    }
}
