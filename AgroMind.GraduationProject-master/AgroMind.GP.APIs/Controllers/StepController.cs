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
	public class StepController : ControllerBase
	{
		private readonly IGenericRepositories<Step, int> _Steprepo;
		private readonly IMapper _mapper;

		public StepController(IGenericRepositories<Step,int> steprepo,IMapper mapper)
		{
			_Steprepo = steprepo;
			_mapper = mapper;
		}

		//Add Step

		[HttpPost("AddStep")]
		public async Task<ActionResult<StepDto>> AddStep([FromBody]StepDto stepDto)
		{

			if (stepDto == null)
			{
				return BadRequest("Invalid step data.");
			}

			var step = _mapper.Map<Step>(stepDto);
			await _Steprepo.AddAsync(step);

			var resultDto = _mapper.Map<StepDto>(step);
			return Ok(resultDto);

		}

	}
}
