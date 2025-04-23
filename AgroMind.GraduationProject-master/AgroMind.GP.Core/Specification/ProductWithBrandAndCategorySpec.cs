using AgroMind.GP.Core.Entities.ProductModule;

namespace AgroMind.GP.Core.Specification
{
	public class ProductWithBrandAndCategorySpec : BaseSpecifications<Product, int>
	{
		//For Get All Products
		public ProductWithBrandAndCategorySpec() : base()
		{
			Includes.Add(p => p.Brand);
			Includes.Add(p => p.Category);
			Includes.Add(p => p.Supplier);
		}

		//Get Product By Id
		public ProductWithBrandAndCategorySpec(int id) : base(p => p.Id == id)
		{
		}
	}
}
