namespace AgroMind.GP.APIs.DTOs.IdentityDtos
{
	public class ResetPasswordDTO
	{

		public string Email { get; set; } // Must be non-null
		public string Token { get; set; } // The reset token

		public string NewPassword { get; set; } // The new password

		public string ConfirmPassword { get; set; } // Confirmation for the new password


	}
}
