import CustomerActiveBidList from "./CustomerActiveBidList";
import CustomerCompletedBidList from "./CustomerCompletedBidList";
import React, { useEffect, useState } from "react";
import CustomerBuyNewItemList from "./CustomerBuyNewItemList";
import FarmerProfile from "../Farmer Module/FarmerProfile";
import ExpiredBidList from "../Farmer Module/ExpiredBidList";
import CustomerWonBidsList from "./CustomerWonBids";

const CustomerDashBoard = (props) => {
  const [activeListPageRefreshFlag, setActiveListPageRefreshFlag] =
    useState(false);

  const [buyNewItemRefreshFlag, setBuyNewItemRefreshFlag] = useState(false);
  const [expiredListRefreshFlag, setExpiredListRefreshFlag] = useState(false);
  const [wonListRefreshFlag, setWonListRefreshFlag] = useState(false);

  const showBottomMessageBar = (errorMessageData) => {
    props.showBottomMessageBar(errorMessageData);
  };

  //Invert Refresh flag in case of Expired List Screen...
  const invertDownloadExpiredListFlag = () => {
    setExpiredListRefreshFlag((isRefresh) => {
      return !isRefresh;
    });
  };

  const invertDownloadActiveListFlag = () => {
    setActiveListPageRefreshFlag((isRefresh) => {
      return !isRefresh;
    });
  };

  //Invert Refresh flag in case of New Winning Bids Screen...
  const invertDownloadWonListFlag = () => {
    setWonListRefreshFlag((isRefresh) => {
      return !isRefresh;
    });
  };

  //Invert Refresh flag in case of Buy New Item Screen...
  const refreshBuyNewItemListHanlder = () => {
    invertDownloadActiveListFlag();
  };

  //Invert Refresh flag in case of Buy New Item Screen...
  const invertBuyNewItemListFlag = () => {
    setBuyNewItemRefreshFlag((isRefresh) => {
      return !isRefresh;
    });
  };

  //Use Effect to invert the flags for downloading the data in case of screen selection...
  useEffect(() => {
    //Invert Refresh flag in case of Buy New Item Screen...
    if (props.customerScreen === "Customer BuyNewItem List") {
      invertDownloadActiveListFlag();
    }

    //Invert Refresh flag in case of Expired List Screen...
    if (props.customerScreen === "Customer Expired List") {
      invertDownloadExpiredListFlag();
    }

    //Invert Refresh flag in case of New Winning Bids Screen...
    if (props.customerScreen === "Customer Winning List") {
      invertDownloadWonListFlag();
    }
  }, [props.customerScreen]);

  //Displaying the components in case of individual screen selection...
  if (props.customerScreen === "Customer Profile")
    //Return the Customer Profile Screen...
    return (
      <>
        <FarmerProfile
          showBottomMessageBar={showBottomMessageBar}
          isFarmerLoggedIn={props.isFarmerLoggedIn}
        />
      </>
    );
  else if (props.customerScreen === "Customer Expired List")
  //Return the Customer Expired Bids List Screen...
    return (
      <>
        <ExpiredBidList
          expiredListRefreshFlag={expiredListRefreshFlag}
          isFarmerLoggedIn={props.isFarmerLoggedIn}
        />
      </>
    );
  else if (props.customerScreen === "Customer Winning List")
  //Return the Customer Winning Bids List Screen...
    return (
      <>
        <CustomerWonBidsList wonListRefreshFlag={wonListRefreshFlag} />
      </>
    );
  else if (props.customerScreen === "Customer BuyNewItem List")
  //Return the Customer Buy New Items List Screen...
    return (
      <>
        <CustomerBuyNewItemList
          activeListPageRefreshFlag={activeListPageRefreshFlag}
          showBottomMessageBar={props.showBottomMessageBar}
          invertBuyNewItemListFlag={invertBuyNewItemListFlag}
          refreshBuyNewItemListHanlder={refreshBuyNewItemListHanlder}
        />
      </>
    );
  // else if (props.customerScreen === "Customer Completed List")
  //   return (
  //     <>
  //       <CustomerCompletedBidList />
  //     </>
  //   );
  else
    return (
      <>
        <CustomerActiveBidList
          activeListPageRefreshFlag={activeListPageRefreshFlag}
          showBottomMessageBar={showBottomMessageBar}
        />
      </>
    );
};
export default CustomerDashBoard;
