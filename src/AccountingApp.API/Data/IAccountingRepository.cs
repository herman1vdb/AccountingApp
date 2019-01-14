using System.Collections.Generic;
using System.Threading.Tasks;
using AccountingApp.API.Models;

namespace AccountingApp.API.Data
{
    public interface IAccountingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<T>> GetObjects<T>() where T:class;
        Task<T> GetObject<T>(int id) where T: class;        
    }
}