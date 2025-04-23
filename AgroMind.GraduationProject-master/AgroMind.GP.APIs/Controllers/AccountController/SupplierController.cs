using AgroMind.GP.Core.Entities.ProductModule;
using AgroMind.GP.Core.Repositories.Contract;
using AgroMind.GP.Repository.Data.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgroMind.GP.APIs.Controllers.AccountController
{
	
	public class SupplierController : APIbaseController
	{
		

		public SupplierController(IGenericRepositories<Product,int> repositories)
		{
			
		}
	}
}
