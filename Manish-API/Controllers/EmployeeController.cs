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

			employee.AddShift(shift);
			_context.SaveChanges();
			return Ok("Shift added successfully");
		}
	}
}
