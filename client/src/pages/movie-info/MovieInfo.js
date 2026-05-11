import "./movieinfo.css";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import StarRating from "../../components/star-rating/StarRating";
import Loading from "../../components/loading/Loading";
import { useAuth } from "../../auth/AuthContext";

const MovieInfo = (props) => {
  const { match } = props;

  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState("");
  const youtubeUrl = "https://www.youtube.com/embed/";
  const history = useHistory();
  const { isLogged } = useAuth();

  useEffect(() => {
    fetch(`/api/movies/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) return;
        setMovie(data);
        setVideoKey(data.videos?.results?.[0]?.key ?? "");
      })
      .catch((err) => console.log(err));
  }, [match.params.id]);

  const handleClickToWishList = async () => {
    try {
      await axios.post("/api/user/wishlist", {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
      });
      history.push("/wishlist");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Movie Already Exist In Your Wish List!");
      } else {
        console.log(err);
      }
    }
  };

  if (!movie) return <Loading />;

  return (
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
        <h3>{movie.production_countries?.[0]?.name}</h3>
        <p>{movie.overview}</p>
        <div className="btn-container">
          <a target="_blank" rel="noreferrer" href={movie.homepage}>
            for more detail !
          </a>
          {isLogged ? (
            <button
              className="wish-list-btn"
              onClick={handleClickToWishList}
            >
              Add to wish list
            </button>
          ) : (
            <p className="auth-prompt">
              <Link to="/register">Register</Link> to add movies to your wishlist.
            </p>
          )}
        </div>
      </div>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie-poster"
        />
      </div>
    </div>
  );
};

export default MovieInfo;
