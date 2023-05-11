import { useState, useEffect } from "react";
import Login from "./Login Module/Login";
import classes from "./application.module.css";
import Registration from "./Register Module/Registration";
import NavBars from "../UI Screen Components/NavBar/NavBar";
import FarmerDashBoard from "./Farmer Module/FarmerDashBoard";
import CustomerDashBoard from "./Consumer Module/CustomerDashBoard";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Application = () => {
  const [screen, setScreen] = useState("Login");
  const [farmerScreen, setFarmerScreen] = useState("Active List");
  const [customerScreen, setCustomerScreen] = useState("Active List");

  //Meesage Alert Props...
  const [alertFlag, setAlertFlag] = useState(false);
  const [isFarmerScreen, setIsFarmerScreen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertInfo, setAlertInfo] = useState("info");

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setAlertFlag(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [alertFlag]);

  const showBottomMessageBar = (errorMessageData) => {
    console.log("**************************************");
    console.log(errorMessageData);
    setAlertInfo(errorMessageData["messageType"]);
    setAlertMessage(errorMessageData["message"]);
    setAlertFlag(true);
  };

  const setIsFarmerScreenOpened = (isFramerOptionSelected) => {
    setIsFarmerScreen(isFramerOptionSelected);
  };

  return (
    <div className={classes.bg_container}>
      {/* {alertFlag === true && (
        <Snackbar open={alertFlag}>
          <Alert severity={alertInfo} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )} */}
      {screen === "Login" && (
        <Login
          setScreen={setScreen}
          showBottomMessageBar={showBottomMessageBar}
          setIsFarmerScreenOpened={setIsFarmerScreenOpened}
        />
      )}
      {screen === "SignUp" && (
        <Registration
          setScreen={setScreen}
          showBottomMessageBar={showBottomMessageBar}
        />
      )}
      {screen === "Farmer Dashboard" && (
        <FarmerDashBoard
          setScreen={setScreen}
          farmerScreen={farmerScreen}
          showBottomMessageBar={showBottomMessageBar}
          isFarmerLoggedIn={isFarmerScreen}
        />
      )}
      {screen === "Customer Dashboard" && (
        <CustomerDashBoard
          setScreen={setScreen}
          customerScreen={customerScreen}
          showBottomMessageBar={showBottomMessageBar}
          isFarmerLoggedIn={isFarmerScreen}
        />
      )}
      {screen === "Login" || screen === "SignUp" ? (
        <NavBars.NavBar />
      ) : (
        <NavBars.NavBar2
          value="Logout"
          onClick={() => {
            setScreen("Login");
            setFarmerScreen("Active List");
            setCustomerScreen("Customer BuyNewItem List");
          }}
          userScreenType={screen}
          setFarmerScreen={setFarmerScreen}
          setCustomerScreen={setCustomerScreen}
        />
      )}
      {alertFlag === true && (
        <Snackbar open={alertFlag}>
          <Alert severity={alertInfo} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Application;
