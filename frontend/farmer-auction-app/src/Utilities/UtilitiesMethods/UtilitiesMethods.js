const getSpaceTrimmedLenght = (stringToMeasure) => {
  const lengthOfSpace = stringToMeasure.replace(/\s/g, "").length;
  return lengthOfSpace;
};

const saveUserLoginData = (userLoginData) => {
  localStorage.setItem("userid", userLoginData.loggedInUserData);
};

const getLoggedInUserID = () => {
  return localStorage.getItem("userid");
};

const UtilitiesMethods = {
  getSpaceTrimmedLenght,
  saveUserLoginData,
  getLoggedInUserID,
};

export default UtilitiesMethods;
