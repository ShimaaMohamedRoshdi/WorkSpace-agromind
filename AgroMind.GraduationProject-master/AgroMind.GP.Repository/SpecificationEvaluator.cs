using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Specifications.Contract;
using Microsoft.EntityFrameworkCore;

namespace AgroMind.GP.Repository
{

	public static class SpecificationEvaluator<TEntity, TKey> where TEntity : BaseEntity<TKey>
	{
		//Function Will Build Dynamic Query

		//context.Products.Where(P=>P.Id==id as int?).Include(p => p.Brand).Include(p => p.BrandType).FirstOrDefaultAsync(p=>p.Id==id as int ?) as TEntity;

		//IQueryable //Filteration in DB & IEnummerable //Filteration in Application
		public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity, TKey> Spec)
		{
			var Query = inputQuery; // context.Set<T>()

			if (Spec.Criteria is not null) // P=>P.Id==id 
			{
				Query = Query.Where(Spec.Criteria); // context.Set<T>().where (P=>P.Id==id) 
			}

			//p => p.Brand

			//p => p.BrandType

			Query = Spec.Includes.Aggregate(Query, (CurrentQuery, IncludeExpression) => CurrentQuery.Include(IncludeExpression));

			//context.Set<T>().where (P=>P.Id==id) //CurrentQuery
			//Include(p => p.Brand) => IncludeExpression
			//CurrentQuery.Include(p => p.Brand) => CurrentQuery
			//CuurentQuery.Include(p => p.BrandType)
			return Query;
		}
	}
}
