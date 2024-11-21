import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar() {
    return (
        <div className="admin-navbar">
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to="/admin">Home</Link></li>
                <li><Link to="/admin/menu">Menu</Link></li>
                <li><Link to="/admin/employees">Employees</Link></li>
                <li><Link to="/admin/mailsystem">Mail System</Link></li>
                <li><Link to="/admin/shiftplan">Shift Plan</Link></li>
            </ul>
        </div>
    );
}

export default AdminNavbar;
