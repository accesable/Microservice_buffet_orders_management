using ProductService.Models.DTOs;

namespace WebApplication1.Models.DTOs
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string ? CategoryName { get; set; }
        public ICollection<ItemDto> ? Items { get; set; }
    }
}
