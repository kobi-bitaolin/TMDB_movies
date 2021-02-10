import "./movieInfo.css";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "../../components/star-rating/StarRating";

const MovieInfo = (props) => {
  const { match, setWishList, wishList } = props;

  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");
  const api_key = "4f5c14eec74770b20682e85f6fe0691b";
  const youtubeUrl = "https://www.youtube.com/embed/";
  const history = useHistory();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${api_key}&append_to_response=videos`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setVideoKey(data.videos.results[0].key);
      })
      .catch((err) => console.log(err));
  }, [match]);

  const handleClickToWishList = (movie) => {
    const filter = wishList.filter((list) => {
      //  console.log(list.id, movie.id);
      return list.id === movie.id;
    });
    // console.log(filter);
    if (filter.length > 0) {
      alert("Movie Already Exist!");
    } else {
      setWishList((prevList) => [...prevList, movie]);
      history.push('/wishlist');
    }
  };

  return (
    <>
      {movie ? (
        <div className="content-wraps">
          <div className="movie-description">
            {videoKey ? (
              <ReactPlayer
                muted
                width="100%"
                height="400px"
                playing
                url={youtubeUrl + videoKey}
              />
            ) : null}
            <div className="rating">
              <h1>{movie.vote_average}</h1>
              <StarRating star_rating={movie.vote_average} />
            </div>
            <h1>{movie.title}</h1>
            <h2>{movie.release_date}</h2>
            <h3>{movie.production_countries[0].name}</h3>
            <p>{movie.overview}</p>
            <div className="btn-container">
              <a target="_blank" rel="noreferrer" href={movie.homepage}>
                for more detail !
              </a>
              <button
                className="wish-list-btn"
                onClick={() => handleClickToWishList(movie)}
              >
                Add to wish list
              </button>
            </div>
          </div>
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie-poster"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MovieInfo;
