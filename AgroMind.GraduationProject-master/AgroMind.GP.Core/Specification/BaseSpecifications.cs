using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Specifications.Contract;
using System.Linq.Expressions;

namespace AgroMind.GP.Core.Specification
{
	public class BaseSpecifications<TEntity, Tkey> : ISpecification<TEntity, Tkey> where TEntity : BaseEntity<Tkey>
	{


		//Automatic Properties


		public Expression<Func<TEntity, bool>> Criteria { get; set; }
		public List<Expression<Func<TEntity, object>>> Includes { get; set; } = new List<Expression<Func<TEntity, object>>>();


		//Get All
		public BaseSpecifications()
		{
			//Includes = new List<Expression<Func<TEntity, object>>>();
		}

		//Get By ID
		public BaseSpecifications(Expression<Func<TEntity, bool>> criteriaExpression)
		{
			Criteria = criteriaExpression;
			//Includes=new List<Expression<Func<TEntity,object>>>();	
		}

	}
}
