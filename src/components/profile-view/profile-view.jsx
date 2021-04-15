import "./profile-view.scss";

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Form, Tab, Tabs, Container, Card } from "react-bootstrap/";
import { connect } from "react-redux";

import { setUser } from "../../actions";

const mapStateToProps = (state) => {
  const { Username, Password, Email, Birthday, FavoriteMovies } = state;
  return {
    Username,
    Password,
    Email,
    Birthday,
    FavoriteMovies,
  };
};

class ProfileView extends React.Component {
  // constructor(props) {
  //   super(props);

  //   (this.Username = null),
  //     (this.Password = null),
  //     (this.Email = null),
  //     (this.Birthday = null);

  //   this.state = {
  //     Username: null,
  //     Password: null,
  //     Email: null,
  //     Birthday: null,
  //     FavoriteMovies: [],
  //     validated: null,
  //   };
  // }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    console.log(accessToken);
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get(`https://my-flix-api-practice.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        // Assign the result to the state
        // change to use Redux store -
        // action, reducer, constant - setUser
        this.props.setUser({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRemoveFavorite(e, movie) {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://my-flix-api-practice.herokuapp.com/users/${username}/Movies/${movie}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(`${movie.Title} was removed from your favorite`);
        window.open("/users/:username", "__self");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUpdate = (e, newUsername, newPassword, newEmail, newBirthday) => {
    this.setState({
      validated: null,
    });
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://my-flix-api-practice.herokuapp.com/users/${username}`,
        {
          Username: newUsername ? newUsername : this.state.Username, // this.props.Username
          Password: this.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert("Saved Changes");
        this.setState({
          // everywhere it says state here, use redux
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${username}`, "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeregister(e) {
    e.preventDefault();

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://my-flix-api-practice.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        console.log(`${username} was successfully deleted`);
        alert("Profile deleted");
        window.open("/", "_self");
      })
      .catch((err) => {
        console.log("Unsuccessful: Delete profile");
      });
  }

  render() {
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.props;
    const { movies } = this.props;

    return (
      <Container className='profile-view'>
        {/* <Tabs defaultActiveKey='profile' className='profile-tabs'>
          <Tab eventKey='profile' title='Profile'>
            <h1>My Profile</h1>
            <Card className='profile-card'>
              <Card.Body>
                <Card.Text className='profile-item'>Username: </Card.Text>
                {Username}
                <Card.Text className='profile-item'>Password: </Card.Text>*****
                <Card.Text className='profile-item'>Email: </Card.Text>
                {Email}
                <Card.Text className='profile-item'>Birthday: </Card.Text>
                {Birthday}
                <Card.Text className='profile-item'>
                  Favorite Movies:{" "}
                </Card.Text>
                {FavoriteMovies.length === 0 && (
                  <div>You have no favorite movies</div>
                )}
                <div className='favorite-container'>
                  <ul className='favorite-lite'>
                    {FavoriteMovies.length > 0 &&
                      movies.map((movie) => {
                        if (
                          movie._id ===
                          FavoriteMovies.find(
                            (favMovie) => favMovie === movie._id
                          )
                        ) {
                          return (
                            <li className='favorite-item' key={movie._id}>
                              {movie.Title}
                              <Button
                                size='xs'
                                className='remove-favorite'
                                onClick={(e) =>
                                  this.handleRemoveFavorite(e, movie._id)
                                }>
                                Remove
                              </Button>
                            </li>
                          );
                        }
                      })}
                  </ul>
                </div>
                <div className='button-container'>
                  <Link to='/'>
                    <Button className='back-button'>Back</Button>
                  </Link>
                  <Button
                    style={{ maxWidth: "200px" }}
                    className='delete-user'
                    onClick={(e) => this.handleDeregister(e)}>
                    Delete Profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey='update' title='Update'>
            <h1>Update Profile</h1>
            <Card className='update-card'>
              <Card.Body>
                <Form
                  noValidate
                  validated={validated}
                  className='update-form'
                  onSubmit={(e) =>
                    this.handleUpdate(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }>
                  <Form.Group controlId='formBasicUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Change Username'
                      defaultValue={Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter Password'
                      defaultValue=''
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Change Email'
                      defaultValue={Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type='invalid'>
                      A password is required
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type='date'
                      placeholder='Change Birthday'
                      defaultValue={Birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <Button className='update' type='submit' size='sm'>
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs> */}
      </Container>
    );
  }
}

export default connect(mapStateToProps, { setUser })(ProfileView);
