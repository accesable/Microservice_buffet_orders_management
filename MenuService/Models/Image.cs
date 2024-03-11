using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication1.Models
{
    public class Image
    {
        [Key]
        public int ImageId { get; set; } // Primary key
        [Required]
        public required string ImageUrl { get; set; } // Property to store the URL of the image
        public int ItemId { get; set; } // Foreign key property to associate with the Item
        
        [ForeignKey("ItemId")] // Foreign key attribute to associate with the Item
        [JsonIgnore]
        public Item? Item { get; set; } // Navigation property back to the Item
    }
}
