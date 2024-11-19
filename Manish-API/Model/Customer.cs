namespace Manish_API.Model
{
    public class Customer
    {
        public Guid id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public int Age { get; set; }

        public Customer(string username, string password, string name, string email, string phoneNumber, string address, int age)
        {
            id = Guid.NewGuid();
            Username = username;
            Password = password;
            Name = name;
            Email = email;
            PhoneNumber = phoneNumber;
            Address = address;
            Age = age;
        }
    }
}
