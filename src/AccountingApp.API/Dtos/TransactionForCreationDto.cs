using System;

namespace AccountingApp.API.Dtos
{
    public class TransactionForCreationDto
    {
        public DateTime Date { get; set; }   
        public int AccountDebitId { get; set; }
        public int AccountCreditId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
    }
}