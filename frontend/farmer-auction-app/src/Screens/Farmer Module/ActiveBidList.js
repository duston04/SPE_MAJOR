import React, { useEffect, useState } from "react";
import classes from "./ActiveBidList.module.css";
import ActiveBidCell from "./ActiveBidCell";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

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
    status: "sold",
    name_of_highest_bidder: "none",
  },
  {
    category: "fruit",
    name: "Mango",
    quantity: "1 Kg",
    base_price: "4.00",
    active_bid: "5.50",
    expired_bid: "none",
    status: "sold",
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

const ActiveBidList = (props) => {
  const [activeBidsList, setActiveBidsList] = useState([]);

  useEffect(() => {
    props.setShowBidersList(false);
    console.log("Use Effect running in active bids list page...");
    FarmerServiceHandler.getAllActiveListsData({
      getFarmersActiveBidListHandler: getFarmersActiveBidListHandler,
    });
  }, [props.activeListPageRefreshFlag]);

  const getFarmersActiveBidListHandler = (activeBidResponseData) => {
    console.log("Active List Data Recieved");
    console.log(activeBidResponseData.activeBidsData);
    setActiveBidsList(activeBidResponseData.activeBidsData);
    setActiveBidsList(items);
  };

  return (
    <div className={classes.ActiveListContainer}>
      <h2>Active List</h2>

      <div className={classes.ActiveList}>
        {activeBidsList.length === 0 && (
          <h2 style={{ textAlign: "center" }}>
            No active bids to display. Please add a bid.
          </h2>
        )}
        <ul>
          {activeBidsList.map((item, index) => (
            <li key={index}>
              <ActiveBidCell
                setShowBidersList={props.setShowBidersList}
                item={item}
                index={index}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActiveBidList;
