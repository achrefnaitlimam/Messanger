import Http from "./api";

const register = async (userData) => {
  try {
    await Http.post("/Register", userData);
    console.log("User registered successfully");
    return { success: true, message: "Registration successful" };
  } catch (error) {
    console.log("Registration failed", error);
    if (error.response && error.response.data && error.response.data.message) {
      return { success: false, message: error.response.data.message };
    } else {
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  }
};

export default register;
