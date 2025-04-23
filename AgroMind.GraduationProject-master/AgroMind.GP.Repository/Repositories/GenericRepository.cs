using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Entities.ProductModule;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Core.Specifications.Contract;
using AgroMind.GP.Repository.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace AgroMind.GP.Repository.Repositories
{
	public class GenericRepository<TEntity, Tkey> : IGenericRepositories<TEntity, Tkey> where TEntity : BaseEntity<Tkey>
	{
		private readonly AgroMindContext _context;

		public GenericRepository(AgroMindContext context)
		{
			_context = context;
		}

		public async Task AddAsync(TEntity entity)
		{
			await _context.Set<TEntity>().AddAsync(entity);
			await _context.SaveChangesAsync();
		}


		public async Task UpdateAsync(TEntity entity)
		{
			_context.Set<TEntity>().Update(entity);
			await _context.SaveChangesAsync();
		}

		
		public async Task DeleteAsync(TEntity entity)
		{
			_context.Set<TEntity>().Remove(entity);
			await _context.SaveChangesAsync();
		}
		
		#region WithoutSpec
		public async Task<IReadOnlyList<TEntity>> GetAllAsync()
		{
			//IF there is NavigationProperty  should be use Include 
			//if (typeof(TEntity) == typeof(Product))

			//	return (IReadOnlyList<TEntity>)await _context.Products.Include(p => p.Brand).Include(p => p.Category).Include(s => s.Supplier).ToListAsync();

			return await _context.Set<TEntity>().ToListAsync(); //Set<> // b t return DBSet of Any Type
		}
		public async Task<TEntity> GetByIdAsync(Tkey id)
		{
			return await _context.Set<TEntity>().FindAsync(id);
		}
		#endregion

		#region withSpec >- Open for Extension Closed for Modification
		public async Task<IReadOnlyList<TEntity>> GetAllWithSpecASync(ISpecification<TEntity, Tkey> spec)
		{
			return await ApplySpecification(spec).ToListAsync();
		}

		public async Task<TEntity> GetByIdAWithSpecAsync(ISpecification<TEntity, Tkey> spec)
		{
			return await ApplySpecification(spec).FirstOrDefaultAsync();
		}

		private IQueryable<TEntity> ApplySpecification(ISpecification<TEntity, Tkey> Spec)
		{
			return SpecificationEvaluator<TEntity, Tkey>.GetQuery(_context.Set<TEntity>(), Spec);
		}
		#endregion

		//public async Task UpdateWithSpecAsync(ISpecification<TEntity, Tkey> spec, Action<TEntity> updateAction)
		//{
		//	var entity = await GetByIdAWithSpecAsync(spec);
		//	if (entity != null)
		//	{
		//		updateAction(entity); // Apply changes
		//		_context.Set<TEntity>().Update(entity);
		//		await _context.SaveChangesAsync(); // Save changes to the database
		//	}
		//}
		//public async Task DeleteWithSpecAsync(ISpecification<TEntity, Tkey> spec)
		//{
		//	var entity = await GetByIdAWithSpecAsync(spec);
		//	if (entity != null)
		//	{
		//		_context.Set<TEntity>().Remove(entity);
		//		await _context.SaveChangesAsync(); // Ensure changes are saved to the database
		//	}
		//}
	}
}
