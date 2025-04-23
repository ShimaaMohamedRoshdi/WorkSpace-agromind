using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AgroMind.GP.Core.Entities
{
	public class Step : BaseEntity<int>
	{
		public string StepName { get; set; } // Matches frontend `description`
		public string? Tool { get; set; }
		public string? ToolImage { get; set; } // Matches frontend `toolImage`

		public int? DurationDays { get; set; } // Changed from DateTime? to int? (days)

		public string? Fertilizer { get; set; } // Matches frontend `fertilizer`
		public int? FertilizerDuration { get; set; } // Matches frontend `fertilizerDuration`

		public decimal Cost { get; set; } // Ensure cost is decimal

		public string? Description { get; set; }
		public int? StageId { get; set; }
		[JsonIgnore]
		public CropStage? Stage { get; set; }

		

	}

}
