import Http from "./api";

const Login = async (userData) => {
  console.log("Login", userData);
  try {
    const response = await Http.post("/Login", userData);
    return response.data; // Assuming the response contains an object with data
  } catch (err) {
    console.error(err);
    return err.response
      ? err.response.data
      : { error: "Unknown error occurred" };
  }
};

export default Login;
