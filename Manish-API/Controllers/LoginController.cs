using Microsoft.AspNetCore.Mvc;
using Manish_API.Database;
using Manish_API.Model;
using System.Linq;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class LoginController : ControllerBase
	{
		private readonly AppDbContext _context;

		public LoginController(AppDbContext context)
		{
			_context = context;
		}

		[HttpPost]
		[Route("Login")]
		public IActionResult Login([FromBody] Admin admin)
		{
			var adminUser = _context.Admins.FirstOrDefault(a => a.Username == admin.Username && a.Password == admin.Password);
			if (adminUser != null)
			{
				return Ok("Admin login successful");
			}

			var customer = _context.Customers.FirstOrDefault(c => c.Username == admin.Username && c.Password == admin.Password);
			if (customer != null)
			{
				return Ok("Customer login successful");
			}

			return BadRequest("Invalid credentials");
		}
	}
}
