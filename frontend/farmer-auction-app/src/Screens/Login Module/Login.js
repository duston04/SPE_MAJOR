import React, { useState } from "react";
import classes from "./Login.module.css";
import InputTextField from "../../UI Screen Components/InputTextField/InputTextField";
import LoginUtility from "../../Utilities/LoginUtility/LoginUtility";
import LoginUserHandler from "../../ServiceHandlers/LoginUserHandler/LoginUserHandler";
import UtilitiesKeys from "../../Utilities/UtilitiesKeys/UtilitiesKeys";

const Login = (props) => {
  const [userType, setUserType] = useState("consumer");

  const [userLoginData, setUserLoginData] = useState(
    LoginUtility.getUserLoginInitialData()
  );

  //Update User registration data...
  const updatedUserLoginDataHandler = (userData) => {
    setUserLoginData((userLoginData) => {
      return { ...userLoginData, ...userData };
    });
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    updatedUserLoginDataHandler({
      role: event.target.value === "farmer" ? "ROLE_FARMER" : "ROLE_CUSTOMER",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    LoginUserHandler.getLoginUserData({
      loginUserData: userLoginData,
      loginUserResponseHandler: loginUserResponseHandler,
    });
  };


  const loginUserResponseHandler = (userLoginResponseData) => {
    if (userLoginResponseData.isUserLoggedInFlag === false) {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        userLoginResponseData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      });
      return;
    }

    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
      "User logged In Successfully.",
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        UtilitiesKeys.getAlertMessageTypeKeys().successKey,
    });

    setUserLoginData(LoginUtility.getUserLoginInitialData());
    props.setScreen("Farmer Dashboard");
  };


  const handleSignup = () => {
    props.setScreen("SignUp");
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
          <InputTextField
            value={userLoginData["username"]}
            onChange={updatedUserLoginDataHandler}
            mappedKey="username"
            placeHolder="Username"
          />

          <label>password:</label>
          <InputTextField
            type="password"
            value={userLoginData["password"]}
            onChange={updatedUserLoginDataHandler}
            mappedKey="password"
            placeHolder="Password"
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
