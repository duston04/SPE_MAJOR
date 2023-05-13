import React, { useState } from "react";
import classes from "./Registration.module.css";
import RegistrationUtility from "../../Utilities/RegistrationUtility/RegistrationUtility";
import InputTextField from "../../UI Screen Components/InputTextField/InputTextField";
import InputNumericTextField from "../../UI Screen Components/InputNumber/InputNumericTextField";
import UtilitiesKeys from "../../Utilities/UtilitiesKeys/UtilitiesKeys";
import RegisterUserHandler from "../../ServiceHandlers/RegisterUserHandler/RegisterUserHandler";

const Registration = (props) => {
  const [registerUserData, setRegisterUserData] = useState(
    RegistrationUtility.getRegisterUserInitialData()
  );

  //Update User registration data...
  const setUserRegistrationData = (userData) => {
    console.log(registerUserData);
    setRegisterUserData((userRegisterData) => {
      console.log({ ...userRegisterData, ...userData });
      return { ...userRegisterData, ...userData };
    });
  };

  const handleUserTypeChange = (event) => {
    setUserRegistrationData({ usertype: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userValidationData =
      RegistrationUtility.checkAddUserDataValidations(registerUserData);

    if (
      userValidationData[
        UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
      ] === true
    ) {
      props.showBottomMessageBar(userValidationData);
      return;
    }

    RegisterUserHandler.getRegisterUserData({
      registerUserData: registerUserData,
      registerUserResponseHandler: registerUserResponseHandler,
    });
  };

  const registerUserResponseHandler = (registerUserResponseData) => {
    if (registerUserResponseData.isUserRegisteredFlag === false) {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          registerUserResponseData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
      return;
    }

    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "User registered successfully. Please login to proceed.",
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        UtilitiesKeys.getAlertMessageTypeKeys().successKey,
    });

    setUserRegistrationData(RegistrationUtility.getRegisterUserInitialData());
  };

  const loginButtonHandler = () => {
    props.setScreen("Login");
  };

  return (
    <div className={classes.registration_form}>
      {/* code to removed from comment */}
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>User Type:</label>
        <select
          value={registerUserData["usertype"]}
          onChange={handleUserTypeChange}
        >
          <option value="consumer">Consumer</option>
          <option value="farmer">Farmer</option>
        </select>

        <label>Username:</label>
        <InputTextField
          value={registerUserData["username"]}
          onChange={setUserRegistrationData}
          mappedKey="username"
          placeHolder="Username"
        />

        <label>Name:</label>
        <InputTextField
          value={registerUserData["name"]}
          onChange={setUserRegistrationData}
          mappedKey="name"
          placeHolder="Name"
        />

        <label>Password:</label>
        <InputTextField
          value={registerUserData["password"]}
          onChange={setUserRegistrationData}
          mappedKey="password"
          placeHolder="Password"
        />

        <label>Contact:</label>
        <InputNumericTextField
          value={registerUserData["contact"]}
          onChange={setUserRegistrationData}
          mappedKey="contact"
          placeHolder="Contact Number"
          requiredLength="10"
        />

        <label>Address: </label>
        <InputTextField
          value={registerUserData["address"]}
          onChange={setUserRegistrationData}
          mappedKey="address"
          placeHolder="Address"
        />

        <label>Pincode: </label>
        <InputNumericTextField
          value={registerUserData["pincode"]}
          onChange={setUserRegistrationData}
          mappedKey="pincode"
          placeHolder="Pincode"
          requiredLength="6"
        />

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
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
