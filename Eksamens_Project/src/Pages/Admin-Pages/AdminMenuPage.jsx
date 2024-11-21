import './AdminMenuPage.css';
import AdminNavbar from '../../Componets/AdminNavbar';

function AdminMenuPage() {
	return (
		<div>
			<AdminNavbar />
			<div className="admin-content">
				<h1>Welcome to the Admin menu Panel</h1>
				<p>Hello world!</p>
			</div>
		</div >
	);
}

export default AdminMenuPage;