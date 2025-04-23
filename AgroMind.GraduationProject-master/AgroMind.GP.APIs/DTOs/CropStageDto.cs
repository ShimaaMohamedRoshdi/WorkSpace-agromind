namespace AgroMind.GP.APIs.DTOs
{
	public class CropStageDto
	{
		public int Id { get; set; }
		public string StageName { get; set; } // Matches frontend's stage
		public string? Description { get; set; }
		public string? PictureUrl { get; set; }
		public int? Duration { get; set; } // Stored as an integer (days)
		public decimal Cost { get; set; } // Stage cost
		public List<StepDto> Steps { get; set; } = new List<StepDto>(); // List of steps
		public string? Stage { get; set; } // Add Stage
		public string? Link { get; set; } // Add Link


	}
}
