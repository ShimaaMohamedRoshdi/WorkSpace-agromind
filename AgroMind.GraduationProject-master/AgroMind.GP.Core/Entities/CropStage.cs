using System.Text.Json.Serialization;

namespace AgroMind.GP.Core.Entities
{
	public class CropStage : BaseEntity<int>
	{

		public string StageName { get; set; } // Matches frontend `stage`
		public int? Duration { get; set; } // Changed from DateTime? to int? (Number of days)
		public string? Description { get; set; }
		public string? PictureUrl { get; set; }

		public decimal TotalCost { get; set; } // Ensure it is a decimal (Frontend calculates total cost)

		public int? CropId { get; set; }
		[JsonIgnore] // Prevent infinite loop
		public Crop? Crop { get; set; }

		public List<Step> Steps { get; set; } = new List<Step>(); // Changed to List<>

		public string? OptionalLink { get; set; }

	}
}
