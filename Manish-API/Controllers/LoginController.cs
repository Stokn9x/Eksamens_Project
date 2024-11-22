using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Manish_API.Model;
using System.Collections.Generic;
using System.Linq;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class LoginController : ControllerBase
	{
		private static List<Admin> admins = new List<Admin>
		{
			new Admin("admin", "admin")
		};

		private static List<Customer> customers = new List<Customer>
		{
			new Customer("user1", "password1", "John Doe", "john@example.com", "1234567890", "123 Main St", 30),
			new Customer("user2", "password2", "Jane Smith", "jane@example.com", "0987654321", "456 Elm St", 25)
		};

		[HttpPost]
		[Route("Login")]
		public IActionResult Login([FromBody] Admin admin)
		{
			var adminUser = admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password);
			if (adminUser != null)
			{
				return Ok("Admin login successful");
			}

			var customer = customers.FirstOrDefault(c => c.Username == admin.Username && c.Password == admin.Password);
			if (customer != null)
			{
				return Ok("Customer login successful");
			}

			return BadRequest("Invalid credentials");
		}
	}
}
