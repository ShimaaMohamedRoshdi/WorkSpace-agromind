using AgroMind.GP.APIs.DTOs.IdentityDtos;
using AgroMind.GP.APIs.Helpers;
using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Entities.Identity;
using AgroMind.GP.Core.Services.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AgroMind.GP.APIs.Controllers.AccountController
{
	//baseUrl//api//Controller/EndPoint Name
	[Route("api/[controller]")]
	[ApiController]
	public class AccountsController : ControllerBase
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly SignInManager<AppUser> _signInManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly ITokenService _tokenService;
		private readonly IConfiguration _configuration;

		public AccountsController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService, IConfiguration configuration)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_roleManager = roleManager;
			_tokenService = tokenService;
			_configuration = configuration;
		}

		//Register >> send 1.Email 2. DisplayName 3. PhoneNumber 4.Password 
		//eturn Dto 'DisplayName' , Email , Taken
		[HttpPost("Register")]
		public async Task<ActionResult<UserDTO>> Register(RegisterDTO model)
		{
			if (!ModelState.IsValid)  //Server Side Validation
				return BadRequest(ModelState);

			// Check if user already exists
			var existingUser = await _userManager.FindByEmailAsync(model.email);
			if (existingUser != null)
				return BadRequest(new { Message = "Email is already registered." });
			AppUser User;
			switch (model.role)
			{
				case "Farmer":
			 User = new Farmer()
			 {

				 FName = model.fname,
				 LName = model.lname,
				 UserName = model.email.Split('@')[0],
				 Email = model.email,
				 PhoneNumber = model.phoneNumber,
				 Gender = model.gender,
				 Age = model.age,


			 };
			break;
				case "SystemAdministrator":
					User = new SystemAdministrator()
					{
						FName = model.fname,
						LName = model.lname,
						UserName = model.email.Split('@')[0],
						Email = model.email,
						PhoneNumber = model.phoneNumber,
						Gender = model.gender,
						Age = model.age,
					};
			break;
				case "Supplier":
					User = new Supplier()
					{
						FName = model.fname,
						LName = model.lname,
						UserName = model.email.Split('@')[0],
						Email = model.email,
						PhoneNumber = model.phoneNumber,
						Gender = model.gender,
						Age = model.age,
					//	inventoryCount = 
					};
			break;
				case "AgriculturalExpert":
					User = new AgriculturalExpert()
					{
						FName = model.fname,
						LName = model.lname,
						UserName = model.email.Split('@')[0],
						Email = model.email,
						PhoneNumber = model.phoneNumber,
						Gender = model.gender,
						Age = model.age,
						PreferedCrops = model.PreferedCrops ?? string.Empty,
						AvailableHours = new List<TimeSpan>(), // Fix: assign empty list for List<TimeSpan>
						ExperienceYears = model.ExperienceYears ?? 0,
						ExpertRating = model.ExpertRating ?? 0,
						RegionCovered = model.RegionCovered ?? string.Empty,
						Specialization = model.Specialization ?? string.Empty
					};
			break ;
				default:
				  return BadRequest(new { Message = "Invalid role specified." });
		}
			var Result = await _userManager.CreateAsync(User, model.password);

			if (!Result.Succeeded)
			{
				foreach (var error in Result.Errors)
					ModelState.AddModelError(string.Empty, error.Description);
				return BadRequest(ModelState);
			}

			//  Add the user to the specified role (Ensure role exists)
			if (!string.IsNullOrEmpty(model.role))
			{
				var roleExists = await _roleManager.RoleExistsAsync(model.role);
				if (!roleExists)
					return BadRequest(new { Message = "Invalid role specified." });

				await _userManager.AddToRoleAsync(User,model.role);

			}
			var returneduser = new UserDTO()
			{

				email = User.Email,
				token = await _tokenService.CreateTokenAsync(User, _userManager)

			};


			return Ok(returneduser);
		}

		//Login
		//Re.1234erm. 
		//reem@gmail.com
		[HttpPost("Login")]
		public async Task<ActionResult<UserDTO>> Login(LoginDto model)
		{
			if (!ModelState.IsValid) // Server-Side Validation
				return BadRequest(ModelState);

			// Find the user by email
			var user = await _userManager.FindByEmailAsync(model.email);
			if (user == null)
				return Unauthorized("Invalid email or password.");

			// Check the password
			var result = await _signInManager.CheckPasswordSignInAsync(user, model.password, false);
			if (!result.Succeeded)
				return Unauthorized("Invalid email or password.");

			//Get the user's roles

			var roles= await _userManager.GetRolesAsync(user);


			// Return user data if login is successful
			return Ok(new UserDTO
			{
				email = user.Email,
				token = await _tokenService.CreateTokenAsync(user, _userManager),
				role = roles.FirstOrDefault() // Return the user's role
			});
		}

		// Sign out
		[HttpPost("signout")]
		public async Task<ActionResult> SignOut()
		{
			await _signInManager.SignOutAsync();
			return Ok(new { Message = "Sign out successful." });
		}


		// Forget password
		[HttpPost("ForgetPassword")]

		public IActionResult ForgetPassword()
		{
			return Ok(new { Message = "Please provide your email to reset your password." });
		}

		// Send email for reset password
		[HttpPost("SendEmail")]
		public async Task<IActionResult> SendEmail(ForgetPasswordDTO model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var user = await _userManager.FindByEmailAsync(model.Email);
			if (user != null)
			{
				try
				{

					//var token = await _tokenService.CreateTokenAsync(user, _userManager); //is wrong
					var token = await _userManager.GeneratePasswordResetTokenAsync(user);
var resetPasswordLink = $"http://localhost:5173/reset-password?email={user.Email}&token={Uri.EscapeDataString(token)}";
					// Generate a password reset token
					
				
					// Create a reset password link
					 resetPasswordLink = Url.Action("ResetPassword", "Accounts",
						new { email = user.Email, token = Uri.EscapeDataString(token) }, Request.Scheme);

					var email = new Email
					{
						Subject = "Reset Password",
						To = model.Email,
						Body = $"Click the link to reset your password: {resetPasswordLink}"
					};

					EmailSettings.SendEmail(_configuration, email);

					return Ok(new { Message = "Reset password link has been sent to your email." });
				}
				catch (Exception ex)
				{
					return StatusCode(500, new { Message = "Error sending email. Please try again.", Error = ex.Message });
				}
			}

			return NotFound(new { Message = "Email not found." });
		}

		[HttpGet("ResetPassword")]
		public IActionResult ResetPassword(string email, string token)
		{
			if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(token))
				return BadRequest(new { Message = "Invalid email or token." });

			// Ideally, return a frontend page where the user can input a new password.
			return Ok(new { Email = email, Token = token });
		}

		[HttpPost("ResetPassword")]
		public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO model)
		{
			if (!ModelState.IsValid)
			{
				var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
				return BadRequest(new { Message = "Validation failed", Errors = errors });
			}
			//return BadRequest(ModelState);

			var user = await _userManager.FindByEmailAsync(model.Email);
			if (user == null)
				return NotFound(new { Message = "User not found." });


			// Decode the token
			var decodedToken = Uri.UnescapeDataString(model.Token);

			// Log the token for debugging
			Console.WriteLine($"Received Token: {decodedToken}");


			// Optional: Verify the token before resetting the password
			var isValidToken = await _userManager.VerifyUserTokenAsync(user, TokenOptions.DefaultProvider, "ResetPassword", decodedToken);
			if (!isValidToken)
				return BadRequest(new { Message = "Invalid token." });


			var result = await _userManager.ResetPasswordAsync(user, decodedToken, model.NewPassword);

			if (result.Succeeded)
				return Ok(new { Message = "Password reset successful. You can now log in with your new password." });

			foreach (var error in result.Errors)
				ModelState.AddModelError(string.Empty, error.Description);

			return BadRequest(ModelState);
		}
	}
}



