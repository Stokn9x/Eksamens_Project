import React, { useState, useEffect } from 'react';
import './CartPage.css';

function CartPage() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // Tilføj state for totalPrice

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        setTotalPrice(storedCart.reduce((total, item) => total + parseFloat(item.price), 0)); // Beregn totalPrice ved initialisering
    }, []);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleOrder = (e) => {
        e.preventDefault();

        const customer = {
            name,
            address,
            phone
        };

        const order = {
            products: cart.map(item => ({
                ...item,
                price: parseFloat(item.price) // Sørg for, at prisen er et tal
            })),
            orderType: "Online", // Sørg for, at denne værdi matcher en af værdierne i OrderType-enum
            orderTime: new Date(),
            customer,
            totalPrice // Inkluder totalPrice i order-objektet
        };

        fetch('https://localhost:7265/api/Order/CreateOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Order created:', data);
                setCart([]);
                setName('');
                setAddress('');
                setPhone('');
                setTotalPrice(0); // Nulstil totalPrice
                localStorage.removeItem('cart');
                alert('Order placed successfully!');
            })
            .catch(error => {
                console.error('Error creating order:', error);
            });
    };

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <div className="item-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="item-price">
                            ${item.price}
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Enter your details</h2>
            <form onSubmit={handleOrder}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
}

export default CartPage;
