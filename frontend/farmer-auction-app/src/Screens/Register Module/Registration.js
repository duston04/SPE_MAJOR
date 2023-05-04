import React, { useState } from "react";
import classes from "./Registration.module.css";

const Registration = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  // const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [userType, setUserType] = useState("consumer");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  // };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle registration logic here
  };
  const loginButtonHandler = () => {
    props.setInitialScreen("Login");
  };

  return (
    <div className={classes.registration_form}>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>User Type:</label>
        <select value={userType} onChange={handleUserTypeChange}>
          <option value="consumer">Consumer</option>
          <option value="farmer">Farmer</option>
        </select>

        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label>Contact:</label>
        <input type="number" value={contact} onChange={handleContactChange} />

        {/* <label>Gender:</label>
        <select value={gender} onChange={handleGenderChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select> */}

        <label>Address:</label>
        <input type="text" value={address} onChange={handleAddressChange} />

        <label>Pincode:</label>
        <input type="number" value={pincode} onChange={handlePincodeChange} />
        <div
          style={{
            position: "absolute",
            right: 30,
            bottom: 20,
            textAlign: "right",
            width: "100%",
          }}
        >
          <button type="submit">Register</button>
          <button type="button" onClick={loginButtonHandler}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
