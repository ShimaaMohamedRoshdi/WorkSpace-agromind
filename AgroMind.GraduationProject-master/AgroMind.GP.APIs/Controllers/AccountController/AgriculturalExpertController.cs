using AgroMind.GP.APIs.DTOs;
using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Core.Specification;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AgroMind.GP.APIs.Controllers.AccountController
{
	//[Authorize(Roles = "AgriculturalExpert")]
	public class AgriculturalExpertController : APIbaseController
	{

		//private readonly IGenericRepositories<Crop, int> _croprepo;
		//private readonly IGenericRepositories<CropStage, int> _stagerepo;
		//private readonly IMapper _mapper;

		//private readonly  IGenericRepositories<Step, int> _Steprepo;

		//public AgriculturalExpertController(IGenericRepositories<Crop, int> croprepo, IGenericRepositories<CropStage, int> stagerepo, IGenericRepositories<Step, int> steprepo, IMapper mapper)
		//{
		//	_croprepo = croprepo;
		//	_stagerepo = stagerepo;
		//	_Steprepo = steprepo;
		//	_mapper = mapper;
		//}


		////Get All
		//[HttpGet]
		//public async Task<ActionResult<IEnumerable<Crop>>> GetCrops()
		//{
		//	var Spec = new CropSpecification();
		//	var crops = await _croprepo.GetAllWithSpecASync(Spec);
		//	return Ok(crops);

		//}

		////Get By Id Crop
		//[HttpGet("{id}")]
		//public async Task<ActionResult<Crop>> GetCroptById(int id)
		//{
		//	var spec = new CropSpecification(id);
		//	var crop = await _croprepo.GetByIdAWithSpecAsync(spec);
		//	return Ok(crop);
		//}

		////Add Crop

		//[HttpPost("AddCrop")]
		//public async Task<ActionResult<CropDto>> AddCrop(CropDto cropDto)
		//{
		//	var crop = _mapper.Map<Crop>(cropDto);
		//	await _croprepo.AddAsync(crop);

		//	var resultDto = _mapper.Map<CropDto>(crop);
		//	return CreatedAtAction(nameof(GetCroptById), new { id = resultDto.Id }, resultDto);
		//}

		////AddStage

		//[HttpPost("AddStage")]
		//public async Task<ActionResult<CropStageDto>> AddStage(CropStageDto stageDto)
		//{
		//	if (stageDto == null )
		//	{
		//		return BadRequest("Invalid stage data.");
		//	}
		//	var stage = _mapper.Map<CropStage>(stageDto);
		//	await _stagerepo.AddAsync(stage);

		//	var resultDto = _mapper.Map<CropStageDto>(stage);
		//	return  Ok(resultDto);
		//}

		////Add Step

		//[HttpPost("AddStep")]
		//public async Task<ActionResult<StepDto>> AddStep(StepDto stepDto)
		//{

		//	if (stepDto == null )
		//	{
		//		return BadRequest("Invalid step data.");
		//	}

		//	var step = _mapper.Map<Step>(stepDto);
		//	await _Steprepo.AddAsync(step);

		//	var resultDto = _mapper.Map<StepDto>(step);
		//	return Ok(resultDto); 

		//}
		////Update

		//[HttpPut("{id}")]
		//public async Task<IActionResult> UpdateCrop(int id, CropDto cropDto)
		//{
		//	if (id != cropDto.Id)
		//	{
		//		return BadRequest();
		//	}

		//	var spec = new CropSpecification(id);
		//	var existingcrop = await _croprepo.GetByIdAWithSpecAsync(spec);

		//	if (existingcrop == null)
		//	{
		//		return NotFound();
		//	}

		//	_mapper.Map(cropDto, existingcrop); // Map DTO to existing entity
		//	_croprepo.Update(existingcrop);

		//	return NoContent(); // 204 No Content
		//}



		////Delete

		//[HttpDelete("{id}")]
		//public async Task<IActionResult> DeleteCrop(int id)
		//{
		//	var spec = new CropSpecification(id);
		//	var crop = await _croprepo.GetByIdAWithSpecAsync(spec);

		//	if (crop == null)
		//	{
		//		return NotFound();
		//	}

		//	_croprepo.Delete(crop);
		//	return NoContent(); // 204 No Content
		//}

	}

}
