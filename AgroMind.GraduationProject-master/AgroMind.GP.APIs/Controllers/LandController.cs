using AgroMind.GP.APIs.DTOs;
using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Entities.ProductModule;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Core.Specification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgroMind.GP.APIs.Controllers
{

	public class LandController : APIbaseController
	{
		private readonly IGenericRepositories<Land, int> _landrepo;

		public LandController(IGenericRepositories<Land, int> landrepo)
		{
			_landrepo = landrepo;
		}

		//Get All
		[HttpGet("GetLands")]
		public async Task<ActionResult<IReadOnlyList<Land>>> GetLands()
		{
			var SpecLand = new LandSpecification();
			var lands = await _landrepo.GetAllWithSpecASync(SpecLand);
			return Ok(lands);

		}

		//Get By Id
		[HttpGet("getlandById/{id}")]
		public async Task<ActionResult<Land>> GetLandById(int id)
		{
			var spec = new LandSpecification(id);
			var land = await _landrepo.GetByIdAWithSpecAsync(spec);
			return Ok(land);
		}
		//AddLand
		[HttpPost("AddLand")]
		public async Task<ActionResult<Land>> AddLand(Land land)
		{
			if (land == null) return BadRequest("Invalid land data.");
			await _landrepo.AddAsync(land);
			return Ok(new { Message = "Land added successfully" });
		}

		//Update Land
		[HttpPut("UpdateLand/{id}")]
		public async Task< IActionResult> UpdateLand(int id, Land updatedLand)
		{
			if (id != updatedLand.Id) return BadRequest("Land ID mismatch ");
			var spec = new LandSpecification(id);
			var existingLand = _landrepo.GetByIdAWithSpecAsync(spec);
			if (existingLand == null) return NotFound("Land with ID {id} not found.");

			await _landrepo.UpdateAsync(updatedLand);
			return Ok("Land updated successfully.");
		}

		// DELETE 
		[HttpDelete("DeleteLand/{id}")]
		public async Task<IActionResult> DeleteLand(int id)
		{
			var spec = new LandSpecification(id);
			var land = await _landrepo.GetByIdAWithSpecAsync(spec);
			 
			if(land == null)
			 
				return NotFound();
		    	
			await _landrepo.DeleteAsync(land);
			return Ok($"Land with ID {id} deleted successfully.");
		}

	}
}
