using Microsoft.AspNetCore.Mvc;
using Manish_API.Model;
using Manish_API.Enum;
using Manish_API.Database;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class FoodMenuController : ControllerBase
	{
		private readonly AppDbContext _context;

		public FoodMenuController(AppDbContext context)
		{
			_context = context;
		}

		[HttpPost]
		[Route("AddFoodItem")]
		public IActionResult AddFoodItem(string name, string productImage, string description, string ingredients, double price, int productSales, string foodCategory)
		{
			var ingredientList = ingredients.Split(',').Select(i => i.Trim()).ToList();
			if (!System.Enum.TryParse(foodCategory, out FoodCategory category))
			{
				return BadRequest("Invalid food category");
			}

			var product = new Product(name, productImage, description, ingredientList, price, productSales, category, false);
			_context.Products.Add(product);
			_context.SaveChanges();
			return Ok("Food item added successfully");
		}

		[HttpGet]
		[Route("GetFoodItems")]
		public IActionResult GetFoodItems()
		{
			var foodItems = _context.Products
				.Select(p => new
				{
					id = p.id,
					name = p.Name,
					description = p.Description,
					price = p.Price,
					ingredients = p.ingredients,
					foodCategory = p.FoodCategory,
					isActive = p.IsActive
				})
				.ToList();

			return new JsonResult(foodItems);
		}

		[HttpGet]
		[Route("GetMenuData")]
		public IActionResult GetMenuData()
		{
			var menuData = _context.Products
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
						ingredients = p.ingredients,
						isActive = p.IsActive
					}).ToList()
				})
				.ToList();

			return new JsonResult(menuData);
		}

		[HttpPut]
		[Route("UpdateFoodItem")]
		public IActionResult UpdateFoodItem(Guid id, string name, string productImage, string description, string ingredients, double price, int productSales, string foodCategory, bool isActive)
		{
			var product = _context.Products.FirstOrDefault(p => p.id == id);
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
			product.IsActive = isActive;

			_context.SaveChanges();
			return Ok("Food item updated successfully");
		}

		[HttpDelete]
		[Route("DeleteFoodItem/{id}")]
		public IActionResult DeleteFoodItem(Guid id)
		{
			var product = _context.Products.FirstOrDefault(p => p.id == id);
			if (product == null)
			{
				return NotFound("Food item not found");
			}

			_context.Products.Remove(product);
			_context.SaveChanges();
			return Ok("Food item deleted successfully");
		}

		[HttpPut]
		[Route("ActivateFoodItem/{id}")]
		public IActionResult ActivateFoodItem(int id)
		{
			var product = _context.Products.Find(id);
			if (product == null)
			{
				return NotFound(new { message = "Product not found" });
			}

			product.IsActive = true;
			_context.SaveChanges();

			return Ok(new { message = "Product activated successfully", product });
		}

		[HttpPut]
		[Route("DeactivateFoodItem/{id}")]
		public IActionResult DeactivateFoodItem(int id)
		{
			var product = _context.Products.Find(id);
			if (product == null)
			{
				return NotFound(new { message = "Product not found" });
			}

			product.IsActive = false;
			_context.SaveChanges();

			return Ok(new { message = "Product deactivated successfully", product });
		}


	}
}
