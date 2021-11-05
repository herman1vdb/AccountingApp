using System.Threading.Tasks;
using AccountingApp.API.Dtos;
using AccountingApp.API.Models;

namespace AccountingApp.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(UserForRegisterDto userForRegisterDto);
        Task<User> UpdatePassword(UserForUpdateDto userForUpdateDto);
        Task<User> Login(string username, string password);
        Task<bool> UserExist(string username);
    }
}