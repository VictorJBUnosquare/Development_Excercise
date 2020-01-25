using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DevelopmentExcercise.Api.ViewModels
{
    public class ProductViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required.")]
        [MaxLength(50, ErrorMessage = "Length should not exceed {1} characters")]
        public string Name { get; set; }

        [MaxLength(100, ErrorMessage = "Length should not exceed {1} characters")]
        public string Description { get; set; }
        public int? AgeRestriction { get; set; }

        [Required(ErrorMessage = "The field {0} is required.")]
        [MaxLength(50, ErrorMessage = "Length should not exceed {1} characters")]
        public string Company { get; set; }

        [Required(ErrorMessage = "The field {0} is required.")]
        public decimal? Price { get; set; }
    }
}
