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

//Getting the bidders list for the current active bid...
const getCurrentBidBiddersList = async (props) => {
  console.log("getCurrentBidBiddersList");

  console.log(props.bidData);

  const childURL =
    APIURLUtilities.getFarmerAPIChildURLKeys().getFarmerBiddersListPerBidKey +
    props.bidData.bidId;

  console.log(childURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: childURL,
    responseDataHandler: (biddersListResponseData) => {
      console.log("biddersListResponseData");
      console.log(biddersListResponseData.responseData);

      if (biddersListResponseData.responseError === null) {
        props.bidersListResponseHandler({
          isBiddersListRecieved: true,
          biddersListData: biddersListResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (biddersListResponseData.responseData === null) {
        props.bidersListResponseHandler({
          isBiddersListRecieved: false,
          biddersListData: [],
          errorMessage: biddersListResponseData.responseError.message,
        });
      }
    },
  });
};

//Getting the bidders list for the current active bid...
const sellItemBidByFarmer = async (props) => {

  console.log(props.itemData);

  // itemData: bidData,
  //     sellItemResponseHandler: sellItemResponseHandler

  const childURL =
    APIURLUtilities.getFarmerAPIChildURLKeys().getFarmerSellItemBidKey +
    props.itemData.customerBidId;

  console.log(childURL);

  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: childURL,
    postData : {},
    responseDataHandler: (sellBidResponseData) => {
      console.log("sellBidResponseData");
      console.log(sellBidResponseData.responseData);

      if (sellBidResponseData.responseError === null) {
        props.sellItemResponseHandler({
          isBidCompleted: true,
          // biddersListData: sellBidResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (sellBidResponseData.responseData === null) {
        props.sellItemResponseHandler({
          isBidCompleted: false,
          // biddersListData: [],
          errorMessage: sellBidResponseData.responseError.message,
        });
      }
    },
  });
};



//Getting the bidders list for the current active bid...
const deleteBidByFarmer = async (props) => {

  console.log(props.itemData);

  // itemData: bidData,
  //     sellItemResponseHandler: sellItemResponseHandler

  const childURL =
    APIURLUtilities.getFarmerAPIChildURLKeys().getFarmerDeleteBidKey +
    props.itemData.bidId;

  console.log(childURL);

  // return;

  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: childURL,
    postData : {},
    responseDataHandler: (deleteBidResponseData) => {
      console.log("deleteBidResponseData");
      console.log(deleteBidResponseData.responseData);

      if (deleteBidResponseData.responseError === null) {
        props.deleteBidResponseHandler({
          isBidDeleted: true,
          errorMessage: null,
        });
      } else if (deleteBidResponseData.responseData === null) {
        props.deleteBidResponseHandler({
          isBidDeleted: false,
          errorMessage: deleteBidResponseData.responseError.message,
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
  getCurrentBidBiddersList,
  sellItemBidByFarmer,
  deleteBidByFarmer
};

export default FarmerServiceHandler;
