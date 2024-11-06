import './LoginPage.css';

function LoginPage() {
    return (
        <div className="login-page-container">
            <h2 className="login-page-title">Login</h2>
            <form className="login-page-form">
                <div className="login-page-form-group">
                    <label htmlFor="username" className="login-page-label">Username:</label>
                    <input type="text" id="username" name="username" className="login-page-input" required />
                </div>
                <div className="login-page-form-group">
                    <label htmlFor="password" className="login-page-label">Password:</label>
                    <input type="password" id="password" name="password" className="login-page-input" required />
                </div>
                <button type="submit" className="login-page-button">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
