const ActiveBidersCell = (props) => {
  const sellItemHandler = (item) => {
    //SELL ITEM TO SELECTED CUSTOMER
    console.log(item);
  };
  return (
    <>
      <div>
        <strong>Name:</strong> {props.item.name}
      </div>
      <div>
        <strong>contact:</strong> {props.item.contact}
      </div>
      <div>
        <strong>Address:</strong> {props.item.address}
      </div>
      <div>
        <strong>Pincode:</strong> {props.item.pincode}
      </div>
      <div>
        <strong>Bid:</strong> {props.item.bid}
      </div>
      <button
        onClick={() => {
          sellItemHandler(props.item);
        }}
      >
        Sell Item
      </button>
    </>
  );
};

export default ActiveBidersCell;
