using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("categories")]   
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        [StringLength(255)]
        public string ? CategoryName { get; set; }
        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
