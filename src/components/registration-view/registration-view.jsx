import React, { useState } from "react";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");

  const registerNewUser = (e) => {
    console.log("form submitted");
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={registerNewUser}>
          Register
        </button>
      </form>
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
