using AccountingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<User> Users { get; set; }                
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Type> Types{  get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}