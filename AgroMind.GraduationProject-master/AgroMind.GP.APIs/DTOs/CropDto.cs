namespace AgroMind.GP.APIs.DTOs
{
	public class CropDto
	{
		public int? Id { get; set; }
		public string CropName { get; set; }
		public string? Description { get; set; }
		public string? CropImage { get; set; } // Matches frontend's cropImage (URL)
		public List<CropStageDto>? Stages { get; set; } = new List<CropStageDto>(); // List of stages
		public string? OptionalLink { get; set; }
		public decimal? TotalCost { get; set; } // Calculated sum of stage costs

		// Add this property to receive the JSON string from the frontend
		public string? StagesJson { get; set; }

	}
}
