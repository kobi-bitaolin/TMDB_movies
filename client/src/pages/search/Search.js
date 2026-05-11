import './search.css';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

function Search(props) {
    const { getAllMoviesByName, handleSearchName, movies, changeUrl, isLogged, loading } = props;

    return (
        <div className="search-container">
            <div className="form">
                <button onClick={getAllMoviesByName} disabled={!isLogged}>
                    <i className="fas fa-search"></i>
                </button>
                <input
                    onChange={handleSearchName}
                    type="text"
                    placeholder={isLogged ? "Search......" : "Register to search for movies"}
                    disabled={!isLogged}
                />
            </div>

            {!isLogged && (
                <p className="auth-prompt">
                    <Link to="/register">Register</Link> or{" "}
                    <Link to="/login">log in</Link> to search the full catalog.
                </p>
            )}

            <h1>movies in theatres <span>now</span></h1>

            {loading ? (
                <Loading />
            ) : (
                <div className="cards-container">
                    {
                        movies.map(movie => {
                            return (
                                <div key={movie.id} className="card" onClick={() => changeUrl(movie.id)}>

                                    <div className="front-card">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                            alt="movie-poster"
                                        />
                                    </div>

                                    <div className="back-card">
                                        <h2>{movie.title}</h2>
                                        <p>{movie.overview}</p>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            )}
        </div>
    )
}
export default Search;
