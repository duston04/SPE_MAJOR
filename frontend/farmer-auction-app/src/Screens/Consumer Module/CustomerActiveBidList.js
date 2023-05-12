import React, { useEffect, useState } from "react";
import classes from "./CustomerActiveBidList.module.css";
import CustomerActiveBidCell from "./CustomerActiveBidCell";
// import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

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

const CustomerActiveBidList = (props) => {
  const [activeBidsList, setActiveBidsList] = useState([]);

  useEffect(() => {
    //setCustomerActiveBidsList(items);
    console.log("Use Effect running in active bids list page...");

    




    // FarmerServiceHandler.getAllActiveListsData({
    //   getFarmersCustomerActiveBidListHandler:
    //     getFarmersCustomerActiveBidListHandler,
    // });
  }, [props.activeListPageRefreshFlag]);

  const getCustomerActiveBidListHandler = (activeBidResponseData) => {
    console.log("Active List Data Recieved");
    console.log(activeBidResponseData);
    // setActiveBidsList(activeBidResponseData.activeBidsData);
  };


  return (
    <div className={classes.ExpiredListContainer}>
      <h2>Won Bid List</h2>
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
