import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

import { LoginView } from "../login-view/login-view";
import { NavigationView } from "../navigation-view/navigation-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
    };
  }

  // This overrides the render() method of the super class
  // No need to call super() though, as it does nothing by default

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get("https://my-flix-api-practice.herokuapp.com/movies")
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  // Create back click function
  onMovieBackClick() {
    this.setState({
      selectedMovie: null,
    });
  }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user*
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user } = this.state;

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
      <div>
        <NavigationView />
        <Row className="main-view justify-content-md-center">
          {selectedMovie ? (
            <Col xs={4}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => this.onMovieBackClick()}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col xs={4}>
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={(movie) => this.onMovieClick(movie)}
                />
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}
