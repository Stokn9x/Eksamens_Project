import React from 'react';
import './AdminFrontPage.css';
import AdminNavbar from '../../Componets/AdminNavbar';

function AdminFrontPage() {
    return (
        <div className="admin-front-page">
            <AdminNavbar />
            <div className="admin-content">
                <h1>Welcome to the Admin Panel</h1>
                <p>Hello world!</p>
            </div>
        </div>
    );
}

export default AdminFrontPage;
