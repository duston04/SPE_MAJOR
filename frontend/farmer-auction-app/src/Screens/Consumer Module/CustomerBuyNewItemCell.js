


const CustomerBuyNewItemCell = (props) => {
  const handleUpdatedBid = (event) => {
    props.handlePriceValueChangeHanlder(
      { ...props.item, ...{ customerPrice: event.target.value } },
      props.index
    );
  };

  const updatedBidAmountHandler = (item, updatedBidAmount) => {
    props.makeCustomerBidWithValues(item);
  };

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
          value={props.item.customerPrice}
          onChange={handleUpdatedBid}
          min={0}
        />
        <button
          onClick={() => {
            updatedBidAmountHandler(props.item);
          }}
        >
          Bid
        </button>
      </div>
    </>
  );
};

export default CustomerBuyNewItemCell;
