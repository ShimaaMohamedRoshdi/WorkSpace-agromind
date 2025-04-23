using AgroMind.GP.Core.Entities;
using AgroMind.GP.Core.Entities.Identity;
using AgroMind.GP.Core.Repositories.Contract;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Pipelines.Sockets.Unofficial;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AgroMind.GP.Repository.Repositories
{
	//JsonSerializer: Built-in .NET tool for handling JSON operations.


   //KeyDeleteAsync: Deletes a Redis key
   //StringGetAsync: Retrieves the value of a key as a string
   //StringSetAsync: Stores a key-value pair, with an optional expiration time
	public class CartRepository : ICartRepository
	{
		private readonly IDatabase _database;

		//IConnectionMultiplexer: This is an interface provided by StackExchange.Redis Package for interacting With redius
		//It manages connections to a Redis .
		public CartRepository(IConnectionMultiplexer redis) //Ask CLR for Object for Class Implement interface IConnectionMultiplexer
		{
			_database = redis.GetDatabase();//gets an interface to a Redis database

		}

		public async Task<bool> DeleteCartAsync(string FarmerId)
		{
			if (string.IsNullOrWhiteSpace(FarmerId))
				throw new ArgumentException("Cart ID cannot be null or empty.", nameof(FarmerId));

			return await _database.KeyDeleteAsync(FarmerId); //KeyDeleteAsync bta5od rediusKey(CartId)
														   //Redis keys represent the stored cart objects
		}

		//Redis Values >- Stored as Json
		public async Task<Cart?> GetCartAsync(string FarmerId)
		{
			if (string.IsNullOrWhiteSpace(FarmerId))
				throw new ArgumentException("Cart ID cannot be null or empty");

			var cart = await _database.StringGetAsync(FarmerId); //redis Value  //as json
																 // convert json To Cart
																 //if (basket.IsNull) return null; // Law El id el b3toh Not there
																 //else convert json into object or valueType
			if (cart.IsNullOrEmpty)
				return new Cart(FarmerId); // Return empty cart if not found	
			try
			{
				return JsonSerializer.Deserialize<Cart>(cart);  //convert json into object or valueType
			}
			catch (JsonException ex)
			{
				// Log the exception 
				Console.WriteLine($"Error deserializing cart data: {ex.Message}");
				return null;
			}
		}

		public async Task<Cart?> RemoveFromCart(string FarmerId, int ItemId)
		{
			var Cart= await GetCartAsync(FarmerId);
			if (Cart is null) return null;

			bool itemRemoved = Cart.Items.RemoveAll(item => item.Id == ItemId) > 0;

			return itemRemoved ? await UpdateCartAsync(Cart) : Cart;
			//return Cart; // it means No Changes of Item is not found
		}

		//Updates cart or creates if it doesn't exist
		public async Task<Cart?> UpdateCartAsync(Cart cart)
		{

			if (cart == null || string.IsNullOrEmpty(cart.FarmerId))
				throw new ArgumentException("Invalid Cart Data");
			try
			{
				var CartJson = JsonSerializer.Serialize(cart); //convert from object to Json to store in redis
				bool isSaved = await _database.StringSetAsync(cart.FarmerId, CartJson, TimeSpan.FromDays(5)); //Stores the serialized JSON string in Redis //RedisKey>id bta3 el cart ,jsoncart >"el cart after serialize
																											  //expire time for object
				return isSaved ?  await GetCartAsync(cart.FarmerId): null;  //get cart after update or create																		//StringSetAsync>- b t return boolean
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error updating cart: {ex.Message}");
				return null;
			}

		}

	}
}
