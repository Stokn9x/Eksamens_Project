import './ProfileMenu.css';
import { useState } from 'react';

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
                            <button>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <button>Login</button>
                            <button>Opret bruger</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileMenu;
