import './search.css';

 function Search(props) {
    const {
        getAllMoviesByName,
        handleSearchName,
        movies,
        changeUrl

    } = props;

    console.log(movies);
    return (
        <div className="search-container">
            <div className="form">
                <button onClick={getAllMoviesByName}>
                    <i className="fas fa-search"></i>
                </button>
                <input
                    onChange={handleSearchName}
                    type="text"
                    placeholder="Search......"
                />
            </div>

            <h1>movies in theatres <span>now</span></h1>
            
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
        </div>
    )
}
export default Search;
