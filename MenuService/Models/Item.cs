using NSwag.Annotations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table("items")]
    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        [Required]
        [StringLength(128)]
        public string? ItemName { get; set; }
        [Required]
        [StringLength(255)]
        public string? ItemDescription { get; set; }
        [Required]
        public decimal OriginalPrice { get; set; }
        public ICollection<Image> Images { get; set; } = new List<Image>();
        public int CategoryId { get; set; }
        [OpenApiIgnore]
        public Category ? Category { get; set; }
    }
}
