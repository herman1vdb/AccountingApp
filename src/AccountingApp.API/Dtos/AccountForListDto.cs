namespace AccountingApp.API.Dtos
{
    public class AccountForListDto
    {
        public int id { get; set; }
        public int TypeId{ get; set; }
        public string Description { get; set; }   
        public decimal Budget { get; set; }   
        public bool isActive { get; set; }    
        public bool isControlAccount { get; set; }
    }
}