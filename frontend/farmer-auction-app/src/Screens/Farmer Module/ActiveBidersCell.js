const ActiveBidersCell = (props) => {

console.log("ActiveBidersCell called");
console.log(props);


  const sellItemHandler = (item) => {
    //SELL ITEM TO SELECTED CUSTOMER
    console.log(item);
    props.hanlderSellBidHandler(item);
  };

  // category : 
  // categoryId: 1
  // subcategory : "banana"
  // type : "fruit"


//   {item: {…}, index: 1}
// index: 1
// item: 
// bid: {bidId: 1, category: {…}, quantity: 1000, basePrice: 5000, finalCustomer: null, …}
// customer: {userId: 52, username: 'dhruvconsumer1', password: '$2a$10$CEAcu7QB4qtL45nTBtlsNuF5qkBxiOpfR0n4ej8yaUgh9VxnRfuxm', role: 'ROLE_CUSTOMER', name: 'dhruv', …}
// customerBidId: 10
// price: 7000


// consumer

// accountNonExpired
// : 
// true
// accountNonLocked
// : 
// true
// address
// : 
// "f 172"
// authorities
// : 
// [{…}]
// contact
// : 
// "9015346166"
// credentialsNonExpired
// : 
// true
// enabled
// : 
// true
// name
// : 
// "dhruv"
// password
// : 
// "$2a$10$CEAcu7QB4qtL45nTBtlsNuF5qkBxiOpfR0n4ej8yaUgh9VxnRfuxm"
// pincode
// : 
// 201009
// role
// : 
// "ROLE_CUSTOMER"
// userId
// : 
// 52
// username
// : 
// "dhruvconsumer1"

console.log(props.item);


  return (
    <>
      <div>
        <strong>Name : </strong> {props.item.bid.category.subcategory}
      </div>
      <div>
        <strong>Customer Name : </strong> {props.item.customer.name}
      </div>
      <div>
        <strong>Base Price : </strong> {props.item.bid.basePrice}
      </div>
      <div>
        <strong>Quantity : </strong> {props.item.bid.quantity}
      </div>
      <div>
        <strong>Bid Price :</strong> {props.item.price}
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
