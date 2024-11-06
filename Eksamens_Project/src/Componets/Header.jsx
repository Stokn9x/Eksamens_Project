import './Header.css';
import ManishHusetLogo from '../assets/NewFolder/ManishHuset.png';

function Header() {
    return (
        <div className="Header">
            <div className="Header-Logo">
                <img src={ManishHusetLogo} alt="Logo" />
            </div>
            <div className="Header-Title">
                <h1>Restaurant</h1>
            </div>
            <div className="Header-right">

            </div>
        </div>
    );
}

export default Header;