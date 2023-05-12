import React, { useEffect, useState } from "react";
import classes from "../Farmer Module/ExpiredBidList.module.css";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

const CustomerWonBidsList = (props) => {
  const [winningBidsList, setWinningBidsList] = useState([]);

  //Use Effect to download Farmers's Winning Bids List...
  useEffect(() => {
    FarmerServiceHandler.getCustomerWinningBidsData({
      getCustomerWonBidResponseHanlder: getCustomerWonBidResponseHanlder,
    });
  }, [props.wonListRefreshFlag]);

  //Response Hanlder to handle the response from the API...
  const getCustomerWonBidResponseHanlder = (winningBidsData) => {
    setWinningBidsList(winningBidsData.winningBidsList);
  };

  return (
    <div className={classes.ExpiredListContainer}>
      <h2>Won Bid List</h2>
      <div className={classes.ExpiredList}>
        {winningBidsList.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No won bids to display.</h2>
        )}

        <ul>
          {winningBidsList.map((item, index) => (
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
                <strong>Status : </strong> {item.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerWonBidsList;
