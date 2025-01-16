import './ContactPage.css';

function ContactPage() {
    const address = 'Hundige Strandvej 55, 2670 Greve';
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.1234567890123!2d12.3456789012345!3d55.1234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1234567890abcdef!2sHundige%20Strandvej%2055%2C%202670%20Greve!5e0!3m2!1sen!2sdk!4v1234567890123`;

    return (
        <div className="contact-page">
            <div className="contact-info">
                <h2 className="contactHeader1">Kontaktinformation</h2>
                <p><strong>Adresse:</strong> {address}</p>
                <p><strong>Telefon:</strong> +45 12 34 56 78</p>
                <p><strong>Email:</strong> Manish@mail.dk</p>

                <h2 className="contactHeader1">Åbningstider</h2>
                <p><strong>Mandag - Fredag:</strong> 10:00 - 22:00</p>
                <p><strong>Lørdag:</strong> 12:00 - 23:00</p>
                <p><strong>Søndag:</strong> 12:00 - 21:00</p>
            </div>
            <div className="restaurant-image">
                <h2 className="contactHeader2">Find os Her</h2>
                <iframe
                    src={mapUrl}
                    className="full-height-map"
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps"
                ></iframe>
            </div>
        </div>
    );
}

export default ContactPage;
