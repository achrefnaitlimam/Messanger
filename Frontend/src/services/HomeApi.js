import Http from "./api";

export const HomeApi = async () => {
  try {
    const response = await Http.post("/");
    return response.data;
  } catch (error) {
    console.log("failed to load", error);
    return {
      success: false,
      message: "failed to load",
    };
  }
};
export const AddRoomApi = async (roomData) => {
  try {
    const response = await Http.post("/Room/addRoom", roomData);
    return response.data;
  } catch (error) {
    throw new Error("Error adding room");
  }
};
