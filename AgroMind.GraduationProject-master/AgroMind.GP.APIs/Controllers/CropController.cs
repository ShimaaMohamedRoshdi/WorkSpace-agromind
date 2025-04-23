using AgroMind.GP.APIs.DTOs;
using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Core.Specification;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AgroMind.GP.APIs.Controllers
{
	
	[Route("api/[controller]")]
	[ApiController]

	//[Authorize(Roles = "AgriculturalExpert")]
	public class CropController : APIbaseController
	{
		private readonly IGenericRepositories<Crop, int> _croprepo;
		private readonly IMapper _mapper;

		public CropController(IGenericRepositories<Crop, int> croprepo, IMapper mapper)
		{
			_croprepo = croprepo;
			_mapper = mapper;
		}


		//Get All
		[HttpGet("GetAllCrops")]
		public async Task<ActionResult<IReadOnlyList<Crop>>> GetCrops()
		{
			var Spec = new CropSpecification();
			var crops = await _croprepo.GetAllWithSpecASync(Spec);
			var cropDtos = _mapper.Map<List<CropDto>>(crops);
			return Ok(cropDtos);

		}

		//Get By Id
		[HttpGet("GetCropById/{id}")]
		public async Task<ActionResult<Crop>> GetCroptById([FromRoute] int id)
		{
			var spec = new CropSpecification(id);
			var crop = await _croprepo.GetByIdAWithSpecAsync(spec);
			var cropDtos = _mapper.Map<CropDto>(crop);
			return Ok(cropDtos);
		}

		//Add

		[HttpPost("AddCrop")]
		public async Task<ActionResult<CropDto>> AddCrop([FromBody] CropDto cropDto)
		{
			// Deserialize the stages from JSON
			if (!string.IsNullOrEmpty(cropDto.StagesJson)) // Assuming you'll add a StagesJson property to CropDto
			{
				cropDto.Stages = JsonConvert.DeserializeObject<List<CropStageDto>>(cropDto.StagesJson);
			}

			var crop = _mapper.Map<Crop>(cropDto);
			await _croprepo.AddAsync(crop);

			var resultDto = _mapper.Map<CropDto>(crop);
			return Ok(resultDto);
		}


		//Update

		[HttpPut("UpdateCrop/{id}")]
		public async Task<IActionResult> UpdateCrop([FromRoute] int id, [FromBody] CropDto cropDto)
		{
			//if (id != cropDto.Id)
			//{
			//	return BadRequest();
			//}

			var spec = new CropSpecification(id);
			var existingcrop = await _croprepo.GetByIdAWithSpecAsync(spec);

			if (existingcrop == null)
			{
				return NotFound();
			}

			_mapper.Map(cropDto, existingcrop); // Map DTO to existing entity
			await _croprepo.UpdateAsync(existingcrop);

			return Ok(); // 204 No Content
		}



		//Delete

		[HttpDelete("DeleteCrop/{id}")]
		public async Task<IActionResult> DeleteCrop([FromRoute] int id)
		{
			var spec = new CropSpecification(id);
			var crop = await _croprepo.GetByIdAWithSpecAsync(spec);

			if (crop == null)
			{
				return NotFound();
			}

			await _croprepo.DeleteAsync(crop);
			return NoContent(); // 204 No Content
		}

	}

	//POST	Create	Body (JSON)	[FromBody]

	//PUT	Update	Route (id) + Body	[FromRoute] + [FromBody]

	//DELETE	Delete	Route (id)	[FromRoute]

	//GET	Read / Fetch	Route or Query String	[FromRoute] or [FromQuery]

}
