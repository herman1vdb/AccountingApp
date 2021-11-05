using System.Collections.Generic;

namespace AccountingApp.API.Models
{
    public class Type
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public ICollection<Account> Accounts { get; set; }
    }
}