import React from "react";
import classes from "./NavBar.module.css";

const APP_NAME = "HealthCentral";
const NavBar = (props) => {
  return (
    <span className={classes.NavBar}>
      <img className={classes.logo} src={require("../../Assets/logo.png")} />
      <img
        className={classes.AppName}
        src={require("../../Assets/appName.png")}
      />

      {/* <button
        value={props.value}
        className={classes.back_btn}
        onClick={props.onClick}
      >
        {props.value}
      </button> */}
    </span>
  );
};

export default NavBar;
