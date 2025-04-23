using AgroMind.GP.Core.Entities.Identity;

namespace AgroMind.GP.Core.Entities
{
	public class Land : BaseEntity<int>
	{

		public string Name { get; set; }
		public double? AreaSize { get; set;}
		
		public string? SoilType { get; set; }

		public string? waterSource { get; set; }

		public string? PictureUrl { get; set; }

		public ICollection<Crop> Crops { get; set; } = new HashSet<Crop>();

		public Farmer? Farmer { get; set; }

		public string? FarmerId { get; set; }

		public string status { get; set; }

		public string weatherCondition { get; set; }

		public string IrrigationType { get; set; }
		public DateTime StartDate { get; set; }
		public float Latitude { get; set; }
		public float Longitude { get; set; }

	}

}
