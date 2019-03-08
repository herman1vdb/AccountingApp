using System;

namespace AccountingApp.API.Dtos
{
    public class TransactionForUpdateDto
    {   
        public DateTime Date { get; set; }   
        public int AccountDebitId { get; set; }
        public int AccountCreditId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }   
        public bool Posted { get; set; }
    }
}