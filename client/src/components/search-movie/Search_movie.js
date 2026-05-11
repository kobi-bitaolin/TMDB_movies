import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Search from '../../pages/search/Search';
import { useAuth } from "../../auth/AuthContext";


const SearchMovie = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { isLogged } = useAuth();

  useEffect(() => {
    if (!search) {
      getMovies('/api/movies/list/now_playing');
    }
  }, [search]);

  const handleSearchName = e => {
    setSearch(e.target.value);
  };

  const getAllMoviesByName = () => {
    if (!isLogged) return;
    getMovies(`/api/movies/search?q=${encodeURIComponent(search)}`);
  };
  

  const getMovies = url => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };


  const changeUrl = id => {
        history.push(`/movieInfo/${id}`);
 }
      

  return (
    <div>
      <Search
        getAllMoviesByName={getAllMoviesByName}
        handleSearchName={handleSearchName}
        movies={movies}
        changeUrl={changeUrl}
        isLogged={isLogged}
        loading={loading}
      />
    </div>
  );
}

export default SearchMovie;
