import React, { useState } from "react";
import classes from "./Login.module.css";
import InputTextField from "../../UI Screen Components/InputTextField/InputTextField";
// import Registration from "../Register Module/Registration";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("consumer");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle login or signup logic here
  };
  const handleSignup = () => {
    props.setInitialScreen("SignUp");
  };

  return (
    <div>
      <div class={classes.tagline}>
        Bridging the Gap Between Farmers and Buyers
      </div>
      <div className={classes.Login_container}>
        <h1>Login</h1>
        <form className={classes.Login_form} onSubmit={handleSubmit}>
          <label>User Type:</label>
          <select value={userType} onChange={handleUserTypeChange}>
            <option value="consumer">Consumer</option>
            <option value="farmer">Farmer</option>
          </select>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />

          <label>password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button type="submit">Login</button>
          <button type="button" onClick={handleSignup}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
