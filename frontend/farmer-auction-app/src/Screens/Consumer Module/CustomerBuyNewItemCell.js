import { useState } from "react";

const CustomerBuyNewItemCell = (props) => {
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



  // basePrice: 5000
  // bidId : 1
  // category: {categoryId: 1, type: 'fruit', subcategory: 'banana'}
  // currentMaxBid:  0
  // expiryDate: "2023-05-11"
  // farmer: {userId: 1, username: 'dhruvfarmer', password: '$2a$10$Lr.hhpEvB/xeUA0Ofs1tCebPC/DZVd8Eq8WPYlnfruLZvOKsv2EQ.', role: 'ROLE_FARMER', address: 'f 173', …}
  // finalCustomer : null
  // quantity: 1000
  // status: "ACTIVE"


  return (
    <>
      <div>
        <div
          style={{ display: "inline-block", marginLeft: 30, marginRight: 30 }}
        >
          <strong>Category:</strong> {props.item.category.type}
        </div>
        <div
          style={{ display: "inline-block", marginLeft: 30, marginRight: 30 }}
        >
          <strong>Name:</strong> {props.item.category.subcategory}
        </div>

        <div style={{ display: "inline-block", marginLeft: 30 }}>
          <strong>Quantity:</strong> {props.item.quantity}
        </div>
      </div>
      <div>
        <div
          style={{ display: "inline-block", marginLeft: 30, marginRight: 30 }}
        >
          <strong>Closing Date:</strong> {props.item.expiryDate}
        </div>
        <div
          style={{ display: "inline-block", marginLeft: 30, marginRight: 30 }}
        >
          <strong>Base Price:</strong> {props.item.basePrice}
        </div>

        <div style={{ display: "inline-block", marginLeft: 30 }}>
          <strong>Max Bid:</strong> {props.item.currentMaxBid}
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
          Bid
        </button>
      </div>
    </>
  );
};

export default CustomerBuyNewItemCell;
