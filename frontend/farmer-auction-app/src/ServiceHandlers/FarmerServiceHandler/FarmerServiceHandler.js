import GlobalServiceHandler from "../GlobalServiceHandlers";
import APIURLUtilities from "../APIURLUtilities";
import UtilitiesMethods from "../../Utilities/UtilitiesMethods/UtilitiesMethods";

//Get All Users List In Admin Menu API Handler Method...
const getAllActiveListsData = async (props) => {
  const childURL =
    APIURLUtilities.getAPIChildURLKeys().getActiveListKey +
    UtilitiesMethods.getLoggedInUserID();

  console.log(childURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: childURL,
    responseDataHandler: (activeBidsResponseData) => {
      console.log("activeBidsResponseData");
      console.log(activeBidsResponseData.responseData);

      if (activeBidsResponseData.responseError === null) {
        // console.log("error not null");
        props.getFarmersActiveBidListHandler({
          isActiveBidsListRecieved: true,
          activeBidsData: activeBidsResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (activeBidsResponseData.responseData === null) {
        props.getFarmersActiveBidListHandler({
          isActiveBidsListRecieved: false,
          activeBidsData: [],
          errorMessage: "Some error occured. Please try again later.",
        });
      }
    },
  });
};

const getUserProfileData = async (props) => {
  console.log("GetSuperAdminAllRegisteredUserList");

  console.log(props.isFarmerProfile);

  const childURL = props.isFarmerProfile
    ? APIURLUtilities.getFarmerAPIChildURLKeys().getFarmerProfileDataKey
    : APIURLUtilities.getFarmerAPIChildURLKeys().getCustomerProfileDataKey +
      UtilitiesMethods.getLoggedInUserID();

  console.log(childURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: childURL,
    responseDataHandler: (userProfileResponseData) => {
      console.log("userProfileResponseData");
      console.log(userProfileResponseData.responseData);

      if (userProfileResponseData.responseError === null) {
        props.fetchProfileDataResponseHandler({
          isProfileDataRecieved: true,
          userProfileData: userProfileResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (userProfileResponseData.responseData === null) {
        props.fetchProfileDataResponseHandler({
          isBidAddedFlag: false,
          userProfileData: null,
          errorMessage: userProfileResponseData.responseError.message,
        });
      }
    },
  });
};

const updateFarmerProfileData = async (props) => {
  const childURL = +(props.isFarmerProfile === true)
    ? APIURLUtilities.getFarmerAPIChildURLKeys().updateFarmerProfileDataKey
    : APIURLUtilities.getFarmerAPIChildURLKeys().updateCustomerProfileDataKey;

  const userProfileData = {
    userId: props.userProfileData.userId,
    username: props.userProfileData.username,
    password: props.userProfileData.password,
    name: props.userProfileData.name,
    address: props.userProfileData.address,
    pincode: props.userProfileData.pincode,
    contact: props.userProfileData.contact,
  };

  await GlobalServiceHandler.hitPutService({
    childURL: childURL,
    postData: userProfileData,
    responseDataHandler: (updatedProfileResponseData) => {
      if (updatedProfileResponseData.responseError === null) {
        props.updateProfileDataResponseHandler({
          isProfileUpdatedFlag: true,
          updateProfileData: updatedProfileResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (updatedProfileResponseData.responseData === null) {
        props.updateProfileDataResponseHandler({
          isProfileUpdatedFlag: false,
          updateProfileData: null,
          errorMessage: updatedProfileResponseData.responseError.message,
        });
      }
    },
  });
};

const addFarmerNewBid = async (props) => {
  const childURL =
    APIURLUtilities.getFarmerAPIChildURLKeys().getAddBidKey +
    UtilitiesMethods.getLoggedInUserID();

  const postData = { category: props.categoryData, ...props.bidData };

  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: childURL,
    postData: postData,
    responseDataHandler: (addBidServiceData) => {
      if (addBidServiceData.responseError === null) {
        props.addFarmerNewBidResponseHandler({
          isBidAddedFlag: true,
          addedBidData: addBidServiceData.responseData.data,
          errorMessage: null,
        });
      } else if (addBidServiceData.responseData === null) {
        props.addFarmerNewBidResponseHandler({
          isBidAddedFlag: false,
          addedBidData: null,
          errorMessage: addBidServiceData.responseError.message,
        });
      }
    },
  });
};

const FarmerServiceHandler = {
  getAllActiveListsData,
  addFarmerNewBid,
  getUserProfileData,
  updateFarmerProfileData,
};

export default FarmerServiceHandler;
