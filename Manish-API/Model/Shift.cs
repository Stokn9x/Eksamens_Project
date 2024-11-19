namespace Manish_API.Model
{
	public class Shift
	{
		public Guid id { get; set; }
		public DateTime ShiftDate { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }

		public Shift(DateTime shiftDate, DateTime startTime, DateTime endTime)
		{
			id = Guid.NewGuid();
			ShiftDate = shiftDate;
			StartTime = startTime;
			EndTime = endTime;
		}
	}
}
