namespace AgroMind.GP.APIs.DTOs
{
	public class StepDto
	{

		public int Id { get; set; }
		public string StepName { get; set; } // Matches frontend's description
		public string? Tool { get; set; }
		public string? ToolImage { get; set; } // New property for frontend's tool image
		public int? DurationDays { get; set; } // Duration for step
		public string? Fertilizer { get; set; } // Matches frontend's fertilizer
		public int? FertilizerDuration { get; set; } // Duration for fertilizer
		public decimal Cost { get; set; } // Cost of step
		public string? Description { get; set; } // Add Description


	}
}
