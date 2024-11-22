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
		private static List<WorkDays> AvailavbleWorkDays = new List<WorkDays>();

		[HttpPost]
		[Route("AddEmployee")]
		public IActionResult AddEmployee(string name, int age, string phoneNumber, string email, string address, int workingHours, string workState, string position, string availableWorkDays, string shifts)
		{
			var availableWorkDaysList = availableWorkDays.Split(',').Select(d => d.Trim()).ToList();
			var shiftsList = shifts.Split(',').Select(s => s.Trim()).ToList();

			if (!System.Enum.TryParse(position, out Position positionType))
			{
				return BadRequest("Invalid position type");
			}

			if (!System.Enum.TryParse(workState, out WorkState workStateType))
			{
				return BadRequest("Invalid work state type");
			}

			for (int i = 0; i < availableWorkDaysList.Count; i++)
			{
				if (!System.Enum.TryParse(availableWorkDaysList[i], out WorkDays workDay))
				{
					return BadRequest("Invalid work days type");
				}
				AvailavbleWorkDays.Add(workDay);
			}

				var employee = new Employee
			{
				id = Guid.NewGuid(),
				Name = name,
				Age = age,
				PhoneNumber = phoneNumber,
				Email = email,
				Address = address,
				WorkingHours = workingHours,
				WorkState = workStateType,
				Position = positionType,
				AvailableWorkDays = AvailavbleWorkDays,
				Shifts = shiftsList
			};

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
			var employee = employees.FirstOrDefault(e => e.id == updatedEmployee.id);
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
			var employee = employees.FirstOrDefault(e => e.id == id);
			if (employee == null)
			{
				return NotFound("Employee not found");
			}

			employees.Remove(employee);
			return Ok("Employee deleted successfully");
		}
	}
}

