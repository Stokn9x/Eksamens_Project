using Manish_API.Enum;

namespace Manish_API.Model
{
	public class Order
	{
		public Guid Id { get; set; }
		public List<Product> Products { get; set; }
		public OrderType OrderType { get; set; }
		public DateTime OrderTime { get; set; }
		public Customer Customer { get; set; }
		public double TotalPrice { get; set; }

		public Order()
		{
		}

		public Order(List<Product> products, OrderType orderType, DateTime orderTime, Customer customer, double totalPrice)
		{
			Id = Guid.NewGuid();
			Products = products;
			OrderType = orderType;
			OrderTime = orderTime;
			Customer = customer;
			TotalPrice = totalPrice;
		}
	}
}
