namespace AccountingApp.API.Dtos
{
    public class AccountForUpdateDto
    {
        public string Description { get; set; }
        public decimal Budget { get; set; }
        public bool isActive { get; set; }
        public bool isControlAccount { get; set; }
    }
}