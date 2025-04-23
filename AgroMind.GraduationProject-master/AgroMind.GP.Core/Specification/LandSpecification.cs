using AgroMind.GP.Core.Entities;

namespace AgroMind.GP.Core.Specification
{
	public class LandSpecification : BaseSpecifications<Land, int>
	{
		//For Get All Crops
		public LandSpecification() : base()
		{
			Includes.Add(L => L.Farmer);
			Includes.Add(L => L.Crops);

		}

		//Get Crop By Id
		public LandSpecification(int id) : base(c => c.Id == id)
		{
		}
	}
}
