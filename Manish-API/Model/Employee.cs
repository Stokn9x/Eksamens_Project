using Manish_API.Enum;
namespace Manish_API.Model
{
	public class Employee
	{
		public Guid id { get; set; }
		public string Name { get; set; }
		public int Age { get; set; }
		public string PhoneNumber { get; set; }
		public string Email { get; set; }
		public string Address { get; set; }
		public double WorkingHours { get; set; }
		public WorkState WorkState { get; set; }
		public Position Position { get; set; }
		public List<WorkDays> AvailableWorkDays { get; set; }
		public List<Shift> Shifts { get; set; }

		public Employee(string name, int age, string phoneNumber, string email, string address, double workingHours, WorkState workState, Position position, List<WorkDays> availableWorkDays)
		{
			id = Guid.NewGuid();
			Name = name;
			Age = age;
			PhoneNumber = phoneNumber;
			Email = email;
			Address = address;
			WorkingHours = workingHours;
			WorkState = workState;
			Position = position;
			AvailableWorkDays = availableWorkDays;
			Shifts = new List<Shift>();
		}

		public void AddShift(Shift shift)
		{
			Shifts.Add(shift);
		}

		public void RemoveShift(Shift shift)
		{
			Shifts.Remove(shift);
		}

		public void UpdateShift(Shift shift)
		{
			Shifts[Shifts.FindIndex(s => s.id == shift.id)] = shift;
		}

	}
}
