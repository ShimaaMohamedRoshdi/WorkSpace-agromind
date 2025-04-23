using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Entities.Identity;
using AgroMind.GP.Core.Repositories.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgroMind.GP.APIs.Controllers.AccountController
{
	
	[Authorize (Roles ="Farmer")]
	public class FarmerController : APIbaseController
	{
		private readonly ICartRepository _cartRepository;
		public FarmerController(ICartRepository cartRepository)
		{
			_cartRepository = cartRepository;
		}

		//Get or ReCreate Cart
		[HttpGet("{FarmerId}")]
		public async Task<ActionResult<Cart>> GetCart(string Farmerid) //<ActionResult<Cart> : will return Cart
		{
			var cart = await _cartRepository.GetCartAsync(Farmerid); //Law Null don't have cart with this id
			if (cart is null) //kant mawogode and it deleted because expire date
				return new Cart(Farmerid); //reCreate > Same Cart wit same Id el kant Mawgoda
			return Ok(cart);
		}

		//Update or Create New Cart
		[HttpPost("UpdateCart")]
		public async Task<ActionResult<Cart>> UpdateCart(Cart cart)
		{
			var CreatedOrUpdatedCart = await _cartRepository.UpdateCartAsync(cart);
			//if (CreatedOrUpdatedCart is null) return BadRequest(new BadRequestObjectResult(400)); //Frontend Problem /not create and not update
			//Return BadRequest() for frontend not User 		    
			return Ok(CreatedOrUpdatedCart);
		}

		//Delete Cart
		[HttpDelete("{FarmerId}")]
		public async Task<ActionResult<bool>> DeleteCart(string farmerid) //Deleted or No
		{
			return await _cartRepository.DeleteCartAsync(farmerid);
		}

		[HttpDelete("RemoveFromCart")]

		public async Task<ActionResult<Cart>> RemoveFromCart(string FarmerId, int ItemId)
		{
			var cart = await _cartRepository.RemoveFromCart(FarmerId, ItemId);
			if (cart is null)
				return NotFound();
			return Ok(cart);
		}


	}
}

	