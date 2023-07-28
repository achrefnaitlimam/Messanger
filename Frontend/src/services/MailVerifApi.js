import Http from "./api";

const MailVerif = async (user) => {
  try {
    console.log(user);
    await Http.post("/MailVerif", user);
    return { success: true };
  } catch (error) {
    console.log("Confirmation failed", error);
    return {
      success: false,
      message: "Confirmation failed. Please try again.",
    };
  }
};
export default MailVerif;
