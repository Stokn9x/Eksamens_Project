using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Manish_API.Model;
using Manish_API.Enum;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FoodMenuController : ControllerBase
	{
		[HttpPost]
		[Route("AddFoodItem")]
		public IActionResult AddFoodItem([FromBody] Product product)
		{
			return Ok("Food item added successfully");
		}

		[HttpGet]
		[Route("GetFoodItem")]
		public IActionResult GetFoodItem()
		{
			return Ok("Food item details");
		}

		[HttpPut]
		[Route("UpdateFoodItem")]
		public IActionResult UpdateFoodItem([FromBody] Product product)
		{
			return Ok("Food item updated successfully");
		}

		[HttpDelete]
		[Route("DeleteFoodItem")]
		public IActionResult DeleteFoodItem([FromBody] Product product)
		{
			return Ok("Food item deleted successfully");
		}

		[HttpGet]
		[Route("GetFoodItems")]
		public IActionResult GetFoodItems()
		{
			return Ok("Food items");
		}

		[HttpGet]
		[Route("GetMenuData")]
		public IActionResult GetMenuData()
		{
			var products = new List<Product>
			{
				new Product("Bruschetta", "ManishImage", "Grilled bread with tomatoes", new List<string> { "Bread", "Tomatoes", "Garlic" }, 5.0, 10, FoodCategory.Starters),
				new Product("Garlic Bread", "ManishImage", "Bread with garlic and butter", new List<string> { "Bread", "Garlic", "Butter" }, 4.0, 15, FoodCategory.Starters),
				new Product("Margherita Pizza", "ManishImage", "Classic pizza with tomatoes and cheese", new List<string> { "Dough", "Tomatoes", "Cheese" }, 10.0, 20, FoodCategory.MainCourse),
				new Product("Spaghetti Carbonara", "ManishImage", "Pasta with eggs, cheese, and bacon", new List<string> { "Pasta", "Eggs", "Cheese", "Bacon" }, 12.0, 25, FoodCategory.MainCourse),
				new Product("Tiramisu", "ManishImage", "Coffee-flavored Italian dessert", new List<string> { "Coffee", "Mascarpone", "Cocoa" }, 6.0, 30, FoodCategory.Deserts),
				new Product("Panna Cotta", "ManishImage", "Creamy dessert with berry sauce", new List<string> { "Cream", "Sugar", "Berries" }, 5.0, 35, FoodCategory.Deserts)
			};

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
	}
}
