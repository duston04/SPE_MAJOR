import React, { useEffect, useState } from "react";
import classes from "./ActiveBidList.module.css";
import ActiveBidCell from "./ActiveBidCell";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";


const ActiveBidList = (props) => {
  const [activeBidsList, setActiveBidsList] = useState([]);

  useEffect(() => {
    console.log("Use Effect running in active bids list page...");
    FarmerServiceHandler.getAllActiveListsData({
      getFarmersActiveBidListHandler: getFarmersActiveBidListHandler,
    });
  }, [props.activeListPageRefreshFlag]);

  const getFarmersActiveBidListHandler = (activeBidResponseData) => {
    console.log("Active List Data Recieved");
    console.log(activeBidResponseData.activeBidsData);
    setActiveBidsList(activeBidResponseData.activeBidsData);
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
              <ActiveBidCell item={item} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActiveBidList;
