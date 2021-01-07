import './app.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Home from '../../pages/home/Home';
import About from '../../pages/about/About';
import { Switch, Route } from 'react-router-dom';
import SearchMovie from  '../search-movie/Search_movie';
import MovieInfo from '../../pages/movie-info/MovieInfo';
import Login from '../../pages/login/Login';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/searchmovie" component={SearchMovie} />
        <Route exact path="/movieinfo/:id" component={MovieInfo} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
