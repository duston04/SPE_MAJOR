import CustomerActiveBidList from "./CustomerActiveBidList";
import CustomerCompletedBidList from "./CustomerCompletedBidList";
import React, { useEffect, useState } from "react";
import CustomerProfile from "./CustomerProfile";
import CustomerBuyNewItemList from "./CustomerBuyNewItemList";

const items = [
  {
    category: "fruit",
    name: "Banana",
    quantity: "2 bunches",
    base_price: "5.00",
    active_bid: "6.50",
    expired_bid: "none",
    status: "available",
    name_of_highest_bidder: "none",
  },
  {
    category: "vegetable",
    name: "Potato",
    quantity: "5 Kg",
    base_price: "3.00",
    active_bid: "4.25",
    expired_bid: "none",
    status: "available",
    name_of_highest_bidder: "none",
  },
  {
    category: "fruit",
    name: "Grapes",
    quantity: "1 Kg",
    base_price: "2.50",
    active_bid: "none",
    expired_bid: "none",
    status: "sold",
    name_of_highest_bidder: "John Doe",
  },
  {
    category: "vegetable",
    name: "Onion",
    quantity: "3 Kg",
    base_price: "2.00",
    active_bid: "2.75",
    expired_bid: "none",
    status: "available",
    name_of_highest_bidder: "none",
  },
  {
    category: "fruit",
    name: "Mango",
    quantity: "1 Kg",
    base_price: "4.00",
    active_bid: "5.50",
    expired_bid: "none",
    status: "available",
    name_of_highest_bidder: "none",
  },
  {
    category: "vegetable",
    name: "Tomato",
    quantity: "2 Kg",
    base_price: "2.50",
    active_bid: "none",
    expired_bid: "none",
    status: "sold",
    name_of_highest_bidder: "Jane Smith",
  },
];
const CustomerDashBoard = (props) => {
  const [activeListPageRefreshFlag, setActiveListPageRefreshFlag] =
    useState(false);

  const showBottomMessageBar = (errorMessageData) => {
    props.showBottomMessageBar(errorMessageData);
  };

  const invertDownloadActiveListFlag = () => {
    setActiveListPageRefreshFlag((isRefresh) => {
      return !isRefresh;
    });
  };

  useEffect(() => {
    if (props.customerScreen === "Customer BuyNewItem List") {
      invertDownloadActiveListFlag();
    }
  }, [props.customerScreen]);

  if (props.customerScreen === "Customer Profile")
    return (
      <>
        <CustomerProfile />
      </>
    );
  else if (props.customerScreen === "Customer BuyNewItem List")
    return (
      <>
        <CustomerBuyNewItemList />
      </>
    );
  else if (props.customerScreen === "Customer Completed List")
    return (
      <>
        <CustomerCompletedBidList />
      </>
    );
  else
    return (
      <>
        <CustomerActiveBidList
          activeListPageRefreshFlag={activeListPageRefreshFlag}
          showBottomMessageBar={showBottomMessageBar}
        />
      </>
    );
};
export default CustomerDashBoard;
