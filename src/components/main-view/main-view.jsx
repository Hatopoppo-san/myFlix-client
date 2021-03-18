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
import "./main-view.scss";

import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

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
  }

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

  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout successfully");
    window.open("/", "_self");
  }

  render() {
    const { movies, user } = this.state;
    const username = localStorage.getItem("user");

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
              if (!user)
                return (
                  <div id='login'>
                    <h1 id='main-title'>MyFlixDB</h1>
                    <h5>Your personal movie database</h5>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </div>
                );
              return (
                <div>
                  <div className='nav-container'>
                    <div className='nav-inside-container'>
                      <Navbar className='mainNav' variant='light' expand='lg'>
                        <Navbar.Brand id='main-logo' href='/'>
                          MyFlix
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                          <Nav className='mr-auto'>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href={`/users/${username}`}>
                              Mypage
                            </Nav.Link>
                            <Button onClick={() => this.logoutUser()}>
                              log out
                            </Button>
                          </Nav>
                          <Form inline>
                            <FormControl
                              type='text'
                              placeholder='Search'
                              className='mr-sm-2'
                            />
                            <Button variant='outline-success'>Search</Button>
                          </Form>
                        </Navbar.Collapse>
                      </Navbar>
                    </div>
                  </div>
                  <Row className='movie-card-container justify-content-md-center'>
                    {movies.map((m) => (
                      <Col key={m._id} xs={4}>
                        <MovieCard movie={m} />
                      </Col>
                    ))}
                  </Row>
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
            exact
            path='/users/:username'
            render={() => {
              return <ProfileView movies={movies} />;
            }}
          />
          <Route
            exact
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
            exact
            path='/genres/:name'
            render={({ match }) => {
              if (!movies) return <div className='main-view' />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.Name).Genre
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
