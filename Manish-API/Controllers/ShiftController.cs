using Microsoft.AspNetCore.Mvc;
using Manish_API.Model;
using System.Collections.Generic;
using System.Linq;
using Manish_API.Enum;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ShiftController : ControllerBase
	{
		private static List<Shift> shifts = new List<Shift>();

		[HttpGet]
		[Route("GetShifts")]
		public IActionResult GetShifts()
		{
			return Ok(shifts);
		}

		[HttpPost]
		[Route("AddShift")]
		public IActionResult AddShift([FromBody] Shift shift)
		{
			if (shift == null)
			{
				return BadRequest("Shift is null");
			}

			if (!System.Enum.IsDefined(typeof(WorkDays), shift.Day))
			{
				return BadRequest("Invalid day value");
			}

			shifts.Add(shift);
			return Ok(shift);
		}
	}
}
