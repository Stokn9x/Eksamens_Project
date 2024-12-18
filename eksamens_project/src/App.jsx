import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import FrontPage from './Pages/FrontPage';
import MenuPage from './Pages/MenuPage';
import AboutPage from './Pages/AboutPage';
import Navbar from './Componets/Navbar'; // Skal nok ik bruges
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import Header from './Componets/Header';
import Footer from './Componets/Footer';
import CustomerProfilePage from './Pages/CustomerProfilePage';
import AdminMenuPage from './Pages/Admin-Pages/AdminMenuPage';
import AdminFrontPage from './Pages/Admin-Pages/AdminFrontPage';
import ProtectedRoute from './Componets/ProtectRoute';
import AdminEmployeePage from './Pages/Admin-Pages/AdminEmployeePage';
import AdminMailSystem from './Pages/Admin-Pages/AdminMailSystem';
import AdminShiftPlan from './Pages/Admin-Pages/AdminShiftPlanPage';
import AdminNavbar from './Componets/AdminNavbar';
import CreateProfilePage from './Pages/CreateProfilePage';
import './index.css';

const routesToShowNavbar = [
    "/",
    "/menu",
    "/about",
    "/contact",
    "/Profile",
    "/CreateProfile",
];

const shouldShowNavbar = (pathname) => {
    return routesToShowNavbar.includes(pathname);
};

const isAdminRoute = (pathname) => {
    return pathname.includes("/admin");
};

function App() {
    const location = useLocation();
    const showHeader = shouldShowNavbar(location.pathname);
    const showFooter = shouldShowNavbar(location.pathname);
    const showAdminNavbar = isAdminRoute(location.pathname);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="App">
            {showHeader && <Header />}
            {showAdminNavbar && <AdminNavbar />}
            <div className="content" style={{ marginLeft: showAdminNavbar ? '220px' : '0' }}>
                <Routes>
                    <Route path="*" element={<h1>404 - Not Found</h1>} />
                    <Route path="/admin/*" element={<h1>404 - Not Found</h1>} />
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/Profile" element={<CustomerProfilePage />} />
                    <Route path="/CreateProfile" element={<CreateProfilePage />} />
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminFrontPage /></ProtectedRoute>} />
                    <Route path="/admin/menu" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminMenuPage /></ProtectedRoute>} />
                    <Route path="/admin/employees" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminEmployeePage /></ProtectedRoute>} />
                    <Route path="/admin/mail" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminMailSystem /></ProtectedRoute>} />
                    <Route path="/admin/shiftplan" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminShiftPlan /></ProtectedRoute>} />
                </Routes>
            </div>
            {showFooter && <Footer />}
        </div>
    );
}

export default App;
