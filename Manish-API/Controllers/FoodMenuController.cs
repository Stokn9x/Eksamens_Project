using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Manish_API.Model;

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
	}
}
