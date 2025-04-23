namespace AgroMind.GP.Core.Entities.Identity
{
	public class AgriculturalExpert : AppUser
	{
		public string Specialization { get; set; }

		public int ExperienceYears { get; set; }

		//if the expert has fixed available hours each day( 9 AM - 12 PM & 3 PM - 6 PM),
		//List <TimeSpan> for start and end times.
		public List<TimeSpan> AvailableHours { get; set; } = new List<TimeSpan>();

		public int ExpertRating { get; set; }
		public string RegionCovered { get; set; }

		public string PreferedCrops { get; set; }


		// Navigation properties
		//public ICollection<Consultation> Consultations { get; set; } = new HashSet<Consultation>();


	}
}
