const ActiveBidCell = (props) => {
  const showBidersListHandler = (item) => {
    console.log(item);
    props.setShowBidersList(item);
    props.setUserSelectedBidData(item);
  };

  const deleteBid = (item) => {
    props.deleteBid(item);
  };

  return (
    <>
      <div>
        <strong>Category :</strong> {props.item.category.type}
      </div>

      <div>
        <strong>Sub Category :</strong> {props.item.category.subcategory}
      </div>

      <div>
        <strong>Quantity :</strong> {props.item.quantity}
      </div>
      <div>
        <strong>Base Price :</strong> {props.item.basePrice}
      </div>

      <div>
        <strong>Expiry Date :</strong> {props.item.expiryDate}
      </div>
      <div>
        <strong>Status :</strong> {props.item.status}
      </div>

      <button
        onClick={() => {
          showBidersListHandler(props.item);
        }}
      >
        Show Biders
      </button>

      <br />
      <br />
      <button
        onClick={() => {
          deleteBid(props.item);
        }}
      >
        Delete Bid
      </button>
    </>
  );
};

export default ActiveBidCell;
