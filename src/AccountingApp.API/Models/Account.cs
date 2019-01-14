namespace AccountingApp.API.Models
{
    public class Account
    {
        public int Id { get; set; }
        public Type Type { get; set; }        
        public int TypeId{ get; set; }
        public string Description { get; set; } 
        public decimal Budget { get; set; }       
    }
}