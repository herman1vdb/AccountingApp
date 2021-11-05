using System.ComponentModel.DataAnnotations;

namespace AccountingApp.API.Dtos
{
    public class UserForRegisterDto
    {   public string Username { get; set; }
        public string Password { get; set; }
    }
}