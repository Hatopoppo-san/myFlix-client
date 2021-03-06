// function component case :
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://my-flix-api-practice.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log(e);
        alert(
          "Either Username or Password, or Both are wrong. If you are a new user, please register first"
        );
      });
  };

  return (
    <div className='Login'>
      <Form>
        <Form.Group controlId='formUsername'>
          <Form.Control
            type='text'
            required
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Control
            type='password'
            required
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className='login-register-button'>
          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Login
          </Button>
          <p>
            Not a user? You can register <a href='/register'>Here</a>
          </p>
        </div>
      </Form>
    </div>
  );
}
