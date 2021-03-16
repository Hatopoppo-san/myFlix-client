import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { NavigationView } from "../navigation-view/navigation-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://my-flix-api-practice.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
    // axios
    //   .get("https://my-flix-api-practice.herokuapp.com/movies")
    //   .then((response) => {
    //     // Assign the result to the state
    //     this.setState({
    //       movies: response.data,
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie,
  //   });
  // }

  // // Create back click function
  // onMovieBackClick() {
  //   this.setState({
  //     selectedMovie: null,
  //   });
  // }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user*
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView

    if (!user)
      return (
        <div id="login">
          <h1 id="main-title">MyFlixDB</h1>
          <h5>Your personal movie database</h5>
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          <RegistrationView />
        </div>
      );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <NavigationView />
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <div id="login">
                    <h1 id="main-title">MyFlixDB</h1>
                    <h5>Your personal movie database</h5>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </div>
                );
              return movies.map((m) => <MovieCard key={m._id} movie={m} />);
            }}
          />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
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
        </div>
      </Router>
    );
  }
}
