using Microsoft.AspNetCore.Mvc;
using Manish_API.Model;
using System.Collections.Generic;
using System.Linq;
using System;
using Manish_API.Enum;
using Manish_API.Database;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class EmployeeController : ControllerBase
	{
		private readonly AppDbContext _context;

		public EmployeeController(AppDbContext context)
		{
			_context = context;
		}

		[HttpPost]
		[Route("AddEmployee")]
		public IActionResult AddEmployee([FromBody] Employee employee)
		{
			employee.Id = Guid.NewGuid();
			_context.Employees.Add(employee);
			_context.SaveChanges();
			return Ok(employee);
		}

		[HttpGet]
		[Route("GetEmployees")]
		public IActionResult GetEmployees()
		{
			var employees = _context.Employees.ToList();
			return Ok(employees);
		}

		[HttpPut]
		[Route("UpdateEmployee")]
		public IActionResult UpdateEmployee([FromBody] Employee updatedEmployee)
		{
			var employee = _context.Employees.FirstOrDefault(e => e.Id == updatedEmployee.Id);
			if (employee == null)
			{
				return NotFound("Employee not found");
			}

			employee.Name = updatedEmployee.Name;
			employee.Age = updatedEmployee.Age;
			employee.PhoneNumber = updatedEmployee.PhoneNumber;
			employee.Email = updatedEmployee.Email;
			employee.Address = updatedEmployee.Address;
			employee.WorkingHours = updatedEmployee.WorkingHours;
			employee.WorkState = updatedEmployee.WorkState;
			employee.Position = updatedEmployee.Position;
			employee.AvailableWorkDays = updatedEmployee.AvailableWorkDays;
			employee.Shifts = updatedEmployee.Shifts;

			_context.SaveChanges();
			return Ok("Employee updated successfully");
		}

		[HttpDelete]
		[Route("DeleteEmployee/{id}")]
		public IActionResult DeleteEmployee(Guid id)
		{
			var employee = _context.Employees.FirstOrDefault(e => e.Id == id);
			if (employee == null)
			{
				return NotFound("Employee not found");
			}

			_context.Employees.Remove(employee);
			_context.SaveChanges();
			return Ok("Employee deleted successfully");
		}

		[HttpPost]
		[Route("AddShiftToEmployee")]
		public IActionResult AddShiftToEmployee(Guid employeeId, [FromBody] Shift shift)
		{
			var employee = _context.Employees.FirstOrDefault(e => e.Id == employeeId);
			if (employee == null)
			{
				return NotFound("Employee not found");
			}

			if (shift == null)
			{
				return BadRequest("Shift is null");
			}

			if (!System.Enum.IsDefined(typeof(WorkDays), shift.Day))
			{
				return BadRequest("Invalid day value");
			}

			shift.id = Guid.NewGuid();
			employee.Shifts.Add(shift);
			_context.SaveChanges();
			return Ok("Shift added successfully");
		}

		[HttpPut]
		[Route("EditShift")]
		public IActionResult EditShift(Guid shiftId, [FromBody] Shift updatedShift)
		{
			var shift = _context.Shifts.FirstOrDefault(s => s.id == shiftId);
			if (shift == null)
			{
				return NotFound("Shift not found");
			}

			shift.Day = updatedShift.Day;
			shift.Date = updatedShift.Date;
			shift.StartTime = updatedShift.StartTime;
			shift.EndTime = updatedShift.EndTime;

			_context.SaveChanges();
			return Ok("Shift updated successfully");
		}

		[HttpDelete]
		[Route("DeleteShift/{shiftId}")]
		public IActionResult DeleteShift(Guid shiftId)
		{
			var shift = _context.Shifts.FirstOrDefault(s => s.id == shiftId);
			if (shift == null)
			{
				return NotFound("Shift not found");
			}

			_context.Shifts.Remove(shift);
			_context.SaveChanges();
			return Ok("Shift deleted successfully");
		}
	}
}
