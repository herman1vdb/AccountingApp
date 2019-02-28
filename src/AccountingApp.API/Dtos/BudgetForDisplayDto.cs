using System.Collections.Generic;
using AccountingApp.API.Models;

namespace AccountingApp.API.Dtos
{
    public class BudgetForDisplayDto
    { 
        public Account Account { get; set; }
        public IEnumerable<Transaction> Transactions { get; set; }
    }
}