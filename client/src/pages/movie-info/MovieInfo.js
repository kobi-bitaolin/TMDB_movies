import { useEffect, useState } from 'react';
import './movieinfo.css';
import ReactPlayer from 'react-player';
import StarRating from '../../components/star-rating/StarRating'

const MovieInfo = (props) => {

    const { match } = props;

    const [movie, setMovie] = useState(null);
    const [videoKey, setVideoKey] = useState("");
    const api_key = "4f5c14eec74770b20682e85f6fe0691b";
    // console.log(match); get the pramas obj from react router
    const youtubeUrl = "https://www.youtube.com/embed/";

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${api_key}&append_to_response=videos`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMovie(data);
                setVideoKey(data.videos.results[0].key);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <>
            {
                movie ?
                    <div className="content-wraps">
                        <div className="movie-description">
                            {
                                videoKey ?
                                    <ReactPlayer width="100%" height="400px" playing url={youtubeUrl + videoKey} />
                                    : null
                            }
                            <div className="rating">
                                <h1>{movie.vote_average}</h1>
                                <StarRating star_rating={movie.vote_average} />
                            </div>
                            <h1>{movie.title}</h1>
                            <h2>{movie.release_date}</h2>
                            <h3>{movie.production_countries[0].name}</h3>
                            <p>{movie.overview}</p>
                            <a target="_blank" rel="noreferrer" href={movie.homepage} >for more detail </a>
                        </div>
                        <div className="movie-poster">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt="movie-poster"
                            />
                        </div>

                    </div> : null
            }
        </>
    )
}

export default MovieInfo;