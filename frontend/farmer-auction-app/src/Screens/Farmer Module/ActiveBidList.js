import React from "react";
import classes from "./ActiveBidList.module.css";

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

function ActiveBidList() {
  return (
    <div className={classes.ActiveListContainer}>
      <h2>Active List</h2>
      <div className={classes.ActiveList}>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <div>
                <strong>Category:</strong> {item.category}
              </div>
              <div>
                <strong>Name:</strong> {item.name}
              </div>
              <div>
                <strong>Quantity:</strong> {item.quantity}
              </div>
              <div>
                <strong>Base Price:</strong> {item.base_price}
              </div>
              <div>
                <strong>Active Bid:</strong> {item.active_bid}
              </div>
              <div>
                <strong>Expired Bid:</strong> {item.expired_bid}
              </div>
              <div>
                <strong>Status:</strong> {item.status}
              </div>
              <div>
                <strong>Name of Highest Bidder:</strong>{" "}
                {item.name_of_highest_bidder}
              </div>
              <button>Sell Item</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActiveBidList;
