namespace AccountingApp.API.Models
{
    public class Account
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        public virtual Type Type { get; set; }        
        public int TypeId{ get; set; }
        public string Description { get; set; } 
        public decimal Budget { get; set; }
        public bool isControlAccount { get; set; }
        public bool isActive { get; set; }
    }
}