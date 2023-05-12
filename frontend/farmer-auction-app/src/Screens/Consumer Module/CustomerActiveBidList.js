import React, { useEffect, useState } from "react";
import classes from "./CustomerWonBids.module.css";
import CustomerServiceHandler from "../../ServiceHandlers/CustomerServiceHandler/CustomerServiceHandler";


const CustomerActiveBidList = (props) => {
  const [activeBidsList, setActiveBidsList] = useState([]);

  useEffect(() => {
    console.log("Use Effect running in active bids list page...");
    CustomerServiceHandler.getCustomerActiveBidsData({
      getCustomerActiveBidResponseHanlder: getCustomerActiveBidResponseHanlder,
    });
  }, [props.activeListPageRefreshFlag]);


  //Response Hanlder to handle the response from the API...
  const getCustomerActiveBidResponseHanlder = (activeBidsData) => {

    console.log("getCustomerActiveBidResponseHanlder");
    console.log(activeBidsData.activeBidsList);
    setActiveBidsList(activeBidsData.activeBidsList);
  };


  return (
    <div className={classes.ExpiredListContainer}>
      <h2>Active Bids List</h2>
      <div className={classes.ExpiredList}>
        {activeBidsList.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No Active bids to display.</h2>
        )}

        <ul>
          {activeBidsList.map((item, index) => (
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

export default CustomerActiveBidList;
