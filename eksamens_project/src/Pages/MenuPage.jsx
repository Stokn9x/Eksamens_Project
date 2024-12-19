import React, { useEffect, useState } from 'react';
import './MenuPage.css';
import ManishImage from '../assets/FoodItems/Manish.png';
import { Link } from 'react-router-dom';

function MenuPage() {
    const [menuData, setMenuData] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7265/api/FoodMenu/GetMenuData')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                // Filter out inactive products
                const activeData = data.map(category => ({
                    ...category,
                    items: category.items.filter(item => item.isActive)
                }));
                activeData.forEach(category => {
                    category.items.forEach(item => {
                        item.image = ManishImage;
                    });
                });
                setMenuData(activeData);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError(error.toString());
            });
    }, []);

    const handleAddToCart = (item) => {
        const updatedCart = [...cart, item];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="menu-page-container">
            <div className="category-list">
                <ul>
                    {menuData.map((category, index) => (
                        <li key={index}>
                            <a href={`#${category.category.toLowerCase().replace(' ', '-')}`}>{category.category}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="menu-page">
                {menuData.map((category, index) => (
                    <div key={index} id={category.category.toLowerCase().replace(' ', '-')} className="menu-category">
                        <h2>{category.category}</h2>
                        <div className="menu-items">
                            {category.items.map((item, idx) => (
                                <div key={idx} className="menu-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p className="ingredients">Ingredients: {item.ingredients.join(', ')}</p>
                                        <p className="price">{item.price}</p>
                                    </div>
                                    <button className="add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart">
                <h2>Cart</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price}
                        </li>
                    ))}
                </ul>
                <Link to="/cart">Go to Cart</Link>
            </div>
        </div>
    );
}

export default MenuPage;
