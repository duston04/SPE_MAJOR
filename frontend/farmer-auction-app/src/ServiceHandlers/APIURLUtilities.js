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
    getCustomerProfileDataKey : "customer/profile/",
    updateFarmerProfileDataKey : "farmer/update",
    updateCustomerProfileDataKey : "customer/update",
    getFarmerBiddersListPerBidKey : "farmer/customersPerBid/",
    getFarmerSellItemBidKey : "farmer/completeBid/",
    getFarmerDeleteBidKey : "farmer/deleteBid/",
    getFarmerExpiredAndDeletedBidsKey : "farmer/expiredAndDeletedBids/",
    getFarmerCompletedBidsKey : "farmer/completedBids/"
  };
};


//API Child URL Keys...
const getCustomerAPIChildURLKeys = () => {
  return {
    getActiveBidsListKey : "customer/activeBidsNotBiddedOn/",
    setPriceOfCustomerOnBidKey : "customer/setPrice",
    getCustomerExpiredAndDeletedBidsKey : "customer/deletedBidsForCustomer/",
    getCustomerWonBidsKey : "customer/getWonBiddings/",
    getCustomerActiveBidsKey : "customer/activeBidsForACustomer/",
  };
};

const APIURLUtilities = {
  getAPIChildURLKeys,
  getFarmerAPIChildURLKeys,
  getCustomerAPIChildURLKeys
};

export default APIURLUtilities;
