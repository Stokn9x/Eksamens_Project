// Header.jsx
import './Header.css';
import ManishHusetLogo from '../assets/Logo/ManishHuset.png';
import ProfileMenu from './ProfileMenu';
import Navbar from './Navbar';

function Header() {
    const isLoggedIn = false;

    return (
        <div className="Header">
            <div className="Header-Logo">
                <img src={ManishHusetLogo} alt="Logo" />
            </div>
            <div className="Header-Navbar">
                <Navbar />
            </div>
            <div className="Header-right">
                <ProfileMenu isLoggedIn={isLoggedIn} />
            </div>
        </div>
    );
}

export default Header;
