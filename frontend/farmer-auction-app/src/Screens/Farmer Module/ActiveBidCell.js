const ActiveBidCell = (props) => {
  const showBidersListHandler = (item) => {
    //CALL API TO GET BIDERS LIST FOR SPECIFIC ITEM USING "item.id"
    console.log(item);
    //props.setShowBidersList(item);
  };

  console.log(props.item);

// basePrice: 2000
// bidId: 3
// category" {categoryId: 2, type: 'fruit', subcategory: 'banana'}
// currentMaxBid: 0
// expiryDate: "2023-05-11"
// farmer
// : 
// {userId: 1, username: 'dhruvfarmer', password: '1234', role: 'ROLE_FARMER', address: 'f 172', …}
// finalCustomer: null
// quantity: 1000
// status: "ACTIVE"
//   



  return (
    <>
      <div>
        <strong>Category :</strong> {props.item.category.type}
      </div>

      <div>
        <strong>Sub Category :</strong> {props.item.category.subcategory}
      </div>
      {/* <div>
        <strong>Name:</strong> {props.item.name}
      </div> */}
      <div>
        <strong>Quantity :</strong> {props.item.quantity}
      </div>
      <div>
        <strong>Base Price :</strong> {props.item.basePrice}
      </div>
      {/* <div>
        <strong>Active Bid:</strong> {props.item.active_bid}
      </div> */}
      <div>
        <strong>Expiry Date :</strong> {props.item.expiryDate}
      </div>
      <div>
        <strong>Status :</strong> {props.item.status}
      </div>
      {/* <div>
        <strong>Name of Highest Bidder:</strong>{" "}
        {props.item.name_of_highest_bidder}
      </div> */}
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
