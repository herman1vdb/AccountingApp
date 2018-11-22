using System.Collections.Generic;
using AccountingApp.API.Models;
using Newtonsoft.Json;

namespace AccountingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach(var user in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("00000", out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();

                _context.Users.Add(user);
            }
            _context.SaveChanges();
        }       

          private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public void SeedTypes()
        {
            var typeData = System.IO.File.ReadAllText("Data/TypeSeedData.json");
            var types = JsonConvert.DeserializeObject<List<Type>>(typeData);
            types.ForEach(type=>_context.Types.Add(type));
            _context.SaveChanges();
        }

        public void SeedAccounts()
        {
            var accountData = System.IO.File.ReadAllText("Data/AccountSeedData.json");
            var accounts = JsonConvert.DeserializeObject<List<Account>>(accountData);
            accounts.ForEach(acc=>_context.Accounts.Add(acc));
            _context.SaveChanges();
        }

    }
}