
const getSpaceTrimmedLenght = (stringToMeasure) => {
    const lengthOfSpace = stringToMeasure.replace(/\s/g, "").length;
    return lengthOfSpace;
  };
  
  const UtilitiesMethods = {
    getSpaceTrimmedLenght,
  };
  
  export default UtilitiesMethods;