import UtilitiesKeys from "../UtilitiesKeys/UtilitiesKeys";

//Create User Options Keys...
const getRegisterUserInitialData = () => {
  return {
    username: "",
    password: "",
    address: "",
    name: "",
    pincode: "",
    contact: "",
    usertype: "consumer",
  };
};

const checkAddUserDataValidations = (userData) => {
  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]: "warning",
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };

  //Validation for user contact number...
  if (
    userData["contact"].length !==
    parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userContactNumberLength
    )
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .phoneNumberNotValidMessage,
      },
    };
  }

  //Validation for user pincode...
  if (
    userData["pincode"].length !==
    parseInt(
      UtilitiesKeys.getInputFieldLengthValidationKeys().userPinCodeLength
    )
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          UtilitiesKeys.getGeneralValidationMessagesText()
            .pinCodeNotValidMessage,
      },
    };
  }

  return {
    ...validationData,
    ...{
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
    },
  };
};

const RegistrationUtility = {
  getRegisterUserInitialData,
  checkAddUserDataValidations,
};

export default RegistrationUtility;
