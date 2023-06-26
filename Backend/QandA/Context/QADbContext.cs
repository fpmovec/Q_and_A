using Microsoft.EntityFrameworkCore;

namespace QandA.Context
{
    public class QADbContext : DbContext
    {
        public QADbContext(DbContextOptions<QADbContext> opt) : base(opt) { }

        public DbSet<>
    }
}
