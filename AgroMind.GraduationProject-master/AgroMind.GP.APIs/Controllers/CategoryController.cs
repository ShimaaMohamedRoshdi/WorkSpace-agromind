using AgroMind.GP.APIs.DTOs;
using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Entities.ProductModule;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Core.Specification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgroMind.GP.APIs.Controllers
{
	
	public class CategoryController : APIbaseController
	{
		private readonly IGenericRepositories<Category, int> _categoriesRepo;

		public CategoryController(IGenericRepositories<Category, int> categoriesRepo)
		{
			_categoriesRepo = categoriesRepo;
		}

		//Get All Categoriess
		[HttpGet("Categories")]

		public async Task<ActionResult<IReadOnlyList<Category>>> GetCategories()
		{
			var categories = await _categoriesRepo.GetAllAsync();
			return Ok(categories);
		}

		//Get By Id
		[HttpGet("GetCategoryById/{id}")]
		public async Task<ActionResult<Category>> GetCategorytById(int id)
		{
			
			var category = await _categoriesRepo.GetByIdAsync(id);
			if (category == null)
			{
				return NotFound();
			}
			return Ok(category);
		}

		//Add

		[HttpPost("AddCategory")]
		public async Task<ActionResult<Category>> AddCategory(Category category)
		{
			if (category == null)
			{
				return BadRequest("Category is null.");
			}

			await _categoriesRepo.AddAsync(category);
			return CreatedAtAction(nameof(GetCategorytById), new { id = category.Id }, category);
		}
	


		//Update

		[HttpPut("UpdateCategoryById/{id}")]
		public async Task<IActionResult> UpdateCategory(int id, Category category)
		{
			if (id != category.Id)
			{
				return BadRequest();
			}

			
			var existingcategory = await _categoriesRepo.GetByIdAsync(id);

			if (existingcategory == null)
			{
				return NotFound();
			}

			
			await _categoriesRepo.UpdateAsync(existingcategory);

			return NoContent(); // 204 No Content
		}



		//Delete

		[HttpDelete("DeleteCropById/{id}")]
		public async Task<IActionResult> DeleteCategory(int id)
		{
		
			var category= await _categoriesRepo.GetByIdAsync(id);

			if (category == null)
			{
				return NotFound();
			}

			await _categoriesRepo.DeleteAsync(category);
			return NoContent(); // 204 No Content
		}
	}
}
