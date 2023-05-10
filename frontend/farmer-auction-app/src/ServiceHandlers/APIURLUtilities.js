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

//API Child URL Keys...
const getFarmerAPIChildURLKeys = () => {
  return {
    getAddBidKey : "farmer/addBid/",
    getFarmerProfileDataKey : "farmer/profile/",
    updateFarmerProfileDataKey : "farmer/update"
  };
};

const APIURLUtilities = {
  getAPIChildURLKeys,
  getFarmerAPIChildURLKeys
};

export default APIURLUtilities;
