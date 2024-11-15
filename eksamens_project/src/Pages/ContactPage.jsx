import './ContactPage.css';
import RestaurantImage from '../assets/Placeholder.png'; // Import the image

function ContactPage() {
    return (
        <div className="contact-page">
            <div className="contact-info">
                <h2>Contact Information</h2>
                <p><strong>Address:</strong> 123 Main Street, City, Country</p>
                <p><strong>Phone:</strong> +123 456 7890</p>
                <p><strong>Email:</strong> info@restaurant.com</p>

                <h2>Opening Hours</h2>
                <p><strong>Monday - Friday:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Saturday:</strong> 12:00 PM - 11:00 PM</p>
                <p><strong>Sunday:</strong> 12:00 PM - 9:00 PM</p>
            </div>
            <div className="restaurant-image">
                <img src={RestaurantImage} alt="Restaurant Location" />
            </div>
        </div>
    );
}

export default ContactPage;
