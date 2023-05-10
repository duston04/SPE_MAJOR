import GlobalServiceHandler from "../GlobalServiceHandlers";
import APIURLUtilities from "../APIURLUtilities";
import UtilitiesMethods from "../../Utilities/UtilitiesMethods/UtilitiesMethods";

//Get All Users List In Admin Menu API Handler Method...
const getAllActiveListsData = async (props) => {
  console.log("GetSuperAdminAllRegisteredUserList");

  // var hospitalID = "1";

  // admin/getAllHospitalUsers/{adminUsername}

  const childURL =
    APIURLUtilities.getAPIChildURLKeys().getActiveListKey +
    UtilitiesMethods.getLoggedInUserID();

  console.log(childURL);
  // return;

  await GlobalServiceHandler.hitGetServiceWithOutBearer({
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



const addFarmerNewBid = async (props) => {
  const childURL =
    APIURLUtilities.getFarmerAPIChildURLKeys().getAddBidKey +
    UtilitiesMethods.getLoggedInUserID();

  const postData = { category: props.categoryData, ...props.bidData };

  await GlobalServiceHandler.hitPostServiceWithOutBearer({
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
};

export default FarmerServiceHandler;
