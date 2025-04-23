using AgroMind.GP.Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgroMind.GP.Repository.Data.SeedingData
{
    public static class AppIdentityDbContextSeed
    {

        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager, ILogger logger)
        {
            string[] roles = { "Farmer", "Expert", "Supplier", "System Administrator" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    var result = await roleManager.CreateAsync(new IdentityRole(role));
                    if (!result.Succeeded)
                    {
                        logger.LogError($"Failed to create role: {role}");
                    }
                }
            }
        }
        public static async Task SeedUserAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, ILogger logger)
        {
            string adminRole = "Expert";
            // Ensure the role exists before creating the user
            if (!await roleManager.RoleExistsAsync(adminRole))
            {
                logger.LogError($"Role '{adminRole}' does not exist. Make sure roles are seeded first.");
                return;
            }

            // Check if user already exists
            var existingUser = await userManager.FindByEmailAsync("saramaged660@gmail.com");
            if (existingUser == null)  // Only create if user doesn't exist
            {
                var AdminUser = new AppUser()
                {
                    FName = "Sara",
                    LName = "Maged",
                    UserName = "saramaged660",
                    Email = "saramaged660@gmail.com",
                    PhoneNumber = "01027910496",
                    Gender = "Female",
                    Age = 22,



                };
                //Create Admin
                var result = await userManager.CreateAsync(AdminUser, "SMaed12.44@"); //User,Password

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(AdminUser, adminRole);
                    logger.LogInformation("Admin user created successfully.");
                }
                logger.LogError($"Failed to create admin user: {string.Join(", ", result.Errors.Select(e => e.Description))}");

            }
            logger.LogInformation("Admin user already exists. Skipping creation.");

        }




    }
}
