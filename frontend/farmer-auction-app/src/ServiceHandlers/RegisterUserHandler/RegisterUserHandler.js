import GlobalServiceHandler from "../GlobalServiceHandlers";
import APIURLUtilities from "../APIURLUtilities";

const getRegisterUserData = async (props) => {
  //Extracting User Type Value...
  const userType = props.registerUserData["usertype"];

  const childURL =
    props.registerUserData["usertype"] === "farmer"
      ? APIURLUtilities.getAPIChildURLKeys().registerFarmerKey
      : APIURLUtilities.getAPIChildURLKeys().registerConsumerKey;

  //Extracting User Type Value and replace with Value modified as per server need...
  // const userUpdatedData = {
  //   ...props.userData,
  //   ...{
  //     [LoginUtilities.getLoginDataKeys().userRoleKey]:
  //       LoginUtilities.getLoggedInUserRoleTypeForServer(userType),
  //   },
  // };

  //   registerFarmerKey

  // RegisterUserHandler.getRegisterUserData({
  //     registerUserData: registerUserData,
  //     registerUserResponseHandler: registerUserResponseHandler,
  //   });

  console.log("getRegisterUserData");
  console.log(props);
  console.log(props.registerUserData);
  console.log(userType);

  // return;

  await GlobalServiceHandler.hitPostServiceWithOutBearer({
    childURL: childURL,
    postData: props.registerUserData,
    responseDataHandler: (registerUserServiceData) => {
      console.log("getRegisterUserData response get");
      //Login respone parsing in case of Success...
      if (registerUserServiceData.responseError === null) {
        props.registerUserResponseHandler({
          isUserRegisteredFlag: true,
          registeredUserData: registerUserServiceData.responseData.data,
          errorMessage: null,
        });
      }
      //Login respone parsing in case of Error...
      else if (registerUserServiceData.responseData === null) {
        props.registerUserResponseHandler({
          isUserRegisteredFlag: false,
          registeredUserData: null,
          errorMessage: registerUserServiceData.responseError.message,
        });
      }
    },
  });
};

const RegisterUserHandler = {
  getRegisterUserData,
};

export default RegisterUserHandler;
