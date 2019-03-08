
using AccountingApp.API.Models;

namespace AccountingApp.API.Dtos
{
    public class AccountForCreationDto
    {
        public int TypeId { get; set; }
                
        public string Description { get; set; }
        public decimal Budget { get; set; }
        public bool isActive { get; set; }    
        public bool isControlAccount { get; set; }
    }
}