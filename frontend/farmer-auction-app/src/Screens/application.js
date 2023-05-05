import { useState } from "react";
import Login from "./Login Module/Login";
import classes from "./application.module.css";
import Registration from "./Register Module/Registration";
import NavBars from "../UI Screen Components/NavBar/NavBar";
import FarmerDashBoard from "./Farmer Module/FarmerDashBoard";

const Application = () => {
  const [screen, setScreen] = useState("Login");
  const [userScreenType, setUserScreenType] = useState("");
  const [farmerScreen, setFarmerScreen] = useState("Active List");

  return (
    <div className={classes.bg_container}>
      {screen === "Login" && (
        <Login setScreen={setScreen} setUserScreenType={setUserScreenType} />
      )}
      {screen === "SignUp" && <Registration setScreen={setScreen} />}
      {screen === "Farmer Dashboard" && (
        <FarmerDashBoard setScreen={setScreen} farmerScreen={farmerScreen} />
      )}
      {screen === "Login" || screen === "SignUp" ? (
        <NavBars.NavBar />
      ) : (
        <NavBars.NavBar2
          value="Logout"
          onClick={() => {
            setScreen("Login");
          }}
          userScreenType={userScreenType}
          setFarmerScreen={setFarmerScreen}
        />
      )}
    </div>
  );
};

export default Application;
