import React, { useState, useEffect } from 'react'; 
import './CustomerProfilePage.css';

function CustomerProfilePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        address: ''
    });
    const [originalUserInfo, setOriginalUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const loggedIn = true;
            const user = {
                firstName: 'Hans',
                lastName: 'Hansen',
                email: 'hans@mail.com',
                phone: '12345678',
                age: '35',
                address: 'Hovedgaden 123, DK'
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

    return (
        <div className="customer-profile-container">
            {isLoggedIn ? (
                <>
                    <h1>Dine profil oplysninger</h1>
                    <div className="profile-info">
                        <div className="row">
                            <label htmlFor="firstName">Fornavn:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleChange}
                                disabled={!isEditable}
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="lastName">Efternavn:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleChange}
                                disabled={!isEditable}
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                disabled={!isEditable}
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="phone">Telefon nr:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleChange}
                                disabled={!isEditable}
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="age">Alder:</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                value={userInfo.age}
                                onChange={handleChange}
                                disabled={!isEditable}
                            />
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
                            />
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="ProfileButton" onClick={handleEdit}>
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
