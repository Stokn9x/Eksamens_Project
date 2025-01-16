import React, { useState, useEffect } from 'react';
import './CustomerProfilePage.css';

function CustomerProfilePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        age: ''
    });
    const [originalUserInfo, setOriginalUserInfo] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            // Simuleret data, erstat med API-kald
            const loggedIn = true;
            const user = {
                username: 'Hans Hansen',
                password: 'password123',
                name: 'Hans Hansen',
                email: 'hans@mail.com',
                phoneNumber: '12345678',
                address: 'Hovedgaden 123, DK',
                age: '35'
            };

            setIsLoggedIn(loggedIn);
            setUserInfo(user);
            setOriginalUserInfo(user);
        };

        fetchUserInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReset = () => {
        if (originalUserInfo) {
            setUserInfo(originalUserInfo);
            setIsEditable(false);
        }
    };

    const handleEdit = () => {
        setIsEditable(!isEditable);
    };

    const validate = () => {
        const newErrors = {};
        if (!userInfo.username) newErrors.username = 'Brugernavn er påkrævet';
        if (!userInfo.password) newErrors.password = 'Password er påkrævet';
        if (!userInfo.name) newErrors.name = 'Fulde navn er påkrævet';
        if (!userInfo.email) newErrors.email = 'Email er påkrævet';
        if (!userInfo.phoneNumber) newErrors.phoneNumber = 'Telefon nr er påkrævet';
        if (!userInfo.address) newErrors.address = 'Adresse er påkrævet';
        if (!userInfo.age) newErrors.age = 'Alder er påkrævet';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            // Gem ændringerne (f.eks. send data til serveren)
            setIsEditable(false);
        }
    };

    return (
        <div className="customer-profile-container">
            {isLoggedIn ? (
                <>
                    <h1>Dine profil oplysninger</h1>
                    <div className="profile-info">
                        <div className="row">
                            <label htmlFor="username">Brugernavn:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={userInfo.username}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.username && <span className="error">{errors.username}</span>}
                        </div>
                        <div className="row">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <div className="row">
                            <label htmlFor="name">Fulde Navn:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className="row">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="row">
                            <label htmlFor="phoneNumber">Telefon nr:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={userInfo.phoneNumber}
                                onChange={handleChange}
                                maxLength="8"
                                disabled={!isEditable}
                                required
                            />
                            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                        </div>
                        <div className="row">
                            <label htmlFor="address">Adresse:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={userInfo.address}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.address && <span className="error">{errors.address}</span>}
                        </div>
                        <div className="row">
                            <label htmlFor="age">Alder:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={userInfo.age}
                                onChange={handleChange}
                                disabled={!isEditable}
                                required
                            />
                            {errors.age && <span className="error">{errors.age}</span>}
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="ProfileButton" onClick={isEditable ? handleSubmit : handleEdit}>
                            {isEditable ? 'Gem Ændringer' : 'Rediger Profil'}
                        </button>
                        <button className="ProfileButton" onClick={handleReset}>Fortryd</button>
                    </div>
                </>
            ) : (
                <>
                    <h1>Profil</h1>
                    <h2>Du er ikke logget ind</h2>
                    <p>Opret profil <a href="/create-profile">Her</a> for at oprette din profil</p>
                    <p>Eller log ind <a href="/login">Her</a></p>
                </>
            )}
        </div>
    );
}

export default CustomerProfilePage;
