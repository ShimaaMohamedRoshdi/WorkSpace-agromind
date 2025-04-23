using AgroMind.GP.Core.Entities.ProductModule;

namespace AgroMind.GP.Core.Entities.Identity
{
	public class Supplier : AppUser
	{
		public int inventoryCount { get; set; }
		public ICollection<Product>? Products { get; set; } = new HashSet<Product>(); //M
	}
}
