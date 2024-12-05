using System;
using System.Text.Json.Serialization;
using Manish_API.Enum;

namespace Manish_API.Model
{
	public class Shift
	{
		public Guid id { get; set; }

		[JsonConverter(typeof(JsonStringEnumConverter))]
		public WorkDays Day { get; set; }

		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }

		public Shift()
		{
		}

		public Shift(WorkDays day, DateTime startTime, DateTime endTime)
		{
			id = Guid.NewGuid();
			Day = day;
			StartTime = startTime;
			EndTime = endTime;
		}
	}
}
