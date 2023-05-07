import React from "react";
import classes from "./NavBar.module.css";
import { useState } from "react";

const APP_NAME = "HealthCentral";
const NavBar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

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

const NavBar2 = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  var NavigationOptions;
  // if (props.userType === "Farmer") {
  //   NavigationOptions = [{ option: "Active List" }, { option: "Expired List" }];
  // }
  //if (props.userType === "Consumer") {
  //   NavigationOptions = [{ option: "Active List" }, { option: "Expired List" }];
  // }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  NavigationOptions = [
    { option: "Active List" },
    { option: "Expired List" },
    { option: "Completed List" },
    { option: "Farmer Profile" },
  ];
  return (
    <span className={classes.NavBar}>
      {showMenu && (
        <div className={classes.menu}>
          {NavigationOptions.map((navOption) => (
            <button
              onClick={() => {
                props.setFarmerScreen(navOption.option);
                handleMenuToggle();
              }}
            >
              {navOption.option}
            </button>
          ))}
        </div>
      )}
      <button className={classes.menu_btn} onClick={handleMenuToggle}>
        <div className={classes.menu_icon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* <span className={classes.menu_label}>Menu</span> */}
      </button>
      <img
        className={classes.AppName}
        src={require("../../Assets/appName.png")}
      />

      <button
        value={props.value}
        className={classes.back_btn}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    </span>
  );
};

const NavBars = { NavBar, NavBar2 };

export default NavBars;
