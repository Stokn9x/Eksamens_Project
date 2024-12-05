namespace Manish_API.Model
{
	public class FoodMenu
	{
		public Guid Id { get; set; }
		private List<Product> Products { get; set; }

		public FoodMenu()
		{
			Id = Guid.NewGuid();
			Products = new List<Product>();
		}

		public void addProduct(Product product)
		{
			Products.Add(product);
		}

		public void removeProduct(Product product) 
		{
			Products.Remove(product);
		}

		public List<Product> getProducts()
		{
			return Products;
		}
	}
}
