using System;

namespace AccountingApp.API.Dtos
{
    public class TransactionForCreationDto
    {
        public DateTime Date { get; set; }   
        public string DebitCredit { get; set; }
        public string Description { get; set; }
    }
}