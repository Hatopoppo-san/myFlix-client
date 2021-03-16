import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  const registerNewUser = (e) => {
    e.preventDefault();
    axios
      .post("https://my-flix-api-practice.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
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
        <Form.Group controlId="FormNewUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="FormNewUserPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="FormNewEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="FormNewBirthdate">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" onClick={registerNewUser}>
          Register
        </Button>
      </Form>
    </div>
  );
}
// export class RegistrationView extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       email: "",
//       birthdate: "",
//       password: "",
//       password_confirmation: "",
//       registrationErrors: "",
//     };

//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     console.log("handle change", e);
//   }

//   handleSubmit(e) {
//     console.log("form submitted");
//     e.preventDefault();
//   }
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="username"
//             value={this.state.username}
//             onChange={this.handleChange}
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={this.state.email}
//             onChange={this.handleChange}
//             required
//           />

//           <input
//             type="date"
//             name="birthdate"
//             placeholder="Birthdate"
//             value={this.state.birthdate}
//             onChange={this.handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={this.state.password}
//             onChange={this.handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password_confirmation"
//             placeholder="Password confirmation"
//             value={this.state.password_confirmation}
//             onChange={this.handleChange}
//             required
//           />

//           <button type="submit">Register</button>
//         </form>
//       </div>
//     );
//   }
// }
