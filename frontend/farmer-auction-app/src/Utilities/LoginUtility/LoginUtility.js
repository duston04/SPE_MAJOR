
const getUserLoginInitialData = () => {
  return {
    username: "",
    password: "",
    role : "ROLE_CUSTOMER"
  };
};

const LoginUtility = {
  getUserLoginInitialData,
};

export default LoginUtility;
