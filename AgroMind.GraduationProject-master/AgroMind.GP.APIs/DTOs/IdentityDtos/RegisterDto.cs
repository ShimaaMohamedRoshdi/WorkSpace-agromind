using System.ComponentModel.DataAnnotations;

namespace AgroMind.GP.APIs.DTOs.IdentityDtos
{
	public class RegisterDTO
	{

		[Required]
		public string fname { get; set; } // Changed from Fname for consistency

		[Required]
		public string lname { get; set; } // Changed from Lname for consistency

		[Required]
		public string userName { get; set; }


		[Required]
		[EmailAddress]
		public string email { get; set; }

		[Required]
		[Phone]
		public string phoneNumber { get; set; }

		[Required]
		public string gender { get; set; }

		[Required]
		public int age { get; set; }
		public string role { get; set; } // Changed from role

		public string password { get; set; }

		[Compare("password")]
		public string confirmPassword { get; set; }


		 // Added for AgriculturalExpert registration (nullable to avoid C# warnings)
		public string? PreferedCrops { get; set; }
		public int? AvailableHours { get; set; }
		public int? ExperienceYears { get; set; }
		public int? ExpertRating { get; set; }
		public string? RegionCovered { get; set; }
		public string? Specialization { get; set; }

		//[Required]
		//[RegularExpression(
		//   @"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?,.<>]).{8,}$",
		//   ErrorMessage = "Password must contain at least 1 Uppercase, 1 Lowercase, 1 Digit, 1 Special Character, and be at least 8 characters long.")]



		//[Required(ErrorMessage = "Confirm Password Is Required")]
		//[DataType(DataType.Password)]
		//[Compare("password", ErrorMessage = "Passwords do not match.")]


	}

}

