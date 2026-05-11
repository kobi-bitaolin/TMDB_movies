import './about.css';

function About() {
    return (
        <div className="about-page">
            <div className="about-card">
                <h1>About TMDB Movies</h1>
                <div className="content">
                    <p>
                        Welcome to my movie application! This project was built using the 
                        MERN stack (MongoDB, Express, React, Node.js) and integrates with 
                        the TMDB API to provide real-time movie data.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;