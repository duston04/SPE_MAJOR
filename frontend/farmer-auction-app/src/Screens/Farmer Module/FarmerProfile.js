import React, { useEffect, useState } from "react";
import classes from "./FarmerProfile.module.css";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";
import UtilitiesKeys from "../../Utilities/UtilitiesKeys/UtilitiesKeys";
import InputTextField from "../../UI Screen Components/InputTextField/InputTextField";
import InputNumericTextField from "../../UI Screen Components/InputNumber/InputNumericTextField";
import RegistrationUtility from "../../Utilities/RegistrationUtility/RegistrationUtility";

const FarmerProfile = (props) => {
  const [isFarmerProfile, setIsFarmerProfile] = useState(
    props.isFarmerLoggedIn
  );
  const [userProfile, setUserProfile] = useState({});
  const [fetchProfileFlag, setFetchProfileFlag] = useState(false);

  useEffect(() => {
    FarmerServiceHandler.getUserProfileData({
      isFarmerProfile: isFarmerProfile,
      fetchProfileDataResponseHandler: fetchProfileDataResponseHandler,
    });
  }, [fetchProfileFlag]);

  const invertFetchUserProfileFlag = () => {
    setFetchProfileFlag((isFetchFlag) => {
      return !isFetchFlag;
    });
  };

  const fetchProfileDataResponseHandler = (userProfileData) => {
    if (userProfileData.isBidAddedFlag === false) {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          userProfileData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }
    parseProfileData(userProfileData.userProfileData);
  };

  const parseProfileData = (profileData) => {
    setIsFarmerProfile(profileData.role === "ROLE_FARMER" ? true : false);
    setUserProfile(profileData);
    setUserProfile((oldProfile) => {
      return { ...oldProfile, ...{ password: "" } };
    });
  };

  //Update User registration data...
  const setUserRegistrationData = (userData) => {
    setUserProfile((userProfileData) => {
      return { ...userProfileData, ...userData };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userValidationData =
      RegistrationUtility.checkAddUserDataValidations(userProfile);

    if (
      userValidationData[
        UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
      ] === true
    ) {
      props.showBottomMessageBar(userValidationData);
      return;
    }

    FarmerServiceHandler.updateFarmerProfileData({
      isFarmerProfile: isFarmerProfile,
      userProfileData: userProfile,
      updateProfileDataResponseHandler: updateProfileDataResponseHandler,
    });
  };

  const updateProfileDataResponseHandler = (updatedData) => {
    if (updatedData.isProfileUpdatedFlag === false) {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          updatedData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }
    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "User Profile Data updated successfully.",
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        UtilitiesKeys.getAlertMessageTypeKeys().successKey,
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
    });
    invertFetchUserProfileFlag();
  };


  const headerTitle = (isFarmerProfile === true) ? "Farmer Profile": "Customer Profile";

  return (
    <div className={classes.registration_form}>
      <h1>{headerTitle}</h1>
      <form onSubmit={handleSubmit}>
        {/* User Profile Name Text Field */}
        <label>Name:</label>
        <InputTextField
          value={userProfile["name"]}
          onChange={setUserRegistrationData}
          mappedKey="name"
          placeHolder="Name"
        />

        {/* User Profile Password Text Field */}
        <label>Password:</label>
        <InputTextField
          value={userProfile["password"]}
          onChange={setUserRegistrationData}
          mappedKey="password"
          placeHolder="Password"
          isRequired={false}
        />

        {/* User Profile Contact Number Text Field */}
        <label>Contact: </label>
        <InputNumericTextField
          value={userProfile["contact"]}
          onChange={setUserRegistrationData}
          mappedKey="contact"
          placeHolder="Contact Number"
          requiredLength="10"
        />

        {/* User Profile Address Text Field */}
        <label>Address: </label>
        <InputTextField
          value={userProfile["address"]}
          onChange={setUserRegistrationData}
          mappedKey="address"
          placeHolder="Address"
        />

        {/* User Profile Pin Code Text Field */}
        <label>Pincode: </label>
        <InputNumericTextField
          value={userProfile["pincode"]}
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
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default FarmerProfile;
