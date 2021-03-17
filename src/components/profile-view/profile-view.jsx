import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function ProfileView() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState("");

  let accessToken = localStorage.getItem("token");
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem("user"),
    });
    this.getMovies(accessToken);
  }
}
function getUser(token) {
  axios
    .get(`https://my-flix-api-practice.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      // Assign the result to the state
      this.setState({
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

const updateUser = (e) => {
  e.preventDefault();
  axios
    .put("https://my-flix-api-practice.herokuapp.com/users/:Username", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      window.open("/users", "_self");
      // the second argument '_self'is necessary so that the page will open in the current tab
    })
    .catch((error) => {
      console.log("error:", error.response.data);
    });

  return (
    <div className='user-container'>
      <div className='user-name'>
        <span className='label'> Username: </span>
        <span className='value'>{user.Username}</span>
        <Form>
          <Form.Group controlId='form-update-username'>
            <Form.Label>New Username: </Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
      <div className='director-description'>
        <span className='label'>Password: </span>
        <span className='value'>{user.password}</span>
        <Form>
          <Form.Group controlId='form-update-password'>
            <Form.Label>New password: </Form.Label>
            <Form.Control
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
      <div className='user-email'>
        <span className='label'>Email: </span>
        <span className='value'>{user.Email}</span>
        <Form>
          <Form.Group controlId='form-update-email'>
            <Form.Label>New email address: </Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' variant='primary' onClick={updateUser}>
            Update information
          </Button>
        </Form>
      </div>
    </div>
  );
};
