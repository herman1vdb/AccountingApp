using System;

namespace AccountingApp.API.Models
{
    public class Transaction
    {
        public int Id { get; set; } 
        public DateTime Date { get; set; }
        public Account Account { get; set; }
        public int AccountId { get; set; }
        public string DebitCredit { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }

    }
}