//Create User Options Keys...
const getRegisterUserInitialData = () => {
  return {
    username: "",
    password: "",
    address: "",
    name: "",
    pincode: "",
    contact: "",
    usertype : "consumer"
  };
};

const RegistrationUtility = {
  getRegisterUserInitialData,
};

export default RegistrationUtility;
