import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FrontPage.css';

// Manuelt import af billeder
import billede1 from '../assets/SlideshowFrontPage/billede1.jpg';
import billede2 from '../assets/SlideshowFrontPage/billede2.jpg';
import billede3 from '../assets/SlideshowFrontPage/billede3.jpg';
import billede4 from '../assets/SlideshowFrontPage/billede4.jpg';
import billede5 from '../assets/SlideshowFrontPage/billede5.jpg';
import billede6 from '../assets/SlideshowFrontPage/billede6.jpg';
import billede7 from '../assets/SlideshowFrontPage/billede7.jpg';
import billede8 from '../assets/SlideshowFrontPage/billede8.jpg';
import billede9 from '../assets/SlideshowFrontPage/billede9.jpg';
import billede10 from '../assets/SlideshowFrontPage/billede10.jpg';
import billede11 from '../assets/SlideshowFrontPage/billede11.jpg';
import billede12 from '../assets/SlideshowFrontPage/billede12.jpg';
import billede13 from '../assets/SlideshowFrontPage/billede13.jpg';
import billede14 from '../assets/SlideshowFrontPage/billede14.jpg';
import billede15 from '../assets/SlideshowFrontPage/billede15.jpg';

const FrontPage = () => {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Sæt billederne i state
        setImages([
            billede1, billede2, billede3, billede4, billede5,
            billede6, billede7, billede8, billede9, billede10,
            billede11, billede12, billede13, billede14, billede15
        ]);
    }, []);

    const handleNavigation = () => {
        navigate('/menu');
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                {/* Text Content */}
                <div className="info-text">
                    <h1 onClick={handleNavigation} style={{ cursor: 'pointer' }}>Bestil mad til afhentning</h1>
                </div>

                {/* Carousel */}
                <div className="carousel-container" onClick={handleNavigation} style={{ cursor: 'pointer' }}>
                    <div className="carousel">
                        {images.concat(images).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image ${index}`}
                                className="carousel-image"
                            />
                        ))}
                    </div>
                </div>

                {/* Main Contact Info */}
                <div className="info-text">
                    <p>Telefon nr: +45 12 34 56 78</p>
                    <p>
                        <a href="https://www.google.com/maps/search/?api=1&query=Hundige+Strandvej+55,+2670+Greve" target="_blank" rel="noopener noreferrer">
                            Adresse: Hundige Strandvej 55, 2670 Greve
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;
