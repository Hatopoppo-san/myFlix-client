import "./main-view.scss";

import React from "react";
import axios from "axios";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
import MoviesList from "../movies-list/movies-list";

import { setMovies, setUsername } from "../../actions";

class MainView extends React.Component {
  getMovies(token) {
    axios
      .get("https://my-flix-api-practice.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to redux
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.props.setUsername(localStorage.getItem("user"));
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user*
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUsername(authData.user.Username);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout successfully");
    window.open("/", "_self");
  }

  render() {
    const { movies, username } = this.props;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    // Before the movies have been loaded
    if (!movies) return <div className='main-view' />;

    return (
      <Router>
        <div className='main-view'>
          <Route
            exact
            path='/'
            render={() => {
              if (!username)
                return (
                  <div id='login'>
                    <h1 id='main-title'>MyFlixDB</h1>
                    <h5>Your personal movie database</h5>
                    <LoginView
                      onLoggedIn={(authData) => this.onLoggedIn(authData)}
                    />
                  </div>
                );
              return (
                <div>
                  <div className='nav-container'>
                    <Navbar className='mainNav' variant='light'>
                      <Navbar.Brand id='main-logo' href='/'>
                        MyFlix
                      </Navbar.Brand>
                      <Nav className='mr-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href={`/users/${username}`}>Mypage</Nav.Link>
                        <Button
                          className='nav-button'
                          onClick={() => this.logoutUser()}>
                          log out
                        </Button>
                      </Nav>
                    </Navbar>
                  </div>
                  <MoviesList movies={movies} />
                </div>
              );
            }}
          />
          <Route path='/register' render={() => <RegistrationView />} />
          <Route
            exact
            path='/movies/:movieId'
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path='/users/:username'
            render={() => {
              return <ProfileView movies={movies} />;
            }}
          />
          <Route
            path='/directors/:name'
            render={({ match }) => {
              if (!movies) return <div className='main-view' />;
              console.log(match.params.name);
              console.log(movies);
              return (
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
          <Route
            path='/genres/:name'
            render={({ match }) => {
              if (!movies) return <div className='main-view' />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    username: state.username,
  };
};

export default connect(mapStateToProps, { setMovies, setUsername })(MainView);
