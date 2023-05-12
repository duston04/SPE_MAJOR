import React, { useEffect, useState } from "react";
import classes from "./CompletedBidList.module.css";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

const CompletedBidList = (props) => {
  const [completedBidsList, setCompletedBidsList] = useState([]);

  //Use Effect to download Farmers's Expired Bids List...
  useEffect(() => {
    FarmerServiceHandler.getFarmerCompletedBidsData({
      getFarmerCompletedBidsResponseHanlder:
        getFarmerCompletedBidsResponseHanlder,
    });
  }, [props.completedListRefreshFlag]);

  //Response Hanlder to handle the response from the API...
  const getFarmerCompletedBidsResponseHanlder = (completedBidsData) => {
    setCompletedBidsList(completedBidsData.completedBidsList);
  };

  return (
    <div className={classes.CompletedListContainer}>
      <h2>Completed List</h2>
      <div className={classes.CompletedList}>
        {completedBidsList.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No completed bids to display.</h2>
        )}

        <ul>
          {completedBidsList.map((item, index) => (
            <li key={index}>
              <div>
                <strong>Category : </strong> {item.category.type}
              </div>
              <div>
                <strong>Name : </strong> {item.category.subcategory}
              </div>
              <div>
                <strong>Quantity : </strong> {item.quantity}
              </div>
              <div>
                <strong>Base Price : </strong> {item.basePrice}
              </div>
              <div>
                <strong>Bid Winner Name : </strong> {item.finalCustomer.name}
              </div>
              <div>
                <strong>Bid Winning Price : </strong> {item.currentMaxBid}
              </div>
              <div>
                <strong>Status : </strong> {item.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompletedBidList;
