import './app.css';
import {useState} from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Home from '../../pages/home/Home';
import About from '../../pages/about/About';
import Login from '../../pages/login/Login';
import { Switch, Route } from 'react-router-dom';
import WishList from '../../pages/wish-list/WishList';
import SearchMovie from  '../search-movie/Search_movie';
import MovieInfo from '../../pages/movie-info/MovieInfo';



function App() {

  const [wishList, setWishList] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/wishlist" render={ (props) => <WishList {...props} wishList={wishList} setWishList={setWishList}/> } />
        <Route exact path="/searchMovie" component={SearchMovie} />
        <Route exact path="/movieInfo/:id" render={ (props) => <MovieInfo {...props} wishList={wishList}  setWishList={setWishList}/> } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
