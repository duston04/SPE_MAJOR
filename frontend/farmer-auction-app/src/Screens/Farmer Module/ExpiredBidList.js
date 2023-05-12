import React, { useEffect, useState } from "react";
import classes from "./ExpiredBidList.module.css";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

const ExpiredBidList = (props) => {
  const [expiredBidsList, setExpiredBidsList] = useState([]);

  //Use Effect to download Farmers's Expired Bids List...
  useEffect(() => {
    FarmerServiceHandler.getCustomerExpiredAndDeletedBidsData({
      getFarmerExpiredAndDeletdBidResponseHanlder:
        getFarmerExpiredAndDeletdBidResponseHanlder,
        isFarmerLoggedIn : props.isFarmerLoggedIn
    });
  }, [props.expiredListRefreshFlag]);

  //Response Hanlder to handle the response from the API...
  const getFarmerExpiredAndDeletdBidResponseHanlder = (expiredBidsData) => {
    setExpiredBidsList(expiredBidsData.expiredBidsList);
  };

  return (
    <div className={classes.ExpiredListContainer}>
      <h2>Expired Bid List</h2>
      <div className={classes.ExpiredList}>
        {expiredBidsList.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No expired bids to display.</h2>
        )}

        <ul>
          {expiredBidsList.map((item, index) => (
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

export default ExpiredBidList;
