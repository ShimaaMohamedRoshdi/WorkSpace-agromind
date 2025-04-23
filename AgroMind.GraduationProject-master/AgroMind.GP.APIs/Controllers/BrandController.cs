using AgroMind.GP.Core.Entities.ProductModule;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Core.Specification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgroMind.GP.APIs.Controllers
{
	
	public class BrandController : APIbaseController
	{
		private readonly IGenericRepositories<Brand, int> _brandsRepo;

		public BrandController(IGenericRepositories<Brand, int> brandsRepo)
		{
			_brandsRepo = brandsRepo;
		}

		//Get All Brands
		[HttpGet("GetAllBrands")]
		public async Task<ActionResult<IReadOnlyList<Brand>>> GetBrands()
		{
			var brands = await _brandsRepo.GetAllAsync();
			return Ok(brands);
		}

		//Get By Id
		[HttpGet("GetBrandById/{id}")]
		public async Task<ActionResult<Brand>> GetBrandById(int id)
		{
			var Brand = await _brandsRepo.GetByIdAsync(id);
			if (Brand == null)
			{
				return NotFound();
			}
			return Ok(Brand);
		}

		//Add

		[HttpPost("AddBrand")]
		public async Task<ActionResult<Brand>> AddBrand(Brand brand)
		{
			if (brand == null)
			{
				return BadRequest("brand is null.");
			}
			await _brandsRepo.AddAsync(brand);
			return CreatedAtAction(nameof(GetBrandById), new { id = brand.Id }, brand);

			
		}


		//Update

		[HttpPut("UpdateBrandById/{id}")]
		public async Task<IActionResult> UpdateBrand(int id, Brand brand)
		{
			if (id != brand.Id)
			{
				return BadRequest();
			}


			var existingbrand = await _brandsRepo.GetByIdAsync(id);

			if (existingbrand == null)
			{
				return NotFound();
			}


			await _brandsRepo.UpdateAsync(existingbrand);

			return NoContent(); // 204 No Content
		}



		//Delete

		[HttpDelete("DeleteBrand/{id}")]
		public async Task<IActionResult> DeleteBrand(int id)
		{

			var brand = await _brandsRepo.GetByIdAsync(id);

			if (brand == null)
			{
				return NotFound();
			}

			await _brandsRepo.DeleteAsync(brand);
			return NoContent(); // 204 No Content
		}

	}
}
