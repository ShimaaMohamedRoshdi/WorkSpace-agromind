using AgroMind.GP.Core.Entities.Identity;
using System.Text.Json.Serialization;

namespace AgroMind.GP.Core.Entities
{
	public class Crop : BaseEntity<int>
	{

		public string CropName { get; set; }


		public string? CropDescription { get; set; } // Changed from "Description" to avoid conflict
		public string? PictureUrl { get; set; } // Nullable to match frontend `cropImage`

		public string? OptionalLink { get; set; }
		public decimal TotalCost { get; set; } // Calculated sum of stage costs
		public string? FarmerId { get; set; }
		[JsonIgnore] // Prevent infinite loop during serialization
		public Farmer? Farmer { get; set; }

		public int? LandId { get; set; }
		public Land? Land { get; set; }

		
		public List<CropStage> Stages { get; set; } = new List<CropStage>(); // Changed to List<>

		///Remove?
		public string? CropType { get; set; }

		public DateTime? plantingDate { get; set; }//list who the crop that will  //remove this add start and end date

		public string? LandPlantedType { get; set; }

		public string? AreaPlanted { get; set; }

		public string? CropHealthStatus { get; set; }// remove

		


	}
}
