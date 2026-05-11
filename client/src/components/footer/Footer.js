import './footer.css';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {year} <span className="footer-brand">TMDB_movies</span>. All rights reserved.</p>
                <div className="footer-links">
                    <span>Built with React & Node.js</span>
                </div>
            </div>
        </footer>
    )
}
export default Footer;