import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Search from '../../pages/search/Search';


const SearchMovie = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const api_key = "4f5c14eec74770b20682e85f6fe0691b";
  
  useEffect(() => {
    if(!search) {
      const UrlNewMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`
      getMovies(UrlNewMovies);
    }
  }, [search]);
  
  const handleSearchName = e => {
    setSearch(e.target.value);
  };
  
  const getAllMoviesByName = () => {
    const UrlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`
    getMovies(UrlSearch);
  };
  

  const getMovies = url => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      
      })
      .catch((err) => console.log(err));
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
      />
    </div>
  );
}

export default SearchMovie;
