import axios from "axios";
// import UtilitiesMethods from "../Utilities/UtilitiesMethods";
import UtilitiesMethods from "../Utilities/UtilitiesMethods/UtilitiesMethods";

const serverURL = `http://localhost:8282/`;
//process.env.REACT_APP_SERVER_URL;


const getHeaderConfigurationsList = () => {
  return {
    headers: {
      Authorization: "Bearer " + UtilitiesMethods.getJWTToken(),
    },
    validateStatus: function (status) {
      return (
        status === 200 || status === 404 || status === 403 || status === 500
      );
      // Resolve only if the status code is 202 or 404...
    },
  };
};

const hitGetServiceWithOutBearer = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler");
    console.log(url);

    const response = await axios.get(url, {
      validateStatus: function (status) {
        return (
          status === 200 || status === 404 || status === 403 || status === 500
        );
        // Resolve only if the status code is 202 or 404...
      },
    });

    console.log("Data recieved");
    console.log(response);

    handleAPICallReponseData({
      response: response,
      responseHandler: props.responseDataHandler,
    });
  } catch (error) {
    console.log("error block");
    console.log(error);
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};

const hitPostServiceWithOutBearer = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler");
    console.log(url);
    console.log("Data post in the API is");
    console.log(props.postData);

    const response = await axios.post(url, props.postData, {
      validateStatus: function (status) {
        return (
          status === 200 || status === 404 || status === 403 || status === 500
        );
        // Resolve only if the status code is 202 or 404...
      },
    });

    console.log("Data recieved");
    console.log(response);

    // if (response.status === 200) {
    //   props.responseDataHandler({
    //     responseData: response,
    //     responseError: null,
    //   });
    // } else if (response.status === 403) {
    //   console.log("403 response");
    //   console.log(response);
    //   props.responseDataHandler({
    //     responseData: null,
    //     responseError: Error(response.data.message),
    //   });
    // } else if (response.status === 404) {
    //   console.log("404 response");
    //   console.log(response);
    //   props.responseDataHandler({
    //     responseData: null,
    //     responseError: Error(response.data.message),
    //   });
    // } else if (response.status === 500) {
    //   console.log("404 response");
    //   console.log(response);
    //   props.responseDataHandler({
    //     responseData: null,
    //     responseError: Error(response.data.message),
    //   });
    // } else {
    //   console.log("else block");
    //   console.log(response);
    //   props.responseDataHandler({
    //     responseData: response,
    //     responseError: null,
    //   });
    // }

    handleAPICallReponseData({
      response: response,
      responseHandler: props.responseDataHandler,
    });
    
  } catch (error) {
    console.log("error block");
    console.log(error);
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};


const hitCustomResponsePostService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler");
    console.log(url);
    console.log("Data post in the API is");
    console.log(props.postData);

    const response = await axios.post(
      url,
      props.postData,
      GlobalServiceHandler.getHeaderConfigurationsList()
    );

    console.log("Data recieved");
    console.log(response);

    //Call the Global Method for Handling the API response...
    handleAPICallReponseData({
      response: response,
      responseHandler: props.responseDataHandler,
    });
  } catch (error) {
    console.log("error block");
    console.log(error);
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};

// const hitPostService = async (props) => {
//   try {
//     const url = serverURL + props.childURL;

//     console.log("URL Hitting in GlobalServiceHandler");
//     console.log(url);

//     const response = await axios.post(
//       url,
//       props.postData,
//       GlobalServiceHandler.getHeaderConfigurationsList()
//     );

//     console.log("Data recieved");
//     console.log(response);

//     //Call the Global Method for Handling the API response...
//     handleAPICallReponseData({
//       response: response,
//       responseHandler: props.responseDataHandler,
//     });
//   } catch (error) {
//     props.responseDataHandler({
//       responseData: null,
//       responseError: error,
//     });
//   }
// };

// const hitGetService = async (props) => {
//   try {
//     const url = serverURL + props.childURL;

//     console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
//     console.log(url);

//     const response = await axios.get(url);

//     console.log("Data recieved");
//     console.log(response);

//     if (response.status === 200) {
//       props.responseDataHandler({
//         responseData: response,
//         responseError: null,
//       });
//     } else {
//       props.responseDataHandler({
//         responseData: null,
//         responseError: Error(response.data.message),
//       });
//     }
//   } catch (error) {
//     props.responseDataHandler({
//       responseData: null,
//       responseError: error,
//     });
//   }
// };

//Method to Hit the GET request in the API...
const hitCustomResponseGetService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
    console.log(url);
    // console.log(UtilitiesMethods.getAuthTokenForLoggedInUser());

    const response = await axios.get(
      url,
      GlobalServiceHandler.getHeaderConfigurationsList()
    );

    console.log("************************************Data recieved****************************8");
    console.log(response);

    //Call the Global Method for Handling the API response...
    handleAPICallReponseData({
      response: response,
      responseHandler: props.responseDataHandler,
    });
  } catch (error) {
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};

//Method to handle the response of the API Calls...
const handleAPICallReponseData = (prop) => {
  if (prop.response.status === 200) {
    prop.responseHandler({
      responseData: prop.response,
      responseError: null,
    });
  } else {
    prop.responseHandler({
      responseData: null,
      responseError: Error(prop.response.data.message),
    });
  }
};

//Method to Hit the PUT request in the API...
const hitPutService = async (props) => {
  try {
    const url = serverURL + props.childURL;

    console.log("URL Hitting in GlobalServiceHandler in Get Service Call");
    console.log(url);

    const response = await axios.put(
      url,
      props.postData,
      GlobalServiceHandler.getHeaderConfigurationsList()
    );

    console.log("Data recieved");
    console.log(response);

    //Call the Global Method for Handling the API response...
    handleAPICallReponseData({
      response: response,
      responseHandler: props.responseDataHandler,
    });
  } catch (error) {
    props.responseDataHandler({
      responseData: null,
      responseError: error,
    });
  }
};

const GlobalServiceHandler = {
  getHeaderConfigurationsList,
  hitPostServiceWithOutBearer,
  hitGetServiceWithOutBearer,
  hitCustomResponsePostService,
  hitCustomResponseGetService,
  hitPutService
};
export default GlobalServiceHandler;
