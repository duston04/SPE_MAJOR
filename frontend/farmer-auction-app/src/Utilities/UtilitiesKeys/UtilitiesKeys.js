//Create User Form Input Field Label Keys...
const getErrorMessageDataKeys = () => {
    return {
      messageKey: "message",
      isErrorMessageKey: "isErrorMessage",
      messageType: "messageType",
    };
  };
  
  //Create User Form Input Field Label Keys...
  const getAlertMessageTypeKeys = () => {
    return {
      successKey: "success",
      warningKey: "warning",
      infoKey: "info",
      errorKey: "error",
    };
  };

  
//Input Field Lenght Validation Keys...
const getInputFieldLengthValidationKeys = () => {
    return {
      userPinCodeLength: "6",
      userContactNumberLength: "10",
    };
  };

  const getGeneralValidationMessagesText = () => {
    return {
      pinCodeNotValidMessage: "Please enter valid Pin Code. It must be of 6 digits.",
      phoneNumberNotValidMessage:
        "Please enter valid contact number. It must be of 10 digits.",
    };
  };
  
  const UtilitiesKeys = {
    getErrorMessageDataKeys,
    getAlertMessageTypeKeys,
    getInputFieldLengthValidationKeys,
    getGeneralValidationMessagesText
  };
  
  export default UtilitiesKeys;