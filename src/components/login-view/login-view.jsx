// function component case :
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { connect } from "react-redux";
import "./login-view.scss";
import { userLogin, userLogout } from "../../actions/actions";

export function LoginView(props) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://my-flix-api-practice.herokuapp.com/login", {
        Username: props.username,
        Password: props.password,
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
            value={props.username}
            onChange={(e) => userLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Control
            type='password'
            required
            placeholder='Password'
            value={props.password}
            onChange={(e) => userLogin(e.target.value)}
          />
        </Form.Group>
        <div className='login-register-button'>
          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Login
          </Button>
          <p className='or'>or</p>
          <Button variant='primary' href='/register'>
            New user
          </Button>
        </div>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password,
  };
};

const mapDispatchToProps = {
  userLogin: userLogin,
  userLogout: userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
