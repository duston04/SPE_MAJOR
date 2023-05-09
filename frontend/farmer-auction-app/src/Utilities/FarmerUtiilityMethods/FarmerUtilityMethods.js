import UtilitiesKeys from "../UtilitiesKeys/UtilitiesKeys";
import UtilitiesMethods from "../UtilitiesMethods/UtilitiesMethods";

const getAddBidCategoryInitialData = () => {
  return {
    type: "",
    subcategory: "",
  };
};

const getAddBidInitialData = () => {
  return {
    quantity: null,
    basePrice: null,
    expiryDate: "",
  };
};

const checkBidCategoryDataValidations = (bidData, bidCategoryData) => {
  console.log("checkBidCategoryDataValidations done");
  console.log(bidData);
  console.log(bidCategoryData);

  var validationData = {
    [UtilitiesKeys.getErrorMessageDataKeys().messageKey]: "",
    [UtilitiesKeys.getErrorMessageDataKeys().messageType]: "warning",
    [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: true,
  };

  //Validation for Category Type Data...
  if (UtilitiesMethods.getSpaceTrimmedLenght(bidCategoryData.type) === 0) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please select a category to proceed.",
      },
    };
  }

  //Validation for Sub Category...
  if (
    UtilitiesMethods.getSpaceTrimmedLenght(bidCategoryData.subcategory) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please select a sub category to proceed.",
      },
    };
  }

  //Validation for Quantity...
  if (parseInt(bidData.quantity) === 0) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter some quantity to proceed.",
      },
    };
  }

  //Validation for Base Price...
  if (parseInt(bidData.basePrice) === 0) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please enter base price to proceed.",
      },
    };
  }

  //Validation for Expiry Date...
  if (
    UtilitiesMethods.getSpaceTrimmedLenght(bidData.expiryDate) === 0
  ) {
    return {
      ...validationData,
      ...{
        [UtilitiesKeys.getErrorMessageDataKeys().messageKey]:
          "Please select expiry date to proceed.",
      },
    };
  }

  return {
    ...validationData,
    ...{
      [UtilitiesKeys.getErrorMessageDataKeys().isErrorMessageKey]: false,
    },
  };
};

const FarmerUtility = {
  getAddBidCategoryInitialData,
  getAddBidInitialData,
  checkBidCategoryDataValidations,
};

export default FarmerUtility;
