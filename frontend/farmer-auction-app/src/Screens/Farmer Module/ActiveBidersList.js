import React, { useEffect, useState } from "react";
import classes from "./ActiveBidersList.module.css";
import ActiveBidersCell from "./ActiveBidersCell";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";
import UtilitiesKeys from "../../Utilities/UtilitiesKeys/UtilitiesKeys";
// import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

// const items = [
//   {
//     name: "John Doe",
//     contact: "1234567890",
//     address: "123 Main Street",
//     pincode: "12345",
//     bid: "100",
//   },
//   {
//     name: "Jane Smith",
//     contact: "9876543210",
//     address: "456 Elm Street",
//     pincode: "67890",
//     bid: "200",
//   },
//   {
//     name: "Alice Johnson",
//     contact: "5555555555",
//     address: "789 Oak Avenue",
//     pincode: "54321",
//     bid: "150",
//   },
// ];

const ActiveBidersList = (props) => {
  const [bidersList, setBidersList] = useState([]);


  console.log("ActiveBidersList called");

  useEffect(() => {
    FarmerServiceHandler.getCurrentBidBiddersList({
      bidData: props.selectedBidData,
      bidersListResponseHandler: getFarmersActiveBidersListHandler,
    });
  }, [props.selectedBidData]);


  const getFarmersActiveBidersListHandler = (activeBidResponseData) => {

    if (activeBidResponseData.isBiddersListRecieved === false) {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          activeBidResponseData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }
    console.log("respone of activeBidResponseData.biddersListData called");

    console.log(activeBidResponseData.biddersListData);
    setBidersList(activeBidResponseData.biddersListData);


  //  console.log(bidersList);

  };


  return (
    <div className={classes.ActiveBidersListContainer}>
      <h2>Active Biders List</h2>

      <div className={classes.ActiveBidersList}>
        {bidersList.length === 0 && (
          <h4 style={{ textAlign: "center" }}>
            No active bidders to display. Please let someone to bid first.
          </h4>
        )}
        <ul>
          {bidersList.map((item, index) => (
            <li key={index}>
              <ActiveBidersCell item={item} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActiveBidersList;
