import { useState } from "react";
import Login from "./Login Module/Login";
import classes from "./application.module.css";
import Registration from "./Register Module/Registration";
import NavBar from "../UI Screen Components/NavBar/NavBar";

const Application = () => {
  const [initialScreen, setInitialScreen] = useState("Login");

  return (
    <div className={classes.bg_container}>
      {initialScreen === "Login" && (
        <Login setInitialScreen={setInitialScreen} />
      )}
      {initialScreen === "SignUp" && (
        <Registration setInitialScreen={setInitialScreen} />
      )}
    </div>
  );
};

export default Application;
