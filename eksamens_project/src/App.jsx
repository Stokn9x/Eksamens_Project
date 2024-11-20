import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import FrontPage from './Pages/FrontPage';
import MenuPage from './Pages/MenuPage';
import AboutPage from './Pages/AboutPage';
import Navbar from './Componets/Navbar';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import Header from './Componets/Header';
import Footer from './Componets/Footer';
import AdminMenuPage from './Pages/Admin-Pages/AdminMenuPage';
import AdminFrontPage from './Pages/Admin-Pages/AdminFrontPage';
import ProtectedRoute from './Componets/ProtectRoute';

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
    const showHeader = shouldShowNavbar(location.pathname);
    const showFooter = shouldShowNavbar(location.pathname);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="App">
            {showHeader && <Header />}

            <div className="content" style={{ marginBottom: showFooter ? '0px' : '0' }}>
                <Routes>
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminFrontPage /></ProtectedRoute>} />
                    <Route path="/admin/menu" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminMenuPage /></ProtectedRoute>} />
                </Routes>
            </div>
            {showFooter && <Footer />}
        </div>
    );
}

export default App;
