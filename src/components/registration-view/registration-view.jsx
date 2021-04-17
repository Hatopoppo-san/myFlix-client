import "./registration-view.scss";

import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";

import { setNewUsername, setNewBirthday, setNewEmail } from "../../actions";

const mapStateToProps = (state) => {
  return {
    username: state.newUsername,
    birthday: state.newBirthday,
    email: state.newEmail,
  };
};

function RegistrationView(props) {
  const [password, setPassword] = useState("");

  const registerNewUser = (e) => {
    e.preventDefault();
    axios
      .post("https://my-flix-api-practice.herokuapp.com/users", {
        Username: props.username,
        Password: password,
        Email: props.email,
        Birthday: props.birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
        // the second argument '_self'is necessary so that the page will open in the current tab
      })
      .catch((error) => {
        console.log("error:", error.response.data);
      });
  };

  return (
    <div>
      <Form>
        <Form.Group controlId='FormNewUsername'>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type='text'
            value={props.username}
            onChange={(e) => props.setNewUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='FormNewUserPassword'>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='FormNewEmail'>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type='email'
            value={props.email}
            onChange={(e) => props.setNewEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='FormNewBirthdate'>
          <Form.Label>Birthday: </Form.Label>
          <Form.Control
            type='date'
            value={props.birthday}
            onChange={(e) => props.setNewBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button type='submit' variant='primary' onClick={registerNewUser}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default connect(mapStateToProps, {
  setNewUsername,
  setNewBirthday,
  setNewEmail,
})(RegistrationView);
