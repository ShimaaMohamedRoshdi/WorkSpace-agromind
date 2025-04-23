using AgroMind.GP.Core.Entities;
using System.Linq.Expressions;

namespace AgroMind.GP.Core.Specifications.Contract
{
	public interface ISpecification<TEntity, Tkey> where TEntity : BaseEntity<Tkey>
	{

		//dbContext.Products.Where(P=>P.id==id).Include(P=>P.ProductBrand).Include(P=>P.ProductType)

		// 3 Components : EntryPoint (Entity), Where , Include


		//Signature For Property For Where Condition 'Filteration'

		//Expression "Lambda Expression" <Lambda Type> "Delegate"
		//Delegate -> Determine function from any Type [Func,Predicate,Action]
		// I want Delegate to take one Parmeter and Return Boolean -> (Func) 
		public Expression<Func<TEntity, bool>> Criteria { get; set; } //Criteria b t match condition ?


		//Signature For Property For List Of Includes

		public List<Expression<Func<TEntity, object>>> Includes { get; set; }
	}
}
