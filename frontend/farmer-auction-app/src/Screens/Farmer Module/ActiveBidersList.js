import React, { useEffect, useState } from "react";
import classes from "./ActiveBidersList.module.css";
import ActiveBidersCell from "./ActiveBidersCell";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

const items = [
  {
    name: "John Doe",
    contact: "1234567890",
    address: "123 Main Street",
    pincode: "12345",
    bid: "100",
  },
  {
    name: "Jane Smith",
    contact: "9876543210",
    address: "456 Elm Street",
    pincode: "67890",
    bid: "200",
  },
  {
    name: "Alice Johnson",
    contact: "5555555555",
    address: "789 Oak Avenue",
    pincode: "54321",
    bid: "150",
  },
];

const ActiveBidersList = (props) => {
  const [activeBidersList, setActiveBidersList] = useState([]);

  useEffect(() => {
    console.log("Use Effect running in active bids list page...");
    // FarmerServiceHandler.getAllActiveListsData({
    //   getFarmersActiveBidersListHandler: getFarmersActiveBidersListHandler,
    // });
    setActiveBidersList(items);
  }, [props.activeListPageRefreshFlag]);

  const getFarmersActiveBidersListHandler = (activeBidResponseData) => {
    console.log("ActiveBiders List Data Recieved");
    console.log(activeBidResponseData.activeBidsData);
    // setActiveBidersList(activeBidResponseData.activeBidsData);
  };

  return (
    <div className={classes.ActiveBidersListContainer}>
      <h2>Active Biders List</h2>

      <div className={classes.ActiveBidersList}>
        {activeBidersList.length === 0 && (
          <h2 style={{ textAlign: "center" }}>
            No active bids to display. Please add a bid.
          </h2>
        )}
        <ul>
          {activeBidersList.map((item, index) => (
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
