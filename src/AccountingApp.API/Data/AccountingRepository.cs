using System.Collections.Generic;
using System.Threading.Tasks;
using AccountingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountingApp.API.Data
{
    public class AccountingRepository : IAccountingRepository
    {
        private readonly DataContext _context;

        public AccountingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Account> GetAccount(int id)
        {            
            return await _context
                .Accounts
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<T> GetObject<T>(int id) where T : class
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetObjects<T>() where T : class
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}