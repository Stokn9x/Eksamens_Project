import React, { useState, useEffect } from 'react';
import './Header.css';
import ManishHusetLogo from '../assets/Logo/ManishHuset.png';
import ProfileIcon from '../assets/Icons/Profile-Icon.png';
import ProfileMenu from './ProfileMenu';
import Navbar from './Navbar';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Simuleret login-status, erstat med faktisk logik
        const checkLoginStatus = () => {
            const loggedIn = true; // Erstat med faktisk login-status
            const user = 'HansHansen';
            const userEmail = 'Hansen@mail';
            setIsLoggedIn(loggedIn);
            setUsername(user);
            setEmail(userEmail);
        };

        checkLoginStatus();
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setEmail('');
        // Tilføj logik for at logge ud brugeren, f.eks. ryd session eller token
    };

    return (
        <div className="Header">
            <div className="Header-Logo">
                <img src={ManishHusetLogo} alt="Logo" />
            </div>
            <div className="Header-Navbar">
                <Navbar />
            </div>
            <div className="Header-right">
                {isLoggedIn ? (
                    <div className="dropdown">
                        <div className="dropdown-trigger">
                            <img src={ProfileIcon} alt="Profile Icon" className="profile-icon" />
                            <div className="user-info">
                                <div>{username}</div>
                                <div>{email}</div>
                            </div>
                        </div>
                        <div className="dropdown-content">
                            <div onClick={handleLogout} className="dropdown-item">Log ud</div>
                        </div>
                    </div>
                ) : (
                    <ProfileMenu isLoggedIn={isLoggedIn} />
                )}
            </div>
        </div>
    );
}

export default Header;
