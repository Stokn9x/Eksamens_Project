import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import FrontPage from './Pages/FrontPage';
import MenuPage from './Pages/MenuPage';
import AboutPage from './Pages/AboutPage';
import Navbar from './Componets/Navbar';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';

const routesToShowNavbar = [
    "/",
    "/menu",
    "/about",
    "/contact",

];

const shouldShowNavbar = (pathname) => {
    return routesToShowNavbar.includes(pathname);
};

function App() {
    const location = useLocation();
    const showNavbar = shouldShowNavbar(location.pathname);

    return (
        <div className="App">
            {showNavbar && <Navbar />}
            <div className="content">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
