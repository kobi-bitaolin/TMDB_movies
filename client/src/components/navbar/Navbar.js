import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="nav">
            <ul className="ul">
                <li><Link className="link" to="/">home</Link></li>
                <li><Link className="link" to="/about">about</Link></li>
                <li><Link className="link" to="/searchMovie">movies</Link></li>
                <li><Link className="link" to="/login">login</Link></li>
                <li><Link className="link" to="/wishlist">wishlist</Link></li>
                <span className="logo" >movies</span>
            </ul>
        </nav>
    )
}
export default Navbar;
