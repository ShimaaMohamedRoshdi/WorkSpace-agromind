using AgroMind.GP.APIs.DTOs;
using AgroMind.GP.Core.Entities.ProductModule;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Core.Specification;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgroMind.GP.APIs.Controllers
{

	public class ProductController : APIbaseController
	{
		private readonly IGenericRepositories<Product, int> _productrepo;
		

		public IMapper Mapper { get; }

		public ProductController(IGenericRepositories<Product,int> Productrepo ,IMapper mapper)
		{
			_productrepo = Productrepo;
			
			Mapper = mapper;
		}


		//ActionResult<T> and IActionResult are used as return types for controller actions
		//<ActionResult<IEnumerable<Product>> // Returning a data type with possible status codes
		//IActionResult //Returning multiple response types (Ok(), NotFound(), etc.)

		//Get All
		[HttpGet("GetProducts")]
		public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
		{
			var Spec = new ProductWithBrandAndCategorySpec();
			var products = await _productrepo.GetAllWithSpecASync(Spec);
			var mappedproducts=Mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductDTO>>(products);
			return Ok(mappedproducts);

		}

		//Get By Id
		[HttpGet("GetProductById/{id}")]
		public async Task<ActionResult<Product>> GetProductById(int id)
		{
			var spec = new ProductWithBrandAndCategorySpec(id);
			var product = await _productrepo.GetByIdAWithSpecAsync(spec);
			if (product == null)
			{
				return NotFound();
			}

			return Ok(product);
		}
		//Add without auto Mapper
		//[HttpPost]

		//public async Task<ActionResult<Product>> AddProduct (Product product)
		//{
		//    await _productrepo.AddAsync(product);
		//	return Ok(product);
		//}
		//Add


		[HttpPost("AddProduct")]
		public async Task<ActionResult<ProductDTO>> AddProduct(ProductDTO productDto)
		{
			var product = Mapper.Map<Product>(productDto);
			await _productrepo.AddAsync(product);

			var resultDto = Mapper.Map<ProductDTO>(product);
			return CreatedAtAction(nameof(GetProductById), new { id = resultDto.Id }, resultDto);
		}

		//Update

		// Update a product
		[HttpPut("UpdateProduct/{id}")]
		public async Task<IActionResult> UpdateProduct(int id, ProductDTO productDto)
		{
			if (id != productDto.Id)
			{
				return BadRequest();
			}

			var spec = new ProductWithBrandAndCategorySpec(id);
			var existingProduct = await _productrepo.GetByIdAWithSpecAsync(spec);

			if (existingProduct == null)
			{
				return NotFound();
			}

			Mapper.Map(productDto, existingProduct); // Map DTO to existing entity
		    await _productrepo.UpdateAsync(existingProduct);

			return NoContent(); // 204 No Content
		}



		//Delete

		[HttpDelete("DeleteProduct/{id}")]
		public async Task<IActionResult> DeleteProduct(int id)
		{
			var spec = new ProductWithBrandAndCategorySpec(id);
			var product = await _productrepo.GetByIdAWithSpecAsync(spec);

			if (product == null)
			{
				return NotFound();
			}

			await _productrepo.DeleteAsync(product);
			return NoContent(); // 204 No Content
		}


	}

}
