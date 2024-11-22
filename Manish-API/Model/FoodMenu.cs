namespace Manish_API.Model
{
	public class FoodMenu
	{
		private List<Product> Products { get; set; }

		public FoodMenu()
		{
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
