using AgroMind.GP.APIs.DTOs;
using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Repositories.Contract;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgroMind.GP.APIs.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	//[Authorize(Roles = "AgriculturalExpert")]
	public class StageController : ControllerBase
	{
		private readonly IGenericRepositories<CropStage, int> _stagerepo;
		private readonly IMapper _mapper;

		public StageController(IGenericRepositories<CropStage,int>stagerepo , IMapper mapper)
		{
			_stagerepo = stagerepo;
			_mapper = mapper;
		}


		//AddStage

		[HttpPost("AddStage")]
		public async Task<ActionResult<CropStageDto>> AddStage([FromBody] CropStageDto stageDto)
		{
			if (stageDto == null)
			{
				return BadRequest("Invalid stage data.");
			}
			var stage = _mapper.Map<CropStage>(stageDto);
			await _stagerepo.AddAsync(stage);

			var resultDto = _mapper.Map<CropStageDto>(stage);
			return Ok(resultDto);
		}
	}
}
