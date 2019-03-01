using System;

namespace AccountingApp.API.Models
{
    public class Transaction
    {
        public int Id { get; set; } 
        public DateTime Date { get; set; }   
        public Account AccountDebit { get; set; }      
        public Account AccountCredit { get; set; }      
        public int AccountDebitId { get; set; }
        public int AccountCreditId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }

    }
}