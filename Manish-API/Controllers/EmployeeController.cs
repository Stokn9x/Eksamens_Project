using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Manish_API.Model;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class EmployeeController : ControllerBase
	{
		[HttpPost]
		[Route("AddEmployee")]
		public IActionResult AddEmployee([FromBody] Employee employee)
		{
			return Ok("Employee added successfully");
		}

		[HttpGet]
		[Route("GetEmployee")]
		public IActionResult GetEmployee()
		{
			return Ok("Employee details");
		}

		[HttpPut]
		[Route("UpdateEmployee")]
		public IActionResult UpdateEmployee([FromBody] Employee employee)
		{
			return Ok("Employee updated successfully");
		}

		[HttpDelete]
		[Route("DeleteEmployee")]
		public IActionResult DeleteEmployee([FromBody] Employee employee)
		{
			return Ok("Employee deleted successfully");
		}

		[HttpGet]
		[Route("GetEmployeeShift")]
		public IActionResult GetEmployeeShift()
		{
			return Ok("Employee shift details");
		}

		[HttpPost]
		[Route("AddEmployeeShift")]
		public IActionResult AddEmployeeShift([FromBody] Shift shift)
		{
			return Ok("Employee shift added successfully");
		}

		[HttpPut]
		[Route("UpdateEmployeeShift")]
		public IActionResult UpdateEmployeeShift([FromBody] Shift shift)
		{
			return Ok("Employee shift updated successfully");
		}

		[HttpDelete]
		[Route("DeleteEmployeeShift")]
		public IActionResult DeleteEmployeeShift([FromBody] Shift shift)
		{
			return Ok("Employee shift deleted successfully");
		}

		[HttpGet]
		[Route("GetEmployeeAvailableWorkdays")]
		public IActionResult GetEmployeeAvailableWorkdays()
		{
			return Ok("Employee available workdays");
		}
	}
}
