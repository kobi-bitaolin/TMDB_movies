import './navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLogged, name, logout } = useAuth();
    const history = useHistory();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
        history.push('/');
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                <span className="logo">MOVIES</span>

                <div className="hamburger" onClick={toggleMenu}>
                    <span className={isMenuOpen ? "bar active" : "bar"}></span>
                    <span className={isMenuOpen ? "bar active" : "bar"}></span>
                    <span className={isMenuOpen ? "bar active" : "bar"}></span>
                </div>

                <ul className={isMenuOpen ? "ul active" : "ul"}>
                    <li><Link className="link" to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link className="link" to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link className="link" to="/searchMovie" onClick={closeMenu}>Movies</Link></li>
                    <li><Link className="link" to="/wishlist" onClick={closeMenu}>Wishlist</Link></li>
                    {isLogged ? (
                        <>
                            {name && <li className="user-greeting">Hi, {name}</li>}
                            <li>
                                <button className="link login-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link className="link login-btn" to="/login" onClick={closeMenu}>
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;
