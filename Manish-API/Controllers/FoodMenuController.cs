using Microsoft.AspNetCore.Mvc;
using Manish_API.Model;
using Manish_API.Enum;
using System.Collections.Generic;
using System.Linq;
using System;


namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FoodMenuController : ControllerBase
	{
		private static List<Product> products = new List<Product>
		{
			new Product("Bruschetta", "ManishImage", "Grilled bread with tomatoes", new List<string> { "Bread", "Tomatoes", "Garlic" }, 5.0, 10, FoodCategory.Starters),
			new Product("Garlic Bread", "ManishImage", "Bread with garlic and butter", new List<string> { "Bread", "Garlic", "Butter" }, 4.0, 15, FoodCategory.Starters),
			new Product("Margherita Pizza", "ManishImage", "Classic pizza with tomatoes and cheese", new List<string> { "Dough", "Tomatoes", "Cheese" }, 10.0, 20, FoodCategory.MainCourse),
			new Product("Spaghetti Carbonara", "ManishImage", "Pasta with eggs, cheese, and bacon", new List<string> { "Pasta", "Eggs", "Cheese", "Bacon" }, 12.0, 25, FoodCategory.MainCourse),
			new Product("Tiramisu", "ManishImage", "Coffee-flavored Italian dessert", new List<string> { "Coffee", "Mascarpone", "Cocoa" }, 6.0, 30, FoodCategory.Deserts),
			new Product("Panna Cotta", "ManishImage", "Creamy dessert with berry sauce", new List<string> { "Cream", "Sugar", "Berries" }, 5.0, 35, FoodCategory.Deserts)
		};

		[HttpPost]
		[Route("AddFoodItem")]
		public IActionResult AddFoodItem(string name, string productImage, string description, string ingredients, double price, int productSales, string foodCategory)
		{
			var ingredientList = ingredients.Split(',').Select(i => i.Trim()).ToList();
			if (!System.Enum.TryParse(foodCategory, out FoodCategory category))
			{
				return BadRequest("Invalid food category");
			}

			var product = new Product(name, productImage, description, ingredientList, price, productSales, category);
			products.Add(product);
			return Ok("Food item added successfully");
		}

		[HttpGet]
		[Route("GetFoodItems")]
		public IActionResult GetFoodItems()
		{
			return Ok(products);
		}

		[HttpGet]
		[Route("GetMenuData")]
		public IActionResult GetMenuData()
		{
			var menuData = products
				.GroupBy(p => p.FoodCategory)
				.Select(g => new
				{
					category = g.Key.ToString(),
					items = g.Select(p => new
					{
						name = p.Name,
						description = p.Description,
						price = $"${p.Price}",
						image = p.ProductImage,
						ingredients = p.ingredients
					}).ToList()
				})
				.ToList();

			return new JsonResult(menuData);
		}

		[HttpPut]
		[Route("UpdateFoodItem")]
		public IActionResult UpdateFoodItem(Guid id, string name, string productImage, string description, string ingredients, double price, int productSales, string foodCategory)
		{
			var product = products.FirstOrDefault(p => p.id == id);
			if (product == null)
			{
				return NotFound("Food item not found");
			}

			var ingredientList = ingredients.Split(',').Select(i => i.Trim()).ToList();
			if (!System.Enum.TryParse(foodCategory, out FoodCategory category))
			{
				return BadRequest("Invalid food category");
			}

			product.Name = name;
			product.ProductImage = productImage;
			product.Description = description;
			product.ingredients = ingredientList;
			product.Price = price;
			product.ProductSales = productSales;
			product.FoodCategory = category;

			return Ok("Food item updated successfully");
		}

		[HttpDelete]
		[Route("DeleteFoodItem/{id}")]
		public IActionResult DeleteFoodItem(Guid id)
		{
			var product = products.FirstOrDefault(p => p.id == id);
			if (product == null)
			{
				return NotFound("Food item not found");
			}

			products.Remove(product);
			return Ok("Food item deleted successfully");
		}
	}
}
