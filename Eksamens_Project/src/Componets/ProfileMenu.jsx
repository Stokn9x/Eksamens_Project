import './ProfileMenu.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../assets/Icons/Profile-Icon.png';

function ProfileMenu({ isLoggedIn, username, email, handleLogout }) {
    return (
        <div className="profile-menu">
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
                <div className="profile-menu-dropdown">
                    <div className="dropdown-trigger">
                        <button className="profile-menu-button">Login</button>
                        <div className="dropdown-content">
                            <Link to="/login" className="button-link">
                                <button className="profile-menu-button">Login</button>
                            </Link>
                            <Link to="/createprofile" className="button-link">
                                <button className="profile-menu-button">Opret bruger</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileMenu;
