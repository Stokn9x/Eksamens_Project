import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Forside</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>
                <li><Link to="/about">Om os</Link></li>
                <li><Link to="/Profile">Profil</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
