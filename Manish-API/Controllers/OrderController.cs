using Microsoft.AspNetCore.Mvc;
using Manish_API.Model;
using System.Linq;
using System;
using Manish_API.Database;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class OrderController : ControllerBase
	{
		private readonly AppDbContext _context;

		public OrderController(AppDbContext context)
		{
			_context = context;
		}

		[HttpPost]
		[Route("CreateOrder")]
		public IActionResult CreateOrder([FromBody] Order order)
		{
			if (order == null || order.Products == null || !order.Products.Any())
			{
				return BadRequest(new { message = "Invalid order data" });
			}

			order.Id = Guid.NewGuid();
			order.OrderTime = DateTime.Now;
			_context.Orders.Add(order);
			_context.SaveChanges();

			return Ok(new { message = "Order created successfully", orderId = order.Id });
		}

	}
}
