using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Manish_API.Model;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
		[HttpPost]
		[Route("AddUser")]
		public IActionResult AddUser([FromBody] Customer customer)
		{
			return Ok("User added successfully");
		}

		[HttpGet]
		[Route("GetUser")]
		public IActionResult GetUser()
		{
			return Ok("User details");
		}

		[HttpPut]
		[Route("UpdateUser")]
		public IActionResult UpdateUser([FromBody] Customer customer)
		{
			return Ok("User updated successfully");
		}

		[HttpDelete]
		[Route("DeleteUser")]
		public IActionResult DeleteUser([FromBody] Customer customer)
		{
			return Ok("User deleted successfully");
		}
	}
}
