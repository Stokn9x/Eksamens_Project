using Microsoft.AspNetCore.Mvc;
using Manish_API.Model;
using System.Collections.Generic;
using System.Linq;
using System;
using Manish_API.Enum;

namespace Manish_API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class EmployeeController : ControllerBase
	{
		private static List<Employee> employees = new List<Employee>();

		public EmployeeController()
		{
			if (!employees.Any())
			{
				Employee medarbejder = new Employee("Casper", 24, "60175167", "capper2704@hotmail.dk", "Hvidovrevej 1", 37.5, WorkState.FullTime, Position.Cook, new List<WorkDays> { WorkDays.Monday, WorkDays.Tuesday, WorkDays.Wednesday, WorkDays.Thursday, WorkDays.Friday });
				employees.Add(medarbejder);
			}
		}

		[HttpPost]
		[Route("AddEmployee")]
		public IActionResult AddEmployee(string name, int age, string phoneNumber, string email, string address, double workingHours, string workState, string position, string availableWorkDays, string shifts)
		{
			var availableWorkDaysList = availableWorkDays.Split(',').Select(d => d.Trim()).ToList();
			var shiftsList = shifts.Split(';').Select(s => s.Trim()).ToList();

			if (!System.Enum.TryParse(position, out Position positionType))
			{
				return BadRequest("Invalid position type");
			}

			if (!System.Enum.TryParse(workState, out WorkState workStateType))
			{
				return BadRequest("Invalid work state type");
			}

			var availableWorkDaysEnumList = new List<WorkDays>();
			foreach (var day in availableWorkDaysList)
			{
				if (!System.Enum.TryParse(day, out WorkDays workDay))
				{
					return BadRequest("Invalid work days type");
				}
				availableWorkDaysEnumList.Add(workDay);
			}

			var employee = new Employee(name, age, phoneNumber, email, address, workingHours, workStateType, positionType, availableWorkDaysEnumList);

			foreach (var shift in shiftsList)
			{
				var shiftDetails = shift.Split(',');
				if (shiftDetails.Length != 3 ||
					!System.Enum.TryParse(shiftDetails[0], out WorkDays shiftDay) ||
					!DateTime.TryParse(shiftDetails[1], out DateTime startTime) ||
					!DateTime.TryParse(shiftDetails[2], out DateTime endTime))
				{
					return BadRequest("Invalid shift format");
				}

				employee.AddShift(new Shift(shiftDay, startTime, endTime));
			}

			employees.Add(employee);
			return Ok("Employee added successfully");
		}

		[HttpGet]
		[Route("GetEmployees")]
		public IActionResult GetEmployees()
		{
			return Ok(employees);
		}

		[HttpPut]
		[Route("UpdateEmployee")]
		public IActionResult UpdateEmployee([FromBody] Employee updatedEmployee)
		{
			var employee = employees.FirstOrDefault(e => e.Id == updatedEmployee.Id);
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

			return Ok("Employee updated successfully");
		}

		[HttpDelete]
		[Route("DeleteEmployee/{id}")]
		public IActionResult DeleteEmployee(Guid id)
		{
			var employee = employees.FirstOrDefault(e => e.Id == id);
			if (employee == null)
			{
				return NotFound("Employee not found");
			}

			employees.Remove(employee);
			return Ok("Employee deleted successfully");
		}

		[HttpPost]
		[Route("AddShiftToEmployee")]
		public IActionResult AddShiftToEmployee(Guid employeeId, [FromBody] Shift shift)
		{
			var employee = employees.FirstOrDefault(e => e.Id == employeeId);
			if (employee == null)
			{
				return NotFound("Employee not found");
			}

			employee.AddShift(shift);
			return Ok("Shift added successfully");
		}
	}
}
