import { useState } from "react";
import classes from "./CustomerActiveBidList.module.css";

const CustomerActiveBidCell = (props) => {
  const [updatedBid, setUpdatedBid] = useState("");

  const handleUpdatedBid = (event) => {
    setUpdatedBid(event.target.value);
  };
  const updatedBidAmountHandler = (item, updatedBidAmount) => {
    //CALL API TO GET BIDERS LIST FOR SPECIFIC ITEM USING "item.id"
    console.log(item);
    console.log(updatedBidAmount);
    item.active_bid = updatedBidAmount;
  };
  return (
    <>
      <div>
        <div
          style={{ display: "inline-block", marginLeft: 30, marginRight: 30 }}
        >
          <strong>Category:</strong> {props.item.category}
        </div>
        <div
          style={{ display: "inline-block", marginLeft: 30, marginRight: 30 }}
        >
          <strong>Name:</strong> {props.item.name}
        </div>

        <div style={{ display: "inline-block", marginLeft: 30 }}>
          <strong>Quantity:</strong> {props.item.quantity}
        </div>
      </div>
      <div>
        <div
          style={{ display: "inline-block", marginLeft: 30, marginRight: 30 }}
        >
          <strong>Base Price:</strong> {props.item.base_price}
        </div>
        <div
          style={{ display: "inline-block", marginLeft: 30, marginRight: 30 }}
        >
          <strong>Active Bid:</strong> {props.item.active_bid}
        </div>
        <div style={{ display: "inline-block", marginLeft: 30 }}>
          <strong>Max Bid:</strong> {props.item.expired_bid}
        </div>
      </div>
      <div style={{ marginLeft: 30 }}>
        <strong>New Bid:</strong>
        <input
          type="number"
          id="amount"
          value={updatedBid}
          onChange={handleUpdatedBid}
        />
        <button
          onClick={() => {
            updatedBidAmountHandler(props.item, updatedBid);
          }}
        >
          update
        </button>
      </div>
    </>
  );
};

export default CustomerActiveBidCell;
