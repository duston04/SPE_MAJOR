import React, { useState } from "react";
import classes from "./Registration.module.css";
import RegistrationUtility from "../../Utilities/RegistrationUtility/RegistrationUtility";
import InputTextField from "../../UI Screen Components/InputTextField/InputTextField";

const Registration = (props) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  // const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  // const [userType, setUserType] = useState("consumer");

  const [registerUserData, setRegisterUserData] = useState(
    RegistrationUtility.getRegisterUserInitialData()
  );

  //Update User registration data...
  const setUserRegistrationData = (userData) => {
    setRegisterUserData((userRegisterData) => {
      console.log({ ...userRegisterData, ...userData });
      return { ...userRegisterData, ...userData };
    });
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserRegistrationData({ "usertype" : event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle registration logic here
  };
  const loginButtonHandler = () => {
    props.setScreen("Login");

    props.showBottomMessageBar({
      message: "Testing message",
      messageType: "info",
    });
  };

  return (
    <div className={classes.registration_form}>
    {/* code to removed from comment */}
      {/* <h1>Registration Form</h1> */}
      <form onSubmit={handleSubmit}>
        <label>User Type:</label>
        <select value={registerUserData["usertype"]} onChange={handleUserTypeChange}>
          <option value="consumer">Consumer</option>
          <option value="farmer">Farmer</option>
        </select>

        <div>
          <label>Username:</label>
          <InputTextField
            value={registerUserData["username"]}
            onChange={setUserRegistrationData}
            mappedKey="username"
          />

          <label>Name:</label>
          <InputTextField
            value={registerUserData["name"]}
            onChange={setUserRegistrationData}
            mappedKey="name"
          />
        </div>

        <label>Password:</label>
        <InputTextField
          value={registerUserData["password"]}
          onChange={setUserRegistrationData}
          mappedKey="password"
        />

        <label>Contact: </label>
        <input type="number" value={contact} onChange={handleContactChange} />

        <label>Address: </label>
        <InputTextField
          value={registerUserData["address"]}
          onChange={setUserRegistrationData}
          mappedKey="address"
        />

        <label>Pincode: </label>
        <input type="number" value={pincode} onChange={handlePincodeChange} />

        <div
          style={{
            position: "absolute",
            left: 10,
            bottom: 20,
            textAlign: "center",
            width: "100%",
            justifyContent: "space-evenly",
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
