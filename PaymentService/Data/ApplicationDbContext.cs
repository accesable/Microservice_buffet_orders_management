using Microsoft.EntityFrameworkCore;

namespace PaymentService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<PaymentService.Models.Payment> Payments { get; set; }
    }
}
