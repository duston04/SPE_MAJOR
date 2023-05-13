import UtilitiesKeys from "../UtilitiesKeys/UtilitiesKeys";

const getSpaceTrimmedLenght = (stringToMeasure) => {
  const lengthOfSpace = stringToMeasure.replace(/\s/g, "").length;
  return lengthOfSpace;
};

const saveUserLoginData = (userLoginData) => {
  localStorage.setItem("userid", userLoginData.username);
  localStorage.setItem("token", userLoginData.token);
};

const getLoggedInUserID = () => {
  return localStorage.getItem("userid");
};

const getJWTToken = () => {
  return localStorage.getItem("token");
};

const getSuccessDisplayMessageList = (displayMessage) => {
  return {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: displayMessage,
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().successKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
  };
};

const getErrorDisplayMessageList = (displayMessage) => {
  return {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
    displayMessage,
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
      UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };
};

const UtilitiesMethods = {
  getSpaceTrimmedLenght,
  saveUserLoginData,
  getLoggedInUserID,
  getJWTToken,
  getSuccessDisplayMessageList,
  getErrorDisplayMessageList
};

export default UtilitiesMethods;
