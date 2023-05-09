const ActiveBidCell = (props) => {
  const showBidersListHandler = (item) => {
    //CALL API TO GET BIDERS LIST FOR SPECIFIC ITEM USING "item.id"
    console.log(item);
    props.setShowBidersList(item);
  };
  return (
    <>
      <div>
        <strong>Category:</strong> {props.item.category}
      </div>
      <div>
        <strong>Name:</strong> {props.item.name}
      </div>
      <div>
        <strong>Quantity:</strong> {props.item.quantity}
      </div>
      <div>
        <strong>Base Price:</strong> {props.item.base_price}
      </div>
      <div>
        <strong>Active Bid:</strong> {props.item.active_bid}
      </div>
      <div>
        <strong>Expired Bid:</strong> {props.item.expired_bid}
      </div>
      <div>
        <strong>Status:</strong> {props.item.status}
      </div>
      <div>
        <strong>Name of Highest Bidder:</strong>{" "}
        {props.item.name_of_highest_bidder}
      </div>
      <button
        onClick={() => {
          showBidersListHandler(props.item);
        }}
      >
        Show Biders
      </button>
    </>
  );
};

export default ActiveBidCell;
