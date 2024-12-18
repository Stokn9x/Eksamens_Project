import './ProfileMenu.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileMenu({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="profile-menu">
            <button onClick={toggleMenu} className="profile-menu-button">
                Profile
            </button>
            {isOpen && (
                <div className="profile-menu-dropdown">
                    {isLoggedIn ? (
                        <div>
                            <p>Welcome, User!</p>
                            <Link to="/logout" className="button-link">
                                <button className="profile-menu-button">Logout</button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="button-link">
                                <button className="profile-menu-button">Login</button>
                            </Link>
                            <Link to="/createprofile" className="button-link">
                                <button className="profile-menu-button">Opret bruger</button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileMenu;
