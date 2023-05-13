import ActiveBidList from "./ActiveBidList";
import AddNewBid from "./AddNewBid";
import ExpiredBidList from "./ExpiredBidList";
import CompletedBidList from "./CompletedBidList";
import React, { useEffect, useState } from "react";
import FarmerProfile from "./FarmerProfile";
import ActiveBidersList from "./ActiveBidersList";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";
// import UtilitiesKeys from "../../Utilities/UtilitiesKeys/UtilitiesKeys";
import UtilitiesMethods from "../../Utilities/UtilitiesMethods/UtilitiesMethods";
// const items = [
//   {
//     category: "fruit",
//     name: "Banana",
//     quantity: "2 bunches",
//     base_price: "5.00",
//     active_bid: "6.50",
//     expired_bid: "none",
//     status: "available",
//     name_of_highest_bidder: "none",
//   },
//   {
//     category: "vegetable",
//     name: "Potato",
//     quantity: "5 Kg",
//     base_price: "3.00",
//     active_bid: "4.25",
//     expired_bid: "none",
//     status: "available",
//     name_of_highest_bidder: "none",
//   },
//   {
//     category: "fruit",
//     name: "Grapes",
//     quantity: "1 Kg",
//     base_price: "2.50",
//     active_bid: "none",
//     expired_bid: "none",
//     status: "sold",
//     name_of_highest_bidder: "John Doe",
//   },
//   {
//     category: "vegetable",
//     name: "Onion",
//     quantity: "3 Kg",
//     base_price: "2.00",
//     active_bid: "2.75",
//     expired_bid: "none",
//     status: "available",
//     name_of_highest_bidder: "none",
//   },
//   {
//     category: "fruit",
//     name: "Mango",
//     quantity: "1 Kg",
//     base_price: "4.00",
//     active_bid: "5.50",
//     expired_bid: "none",
//     status: "available",
//     name_of_highest_bidder: "none",
//   },
//   {
//     category: "vegetable",
//     name: "Tomato",
//     quantity: "2 Kg",
//     base_price: "2.50",
//     active_bid: "none",
//     expired_bid: "none",
//     status: "sold",
//     name_of_highest_bidder: "Jane Smith",
//   },
// ];

const FarmerDashBoard = (props) => {
  const [activeListPageRefreshFlag, setActiveListPageRefreshFlag] =
    useState(false);
  const [expiredListRefreshFlag, setExpiredListRefreshFlag] = useState(false);
  const [completedListRefreshFlag, setCompletedListRefreshFlag] = useState(false);
  const [showBidersList, setShowBidersList] = useState(false);
  const [selectedBidData, setSelectedBidData] = useState({});

  const showBottomMessageBar = (errorMessageData) => {
    props.showBottomMessageBar(errorMessageData);
  };

  const invertDownloadActiveListFlag = () => {
    setActiveListPageRefreshFlag((isRefresh) => {
      return !isRefresh;
    });
  };

  const invertDownloadExpiredListFlag = () => {
    setExpiredListRefreshFlag((isRefresh) => {
      return !isRefresh;
    });
  };


  const invertDownloadCompletedListFlag = () => {
    setCompletedListRefreshFlag((isRefresh) => {
      return !isRefresh;
    });
  };

  const setUserSelectedBidData = (bidData) => {
    setSelectedBidData(bidData);
  };

  const hanlderSellBidHandler = (bidData) => {
    FarmerServiceHandler.sellItemBidByFarmer({
      itemData: bidData,
      sellItemResponseHandler: sellItemResponseHandler,
    });
  };

  const sellItemResponseHandler = (responseData) => {
    if (responseData.isBidCompleted === false) {
      showBottomMessageBar(
        UtilitiesMethods.getErrorDisplayMessageList(responseData.errorMessage)
      );
      return;
    }

    showBottomMessageBar(
      UtilitiesMethods.getSuccessDisplayMessageList(
        "Bid assigned successfully."
      )
    );

    setShowBidersList(false);
    invertDownloadActiveListFlag();
  };

  const deleteBid = (item) => {
    setShowBidersList(false);
    FarmerServiceHandler.deleteBidByFarmer({
      itemData: item,
      deleteBidResponseHandler: deleteBidResponseHandler,
    });
  };

  const deleteBidResponseHandler = (responseData) => {
    if (responseData.isBidDeleted === false) {
      showBottomMessageBar(
        UtilitiesMethods.getErrorDisplayMessageList(responseData.errorMessage)
      );
      return;
    }

    showBottomMessageBar(
      UtilitiesMethods.getSuccessDisplayMessageList("Bid deleted successfully.")
    );
    invertDownloadActiveListFlag();
  };

  //UseEffect to invert the List of Expired & Active Biddings List...
  useEffect(() => {
    //Invert Refresh Flag When Screen Changed, for Active Bidding List...
    if (props.farmerScreen === "Active List") {
      invertDownloadActiveListFlag();
      setShowBidersList(false);
    }

    //Invert Refresh Flag When Screen Changed, for Expired Bidding List...
    if (props.farmerScreen === "Expired List") {
      invertDownloadExpiredListFlag();
    }

    //Invert Refresh Flag When Screen Changed, for Completed Bidding List...
    if (props.farmerScreen === "Expired List") {
      invertDownloadCompletedListFlag();
    }
  }, [props.farmerScreen]);

  if (props.farmerScreen === "Farmer Profile")
    return (
      <>
        <FarmerProfile
          showBottomMessageBar={showBottomMessageBar}
          isFarmerLoggedIn={props.isFarmerLoggedIn}
        />
      </>
    );
  else if (props.farmerScreen === "Expired List")
    return (
      <>
        <ExpiredBidList expiredListRefreshFlag={expiredListRefreshFlag} isFarmerLoggedIn={props.isFarmerLoggedIn}/>
      </>
    );
  else if (props.farmerScreen === "Completed List")
    return (
      <>
        <CompletedBidList completedListRefreshFlag={completedListRefreshFlag}/>
      </>
    );
  else
    return (
      <>
        <AddNewBid
          showBottomMessageBar={showBottomMessageBar}
          invertDownloadActiveFlag={invertDownloadActiveListFlag}
          setShowBidersList={setShowBidersList}
        />
        <ActiveBidList
          activeListPageRefreshFlag={activeListPageRefreshFlag}
          showBottomMessageBar={showBottomMessageBar}
          setShowBidersList={setShowBidersList}
          setUserSelectedBidData={setUserSelectedBidData}
          deleteBid={deleteBid}
        />
        {showBidersList && (
          <ActiveBidersList
            selectedBidData={selectedBidData}
            showBottomMessageBar={showBottomMessageBar}
            hanlderSellBidHandler={hanlderSellBidHandler}
          />
        )}
      </>
    );
};
export default FarmerDashBoard;
