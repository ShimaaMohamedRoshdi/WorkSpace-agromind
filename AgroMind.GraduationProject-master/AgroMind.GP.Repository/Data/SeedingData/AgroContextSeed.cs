using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Entities.ProductModule;
using AgroMind.GP.Repository.Data.Contexts;
using System.Text.Json;

namespace AgroMind.GP.Repository.Data.SeedingData
{
	public static class AgroContextSeed
	{
		//Seeding
		//1- Object From DBContext in Parameter of function
		public static async Task SeedAsync(AgroMindContext dbcontext)
		{
			//Brand
			if (!dbcontext.Brands.Any()) //If Not there data
			{
				var BrandsData = File.ReadAllText("../AgroMind.GP.Repository/Data/DataSeed/brands.json");
				var Brands = JsonSerializer.Deserialize<List<Brand>>(BrandsData); //Deseralize "Convert from Json File To string"
				if (Brands?.Count > 0)
				{
					foreach (var brand in Brands)  //to add in database
					{
						await dbcontext.Set<Brand>().AddAsync(brand); //This add locally need to save changes 
					}
					await dbcontext.SaveChangesAsync(); //After foreach( meaning : after adding all Brands Save Change )
				}
			}
			//Categories
			if (!dbcontext.Categories.Any()) //If Not there data
			{
				var CategoriesData = File.ReadAllText("../AgroMind.GP.Repository/Data/DataSeed/Categories.json");
				var Categories = JsonSerializer.Deserialize<List<Category>>(CategoriesData);

				if (Categories?.Count > 0)
				{
					foreach (var category in Categories)
					{
						await dbcontext.Set<Category>().AddAsync(category);
					}
					await dbcontext.SaveChangesAsync();
				}
			}

			//Products
			if (!dbcontext.Products.Any()) //If Not there data
			{
				var ProductsData = File.ReadAllText("../AgroMind.GP.Repository/Data/DataSeed/products.json");

				var Products = JsonSerializer.Deserialize<List<Product>>(ProductsData);

				if (Products?.Count > 0)
				{
					foreach (var product in Products)
					{
						await dbcontext.Set<Product>().AddAsync(product);
					}
					await dbcontext.SaveChangesAsync();
				}
			}

			////Crops
			//if (!dbcontext.Crop.Any())
			//{
			//	var CropsData = File.ReadAllText("../AgroMind.GP.Repository/Data/DataSeed/Crops.json");
			//	var crops = JsonSerializer.Deserialize<List<Crop>>(CropsData);
			//	if (crops?.Count > 0)
			//	{
			//		foreach (var crop in crops)
			//		{
			//			await dbcontext.Set<Crop>().AddAsync(crop);
			//		}
			//		await dbcontext.SaveChangesAsync();
			//	}


			//}


		}
	}
}

