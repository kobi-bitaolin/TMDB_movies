

import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    return (
        <nav className="nav">
            <ul className="ul">
                <li><Link className="link" to="/">home</Link></li>
                <li><Link className="link" to="/about">about</Link></li>
                <li><Link className="link" to="/searchmovie">movies</Link></li>
                <li><Link className="link" to="/login">login</Link></li>
                <span className="logo" >movies</span>
            </ul>
        </nav>
    )
}
export default Navbar;
