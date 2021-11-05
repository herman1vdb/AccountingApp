using AccountingApp.API.Models;

namespace AccountingApp.API.Dtos
{
    public class AccountForDetailedDto
    {
        public int id { get; set; }
        public Type Type { get; set; }        
        public int TypeId{ get; set; }
        public string Description { get; set; }   
    }
}