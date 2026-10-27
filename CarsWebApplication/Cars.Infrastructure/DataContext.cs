using Cars.Domain;
using Microsoft.EntityFrameworkCore;
using System.Runtime.ConstrainedExecution;

namespace Cars.Infrastructure;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public DbSet<Car> Cars => Set<Car>();
}