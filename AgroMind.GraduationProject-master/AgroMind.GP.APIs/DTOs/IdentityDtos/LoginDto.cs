using System.ComponentModel.DataAnnotations;
namespace AgroMind.GP.APIs.DTOs.IdentityDtos
{ 
	public class LoginDto
	{
		[Required]
		[EmailAddress]
		public string email { get; set; }

		[Required]
		public string password { get; set; }
	}
}
