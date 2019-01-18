
using AccountingApp.API.Models;

namespace AccountingApp.API.Dtos
{
    public class AccountForCreationDto
    {
        public int TypeId { get; set; }
        public string Description { get; set; }
        public int Budget { get; set; }
    }
}