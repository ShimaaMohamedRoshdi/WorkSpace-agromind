
using AgroMind.GP.Core.Entities.Identity;
using AgroMind.GP.Core.Services.Contract;
using AgroMind.GP.Repository.Data.Contexts;
using AgroMind.GP.Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AgroMind.GP.APIs.Extensions
{
	public static class IdentityServiceExtension
	{
		public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddScoped<ITokenService, TokenService>();

			services.AddIdentity<AppUser, IdentityRole>(options =>
			{

				options.Password.RequireNonAlphanumeric = true; //@ # $
				options.Password.RequireDigit = true;  //123
				options.Password.RequireLowercase = true; //abc
				options.Password.RequireUppercase = true; //ABC
				options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultProvider;
			})
			.AddEntityFrameworkStores<AgroMindContext>()
			.AddDefaultTokenProviders();

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.RequireHttpsMetadata = false;
					options.SaveToken = true;
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = configuration["JWT:ValidIssuer"],
						ValidAudience = configuration["JWT:ValidAudience"],
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:key"]))
					};
				});

			return services;
		}
	}
}

