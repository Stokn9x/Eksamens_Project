namespace Manish_API.Model
{
	public class Admin
	{
		public Guid id { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }

		public Admin()
		{
		}

		public Admin(string username, string password)
		{
			id = Guid.NewGuid();
			Username = username;
			Password = password;
		}
	}
}
