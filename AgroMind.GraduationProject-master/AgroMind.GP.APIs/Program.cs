using AgroMind.GP.APIs.Extensions;
using AgroMind.GP.APIs.Helpers;
using AgroMind.GP.Core.Entities.Identity;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Repository.Data.Contexts;
using AgroMind.GP.Repository.Data.SeedingData;
using AgroMind.GP.Repository.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace AgroMind.GP.APIs
{
	public class Program
	{
		public static async Task Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			builder.Services.AddDbContext<AgroMindContext>(Options =>
			{
				//Configuration >- el property el maska el file el appsetting
				Options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

			});

			builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
			{
				options.TokenLifespan = TimeSpan.FromHours(2); // Set your desired expiration
			});
			#region IdentityServices

			//builder.Services.AddDbContext<AppIdentityDbContext>(Options =>
			//{
			//	Options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection"));

			//});
			builder.Services.AddIdentityServices(builder.Configuration); //Extension Method have Services of Identity
			#endregion
			builder.Services.AddScoped<ICartRepository, CartRepository>();
			builder.Services.AddSingleton<IConnectionMultiplexer>(Options =>
			{
				var connection = builder.Configuration.GetConnectionString("RedisConnection");
				return ConnectionMultiplexer.Connect(connection);
			});

			//builder.Services.AddScoped<IGenericRepositories<Product, int>, GenericRepository<Product, int>>();

			//This AddScoped For Generic to didn't Add Service for each Repository
			builder.Services.AddScoped(typeof(IGenericRepositories<,>), typeof(GenericRepository<,>));
			//builder.Services.AddAutoMapper(M => M.AddProfile(new MappingProfiles()));
			builder.Services.AddAutoMapper(typeof(MappingProfiles));



			builder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowAll",
					builder => builder
					.AllowAnyOrigin()
					.AllowAnyMethod()
					.AllowAnyHeader());
			});

			//Add all services BEFORE builder.Build()

			var app = builder.Build();

			app.UseCors("AllowAll");

			#region Update DB
			//To Allow CLR To Inject Object From AgroMindDbContext
			using var Scope = app.Services.CreateScope(); //Cretae Scope : is Container has Servises Of LifeTime Type :Scoped
														  //Like :AgroMindDbContext() "Act Db"


			var Services = Scope.ServiceProvider;


			var context = Services.GetRequiredService<AgroMindContext>();
			var loggerFactory = Services.GetRequiredService<ILoggerFactory>();
			//var logger = Services.GetRequiredService<ILogger<Program>>();
			var logger = loggerFactory.CreateLogger<Program>();

			var roleManager = Services.GetRequiredService<RoleManager<IdentityRole>>();
			var userManager = Services.GetRequiredService<UserManager<AppUser>>();


			try // if DB kant Mawgoda
			{

				await context.Database.MigrateAsync(); //Update-Database

				await AppIdentityDbContextSeed.SeedRolesAsync(roleManager, logger);
				await AppIdentityDbContextSeed.SeedUserAsync(userManager, roleManager, logger);
				await AgroContextSeed.SeedAsync(context); //Seeding Data

				// --- Add this to Program.cs to seed roles at startup ---
				string[] roles = { "Farmer", "Supplier", "AgriculturalExpert", "SystemAdministrator" };
				foreach (var role in roles)
				{
					if (!await roleManager.RoleExistsAsync(role))
						await roleManager.CreateAsync(new IdentityRole(role));
				}
				// --- End role seeding code ---
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "There Are Problems during Apply Migrations !");// What Message Act => LogError -> red and Message of error
			}
			#endregion


			//builder.Logging.AddConsole();
			//builder.Logging.SetMinimumLevel(LogLevel.Debug);



			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();
			//app.UseStaticFiles();
			app.UseAuthentication();
			app.UseAuthorization();
			app.MapControllers();


			app.Run();
		}
	}
}
