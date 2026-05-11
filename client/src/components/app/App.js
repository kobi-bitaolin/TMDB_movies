import "./app.css";
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import Login from "../../pages/register/Login";
import Register from "../../pages/register/Register";
import WishList from "../../pages/wish-list/WishList";
import SearchMovie from "../search-movie/Search_movie";
import MovieInfo from "../../pages/movie-info/MovieInfo";
import { useAuth } from "../../auth/AuthContext";

function App() {
  const { isLogged } = useAuth();

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/wishlist"
            render={() => (isLogged ? <WishList /> : <Redirect to="/login" />)}
          />
          <Route exact path="/searchMovie" component={SearchMovie} />
          <Route exact path="/movieInfo/:id" component={MovieInfo} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
