using Microsoft.AspNetCore.Mvc;
using Manish_API.Model;
using Manish_API.Database;
using System;
using System.Threading.Tasks;

namespace Manish_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<IActionResult> AddUser([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest("Customer is null");
            }

            try
            {
                customer.id = Guid.NewGuid();
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
                Console.WriteLine("User added successfully");
                return Ok("User added successfully");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error adding user: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [Route("GetUser")]
        public IActionResult GetUser()
        {
            try
            {
                var users = _context.Customers.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error fetching users: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        [Route("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest("Customer is null");
            }

            try
            {
                _context.Customers.Update(customer);
                await _context.SaveChangesAsync();
                Console.WriteLine("User updated successfully");
                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error updating user: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest("Customer is null");
            }

            try
            {
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
                Console.WriteLine("User deleted successfully");
                return Ok("User deleted successfully");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error deleting user: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
