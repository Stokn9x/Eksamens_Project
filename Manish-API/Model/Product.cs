using Manish_API.Enum;

namespace Manish_API.Model
{
	public class Product
	{
		public Guid id { get; set; }
		public string Name { get; set; }
		public string ProductImage { get; set; }
		public string Description { get; set; }
		public List<string> ingredients { get; set; }
		public double Price { get; set; }
		public int ProductSales { get; set; }
		public FoodCategory FoodCategory { get; set; }

		public Product(string name, string productImage, string description, List<string> ingredients, double price, int productSales, FoodCategory foodCategory)
		{
			id = Guid.NewGuid();
			Name = name;
			ProductImage = productImage;
			Description = description;
			this.ingredients = ingredients;
			Price = price;
			ProductSales = productSales;
			FoodCategory = foodCategory;
		}
	}
}
