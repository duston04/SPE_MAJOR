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

const UtilitiesMethods = {
  getSpaceTrimmedLenght,
  saveUserLoginData,
  getLoggedInUserID,
  getJWTToken
};

export default UtilitiesMethods;
