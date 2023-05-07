import GlobalServiceHandler from "../GlobalServiceHandlers";
import APIURLUtilities from "../APIURLUtilities";

const getLoginUserData = async (props) => {

  const childURL = APIURLUtilities.getAPIChildURLKeys().loginUserKey;

  console.log("getLoginUserData");
  console.log(props.registerUserData);

  await GlobalServiceHandler.hitPostServiceWithOutBearer({
    childURL: childURL,
    postData: props.loginUserData,
    responseDataHandler: (registerUserServiceData) => {
      console.log("getRegisterUserData response get");
      //Login respone parsing in case of Success...
      if (registerUserServiceData.responseError === null) {
        props.loginUserResponseHandler({
          isUserLoggedInFlag: true,
          loggedInUserData: registerUserServiceData.responseData.data,
          errorMessage: null,
        });
      }
      //Login respone parsing in case of Error...
      else if (registerUserServiceData.responseData === null) {
        props.loginUserResponseHandler({
          isUserLoggedInFlag: false,
          loggedInUserData: null,
          errorMessage: registerUserServiceData.responseError.message,
        });
      }
    },
  });
};

const LoginUserHandler = {
  getLoginUserData,
};

export default LoginUserHandler;
