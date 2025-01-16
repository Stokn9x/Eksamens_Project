import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfilePage.css';

function CreateProfilePage() {
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        age: ''
    });

    const [isProfileCreated, setIsProfileCreated] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProfileCreated(true);
    };

    const handleConfirm = async () => {
        console.log('Submitting user info:', userInfo);
        // Send data to the server
        try {
            const response = await fetch('https://localhost:7265/api/User/AddUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            if (response.ok) {
                console.log('User added successfully');
                navigate('/menu');
            } else {
                const errorData = await response.json();
                console.error('Failed to add user', response.status, response.statusText, errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="customer-profile-container">
            <h1>Opret Profil</h1>
            <form onSubmit={handleSubmit}>
                <h2>Brugeroplysninger</h2>
                <div className="profile-info">
                    <div className="row">
                        <label htmlFor="username">Brugernavn:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userInfo.username}
                            onChange={handleChange}
                            required

                        />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                            required

                        />
                    </div>
                </div>

                <h2>Personlige oplysninger</h2>
                <div className="profile-info">
                    <div className="row">
                        <label htmlFor="name">Fulde Navn:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            required

                        />
                    </div>
                    <div className="row">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            required

                        />
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
                            pattern="[0-9]{8}"
                            required

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
                            required
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="age">Alder:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            maxLength="3"
                            value={userInfo.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button type="submit" className="ProfileButton">Opret Profil</button>
                </div>
            </form>

            {isProfileCreated && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Oplysninger er godkendt!</h2>
                        <p>Er du sikker på at du vil godkende disse oplysninger?</p>
                        <button className="AcceptButton" onClick={handleConfirm}>Godkend</button>
                        <button className="DeclineButton" onClick={() => setIsProfileCreated(false)}>Fortryd</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateProfilePage;
