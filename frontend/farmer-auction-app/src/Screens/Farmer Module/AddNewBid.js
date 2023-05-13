import React, { useState } from "react";
import classes from "./AddNewBid.module.css";
import FarmerUtility from "../../Utilities/FarmerUtiilityMethods/FarmerUtilityMethods";
import UtilitiesKeys from "../../Utilities/UtilitiesKeys/UtilitiesKeys";
import FarmerServiceHandler from "../../ServiceHandlers/FarmerServiceHandler/FarmerServiceHandler";

const AddNewBid = (props) => {
  const today = new Date();
  const minDate = today.toISOString().substring(0, 10);

  const [bidCategoryData, setBidCategoryData] = useState(
    FarmerUtility.getAddBidCategoryInitialData()
  );
  const [bidData, setBidData] = useState(FarmerUtility.getAddBidInitialData());

  const handleCategoryChange = (e) => {
    updateUserBidCategoryData({ type: e.target.value, subcategory: "" });
    //props.setShowBidersList(false);
  };

  const handleItemChange = (e) => {
    updateUserBidCategoryData({ subcategory: e.target.value });
    //props.setShowBidersList(false);
  };

  //Update User registration data...
  const updateUserBidCategoryData = (updatedData) => {
    props.setShowBidersList(false);
    setBidCategoryData((bidCategoryData) => {
      console.log({ ...bidCategoryData, ...updatedData });
      return { ...bidCategoryData, ...updatedData };
    });
  };

  //Update User registration data...
  const updateUserBidData = (updatedData) => {
    props.setShowBidersList(false);
    setBidData((bidData) => {
      console.log({ ...bidData, ...updatedData });
      return { ...bidData, ...updatedData };
    });
  };

  const handleQuantityChange = (e) => {
    updateUserBidData({ quantity: e.target.value });
  };

  const handleBasePriceChange = (e) => {
    updateUserBidData({ basePrice: e.target.value });
  };

  const expiryDateChangeHandler = (event) => {
    updateUserBidData({ expiryDate: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setShowBidersList(false);

    const categoryValidationData =
      FarmerUtility.checkBidCategoryDataValidations(bidData, bidCategoryData);

    if (
      categoryValidationData[
        UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey
      ] === true
    ) {
      props.showBottomMessageBar(categoryValidationData);
      return;
    }

    //Call API for Add New Bid...

    FarmerServiceHandler.addFarmerNewBid({
      bidData: bidData,
      categoryData: bidCategoryData,
      addFarmerNewBidResponseHandler: addFarmerNewBidResponseHandler,
    });
  };

  const addFarmerNewBidResponseHandler = (addNewBidResponseData) => {
    console.log("addNewBidResponseData");
    console.log(addNewBidResponseData);

    if (addNewBidResponseData.isBidAddedFlag === false) {
      props.showBottomMessageBar({
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          addNewBidResponseData.errorMessage,
        [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
          UtilitiesKeys.getAlertMessageTypeKeys().errorKey,
        [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
      });
      return;
    }
    props.invertDownloadActiveFlag();
    props.showBottomMessageBar({
      [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
        "Bid added successfully.",
      [UtilitiesKeys.getErrorMessageDataKeys().messageType]:
        UtilitiesKeys.getAlertMessageTypeKeys().successKey,
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
    });
    setBidCategoryData(FarmerUtility.getAddBidCategoryInitialData());
    setBidData(FarmerUtility.getAddBidInitialData());
  };

  return (
    <div className={classes.add_new_bid}>
      <h2>Add New Bid</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={bidCategoryData.type}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
        </select>

        {bidCategoryData.type === "fruit" && (
          <div>
            <label htmlFor="fruit">Fruit:</label>
            <select
              id="fruit"
              value={bidCategoryData.subcategory}
              onChange={handleItemChange}
            >
              <option value="">Select a fruit</option>
              <option value="banana">Banana</option>
              <option value="grapes">Grapes</option>
              <option value="mango">Mango</option>
            </select>
          </div>
        )}

        {bidCategoryData.type === "vegetable" && (
          <div>
            <label htmlFor="vegetable">Vegetable:</label>
            <select
              id="vegetable"
              value={bidCategoryData.subcategory}
              onChange={handleItemChange}
            >
              <option value="">Select a vegetable</option>
              <option value="potato">Potato</option>
              <option value="onion">Onion</option>
              <option value="tomato">Tomato</option>
            </select>
          </div>
        )}

        <label htmlFor="amount">Quantity (Kgs):</label>
        <input
          type="number"
          id="amount"
          value={bidData.quantity}
          onChange={handleQuantityChange}
        />

        <label htmlFor="baseprice">Base Price (Rs):</label>
        <input
          type="number"
          id="baseprice"
          value={bidData.basePrice}
          onChange={handleBasePriceChange}
        />

        <label>Expiry Date:</label>
        <input
          type="date"
          min={minDate}
          name="date"
          value={bidData.expiryDate}
          onChange={expiryDateChangeHandler}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddNewBid;
