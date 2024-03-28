namespace WebApplication1.Models.RequestModels
{
    public class ImageRequest
    {
        public int ImageId { get; set; } // Primary key
        public required string ImageUrl { get; set; } // Property to store the URL of the image
        public int ItemId { get; set; } // Foreign key property to associate with the Item
    }
}
