import React, { useEffect, useState } from "react";
import classes from "./CustomerActiveBidList.module.css";
import CustomerBuyNewItemCell from "./CustomerBuyNewItemCell";
import CustomerServiceHandler from "../../ServiceHandlers/CustomerServiceHandler/CustomerServiceHandler";
import UtilitiesKeys from "../../Utilities/UtilitiesKeys/UtilitiesKeys";
// import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

// const items = [
//   {
//     category: "fruit",
//     name: "Banana",
//     quantity: "2 bunches",
//     base_price: "5.00",
//     active_bid: "6.50",
//     expired_bid: "none",
//     status: "available",
//     name_of_highest_bidder: "none",
//   },
//   {
//     category: "vegetable",
//     name: "Potato",
//     quantity: "5 Kg",
//     base_price: "3.00",
//     active_bid: "4.25",
//     expired_bid: "none",
//     status: "available",
//     name_of_highest_bidder: "none",
//   },
//   {
//     category: "fruit",
//     name: "Grapes",
//     quantity: "1 Kg",
//     base_price: "2.50",
//     active_bid: "none",
//     expired_bid: "none",
//     status: "sold",
//     name_of_highest_bidder: "John Doe",
//   },
//   {
//     category: "vegetable",
//     name: "Onion",
//     quantity: "3 Kg",
//     base_price: "2.00",
//     active_bid: "2.75",
//     expired_bid: "none",
//     status: "sold",
//     name_of_highest_bidder: "none",
//   },
//   {
//     category: "fruit",
//     name: "Mango",
//     quantity: "1 Kg",
//     base_price: "4.00",
//     active_bid: "5.50",
//     expired_bid: "none",
//     status: "sold",
//     name_of_highest_bidder: "none",
//   },
//   {
//     category: "vegetable",
//     name: "Tomato",
//     quantity: "2 Kg",
//     base_price: "2.50",
//     active_bid: "none",
//     expired_bid: "none",
//     status: "sold",
//     name_of_highest_bidder: "Jane Smith",
//   },
// ];

const CustomerBuyNewItemList = (props) => {
  const [customerActiveBidsList, setCustomerActiveBidsList] = useState([]);

  useEffect(() => {
    //setCustomerActiveBidsList(items);
    console.log("Use Effect running in active bids list page...");

    CustomerServiceHandler.getCustomerActiveBidsData({
      getCustomerActiveBidListHandler: getCustomerActiveBidListHandler,
    });

    // FarmerServiceHandler.getAllActiveListsData({
    //   getFarmersCustomerActiveBidListHandler:
    //     getFarmersCustomerActiveBidListHandler,
    // });
  }, [props.activeListPageRefreshFlag]);

  const getCustomerActiveBidListHandler = (activeBidResponseData) => {
    console.log("Active List Data Recieved");
    console.log(activeBidResponseData.activeBidsData);

    //  isActiveBidsListRecieved: true,
    // activeBidsData: activeBidsResponseData.responseData.data,
    // errorMessage: null,
    // activeBidResponseData.errorMessage
    if (activeBidResponseData.isActiveBidsListRecieved === false) {
      props.showBottomMessageBar({[UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        activeBidResponseData.errorMessage,
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,});
    }
    // UtilitiesKeys
    setCustomerActiveBidsList(activeBidResponseData.activeBidsData);
    console.log(customerActiveBidsList);
  };

  return (
    <div className={classes.ActiveListContainer}>
      <h2>Buy New Item List</h2>

      <div className={classes.ActiveList}>
        {customerActiveBidsList.length === 0 && (
          <h2 style={{ textAlign: "center" }}>
            No active bids to display. Please add a bid.
          </h2>
        )}
        <ul>
          {customerActiveBidsList.map((item, index) => (
            <li key={index}>
              <CustomerBuyNewItemCell item={item} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerBuyNewItemList;
