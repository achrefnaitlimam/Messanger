import Http from "./api";

export const RoomApi = async (RoomName) => {
  try {
    const response = await Http.post("/Room/" + RoomName);
    return response.data;
  } catch (error) {
    console.log("failed to load", error);
    return {
      success: false,
      message: "failed to load",
    };
  }
};

export const AddUserRoom = async (RoomName, userData) => {
  try {
    const data = {
      room_name: RoomName,
      name: userData,
    };
    console.log(data);
    const response = await Http.post("/Room/addUserRoom", data);
    return response.data;
  } catch (error) {
    console.log("failed to load", error);
    return {
      success: false,
      message: "failed to load",
    };
  }
};

export const AddMsgRoom = async (RoomName, userData, msg) => {
  try {
    const data = {
      room_name: RoomName,
      name: userData,
      msg: msg,
    };
    console.log(data);
    const response = await Http.post("/Room/addMsgRoom", data);
    return response.data;
  } catch (error) {
    console.log("failed to load", error);
    return {
      success: false,
      message: "failed to load",
    };
  }
};
export const GetRoom = async (userData) => {
  try {
    const data = {
      name: userData,
    };
    const response = await Http.post("/Room/getRoom", data);
    return response.data;
  } catch (error) {
    console.log("failed to load", error);
    return {
      success: false,
      message: "failed to load",
    };
  }
};
