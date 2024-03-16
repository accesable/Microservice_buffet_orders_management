using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace PaymentService.Models
{
    [Table("payments")]
    public class Payment
    {
        public int Id { get; set; }
        [Column("customer_name", TypeName ="varchar(128)")]
        public string Name { get; set; } = "Customer "+DateTime.Now.ToString();
        public decimal Amount { get; set; }
        [Column("order_id", TypeName = "varchar(128)")]
        [Required]
        public string ? OrderId { get; set; }

    }
}
