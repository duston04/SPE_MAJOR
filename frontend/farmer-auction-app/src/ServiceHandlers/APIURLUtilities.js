//########################## API Child URL's Keys  ##########################

//API Child URL Keys...
const getAPIChildURLKeys = () => {
  return {
    registerFarmerKey: "register/farmer",
    registerConsumerKey: "register/customer",
    loginUserKey: "login",
    getActiveListKey : "farmer/activeBids/"
  };
};

const APIURLUtilities = {
  getAPIChildURLKeys,
};

export default APIURLUtilities;
