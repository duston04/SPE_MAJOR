import GlobalServiceHandler from "../GlobalServiceHandlers";
import APIURLUtilities from "../APIURLUtilities";
import UtilitiesMethods from "../../Utilities/UtilitiesMethods/UtilitiesMethods";

//Get All Users List In Admin Menu API Handler Method...
const getCustomerBuyNewBidsData = async (props) => {
  const childURL =
    APIURLUtilities.getCustomerAPIChildURLKeys().getActiveBidsListKey +
    UtilitiesMethods.getLoggedInUserID();

  console.log(childURL);

  await GlobalServiceHandler.hitCustomResponseGetService({
    childURL: childURL,
    responseDataHandler: (buyNewBidsResponseData) => {
      console.log("buyNewBidsResponseData");
      console.log(buyNewBidsResponseData.responseData);

      if (buyNewBidsResponseData.responseError === null) {
        props.getCustomerBuyNewBidListHandler({
          isNewBidsListRecieved: true,
          newBidsData: buyNewBidsResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (buyNewBidsResponseData.responseData === null) {
        props.getCustomerBuyNewBidListHandler({
          isNewBidsListRecieved: false,
          newBidsData: [],
          errorMessage: buyNewBidsResponseData.responseError.message,
        });
      }
    },
  });
};

//Get All Users List In Admin Menu API Handler Method...
const setPriceForCustomerBidData = async (props) => {
  const childURL =
    APIURLUtilities.getCustomerAPIChildURLKeys().setPriceOfCustomerOnBidKey;

  const bidDataToServer = {
    bid: { bidId: props.bidData.bidId },
    customer: { username: UtilitiesMethods.getLoggedInUserID() },
    price: props.bidData.customerPrice,
  };

  await GlobalServiceHandler.hitCustomResponsePostService({
    childURL: childURL,
    postData: bidDataToServer,
    responseDataHandler: (setBidPriceResponseData) => {
      if (setBidPriceResponseData.responseError === null) {
        props.setBidPriceByCustomerResponseHanlder({
          isBidPriceSet: true,
          setBidPriceData: setBidPriceResponseData.responseData.data,
          errorMessage: null,
        });
      } else if (setBidPriceResponseData.responseData === null) {
        props.setBidPriceByCustomerResponseHanlder({
          isBidPriceSet: false,
          setBidPriceData: [],
          errorMessage: setBidPriceResponseData.responseError.message,
        });
      }
    },
  });
};


const getCustomerWinningBidsData = async (props) => {
    console.log("getCustomerWinningBidsData");
    const childURL =
      APIURLUtilities.getCustomerAPIChildURLKeys().getCustomerWonBidsKey +
      UtilitiesMethods.getLoggedInUserID();
    
    console.log(childURL);
  
    await GlobalServiceHandler.hitCustomResponseGetService({
      childURL: childURL,
      responseDataHandler: (winningBidsResponseData) => {
        if (winningBidsResponseData.responseError === null) {
          props.getCustomerWonBidResponseHanlder({
            winningBidsList: winningBidsResponseData.responseData.data,
          });
        } else if (winningBidsResponseData.responseData === null) {
          props.getCustomerWonBidResponseHanlder({
            winningBidsList: [],
          });
        }
      },
    });
  };



  const getCustomerActiveBidsData = async (props) => {
    console.log("getCustomerActiveBidsData");
    const childURL =
      APIURLUtilities.getCustomerAPIChildURLKeys().getCustomerActiveBidsKey +
      UtilitiesMethods.getLoggedInUserID();
    
    console.log(childURL);
  
    await GlobalServiceHandler.hitCustomResponseGetService({
      childURL: childURL,
      responseDataHandler: (activeBidsResponseData) => {
        if (activeBidsResponseData.responseError === null) {
          props.getCustomerBidsResponseHanlder({
            bidsList: activeBidsResponseData.responseData.data,
          });
        } else if (activeBidsResponseData.responseData === null) {
          props.getCustomerBidsResponseHanlder({
            bidsList: [],
          });
        }
      },
    });
  };

// //Getting the bidders list for the current active bid...
// const getCurrentBidBiddersList = async (props) => {
//   console.log("getCurrentBidBiddersList");

//   console.log(props.bidData);

//   const childURL =
//     APIURLUtilities.getFarmerAPIChildURLKeys().getFarmerBiddersListPerBidKey +
//     props.bidData.bidId;

//   console.log(childURL);

//   // bidData: props.selectedBidData,
//   // bidersListResponseHandler: getFarmersActiveBidersListHandler,

//   // return;

//   await GlobalServiceHandler.hitCustomResponseGetService({
//     childURL: childURL,
//     responseDataHandler: (biddersListResponseData) => {
//       console.log("biddersListResponseData");
//       console.log(biddersListResponseData.responseData);

//       if (biddersListResponseData.responseError === null) {
//         props.bidersListResponseHandler({
//           isBiddersListRecieved: true,
//           biddersListData: biddersListResponseData.responseData.data,
//           errorMessage: null,
//         });
//       } else if (biddersListResponseData.responseData === null) {
//         props.bidersListResponseHandler({
//           isBiddersListRecieved: false,
//           biddersListData: [],
//           errorMessage: biddersListResponseData.responseError.message,
//         });
//       }
//     },
//   });
// };

// const getUserProfileData = async (props) => {
//   console.log("GetSuperAdminAllRegisteredUserList");

//   console.log(props.isFarmerProfile);

//   const childURL = props.isFarmerProfile
//     ? APIURLUtilities.getFarmerAPIChildURLKeys().getFarmerProfileDataKey
//     : APIURLUtilities.getFarmerAPIChildURLKeys().getCustomerProfileDataKey +
//       UtilitiesMethods.getLoggedInUserID();

//   console.log(childURL);

//   await GlobalServiceHandler.hitCustomResponseGetService({
//     childURL: childURL,
//     responseDataHandler: (userProfileResponseData) => {
//       console.log("userProfileResponseData");
//       console.log(userProfileResponseData.responseData);

//       if (userProfileResponseData.responseError === null) {
//         props.fetchProfileDataResponseHandler({
//           isProfileDataRecieved: true,
//           userProfileData: userProfileResponseData.responseData.data,
//           errorMessage: null,
//         });
//       } else if (userProfileResponseData.responseData === null) {
//         props.fetchProfileDataResponseHandler({
//           isBidAddedFlag: false,
//           userProfileData: null,
//           errorMessage: userProfileResponseData.responseError.message,
//         });
//       }
//     },
//   });
// };

// const updateFarmerProfileData = async (props) => {
//   const childURL = +(props.isFarmerProfile === true)
//     ? APIURLUtilities.getFarmerAPIChildURLKeys().updateFarmerProfileDataKey
//     : APIURLUtilities.getFarmerAPIChildURLKeys().updateCustomerProfileDataKey;

//   const userProfileData = {
//     userId: props.userProfileData.userId,
//     username: props.userProfileData.username,
//     password: props.userProfileData.password,
//     name: props.userProfileData.name,
//     address: props.userProfileData.address,
//     pincode: props.userProfileData.pincode,
//     contact: props.userProfileData.contact,
//   };

//   await GlobalServiceHandler.hitPutService({
//     childURL: childURL,
//     postData: userProfileData,
//     responseDataHandler: (updatedProfileResponseData) => {
//       if (updatedProfileResponseData.responseError === null) {
//         props.updateProfileDataResponseHandler({
//           isProfileUpdatedFlag: true,
//           updateProfileData: updatedProfileResponseData.responseData.data,
//           errorMessage: null,
//         });
//       } else if (updatedProfileResponseData.responseData === null) {
//         props.updateProfileDataResponseHandler({
//           isProfileUpdatedFlag: false,
//           updateProfileData: null,
//           errorMessage: updatedProfileResponseData.responseError.message,
//         });
//       }
//     },
//   });
// };

// const addFarmerNewBid = async (props) => {
//   const childURL =
//     APIURLUtilities.getFarmerAPIChildURLKeys().getAddBidKey +
//     UtilitiesMethods.getLoggedInUserID();

//   const postData = { category: props.categoryData, ...props.bidData };

//   await GlobalServiceHandler.hitCustomResponsePostService({
//     childURL: childURL,
//     postData: postData,
//     responseDataHandler: (addBidServiceData) => {
//       if (addBidServiceData.responseError === null) {
//         props.addFarmerNewBidResponseHandler({
//           isBidAddedFlag: true,
//           addedBidData: addBidServiceData.responseData.data,
//           errorMessage: null,
//         });
//       } else if (addBidServiceData.responseData === null) {
//         props.addFarmerNewBidResponseHandler({
//           isBidAddedFlag: false,
//           addedBidData: null,
//           errorMessage: addBidServiceData.responseError.message,
//         });
//       }
//     },
//   });
// };

const CustomerServiceHandler = {
  getCustomerBuyNewBidsData,
  setPriceForCustomerBidData,
  getCustomerWinningBidsData,
  getCustomerActiveBidsData
  //   getAllActiveListsData,
  //   addFarmerNewBid,
  //   getUserProfileData,
  //   updateFarmerProfileData,
  //   getCurrentBidBiddersList,
};

export default CustomerServiceHandler;
