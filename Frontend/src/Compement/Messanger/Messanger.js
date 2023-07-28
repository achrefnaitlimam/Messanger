import { useParams } from "react-router-dom";
import { AddMsgRoom, RoomApi } from "../../services/RoomApi";
import React, { useEffect, useState, useRef } from "react";
import "./Messanger.css";
import Navarbar from "../FIxed/Navarbar";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";

function Messenger() {
  const [rooms, setRooms] = useState({ chat: [] });
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const [payload, setPayload] = useState({});
  const { RoomName } = useParams();
  const usersCount = rooms.users ? rooms.users.length : 0;

  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        setPayload(decodedToken);
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }

    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to the server!");
    });

    socketRef.current.on("user-connected", () => {
      console.log("A user connected!");
    });

    socketRef.current.on("send_message", (newMessage) => {
      console.log("Received message:", newMessage);
      // Update the chat with the received message
      setRooms((prevRooms) => ({
        ...prevRooms,
        chat: [...prevRooms.chat, newMessage],
      }));
    });

    // Fetch initial room data on component mount
    RoomApi(RoomName)
      .then((response) => {
        setRooms(response[0]);
      })
      .catch((error) => {
        setError("Error fetching data");
      });

    return () => {
      socketRef.current.disconnect();
    };
  }, [RoomName]);

  const handleSubmit = (msg) => {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    if (msg) {
      const newMessage = {
        user: payload.name,
        message: msg,
        date: currentTime,
      };
      // Emit the message to the server
      if (newMessage) AddMsgRoom(RoomName, payload.name, newMessage.message);
      socketRef.current.emit("send_message", newMessage);
      setMsg("");
    }
  };
  return (
    <>
      <Navarbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="chat-room">
                <aside className="tengah-side">
                  <div className="chat-room-head">
                    <h3>{rooms.name}</h3>
                  </div>
                  <div className="message-container">
                    {rooms.chat &&
                      rooms.chat.map((msg) => (
                        <div className="group-rom">
                          <div className="first-part odd">{msg.user} </div>
                          <div className="second-part">{msg.message}</div>
                          <div className="third-part">{msg.date}</div>
                        </div>
                      ))}

                    <div className="send">
                      <div className="chat-txt">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(event) => setMsg(event.target.value)}
                          value={msg}
                          required
                        />
                      </div>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-white"
                          data-original-title=""
                          title=""
                        >
                          <i className="fa fa-meh-o"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-white"
                          data-original-title=""
                          title=""
                        >
                          <i className=" fa fa-paperclip"></i>
                        </button>
                      </div>
                      <button
                        className="btn btn-danger"
                        data-original-title=""
                        onClick={() => handleSubmit(msg)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </aside>

                <aside className="kanan-side">
                  <div className="user-head">
                    <a href="##" className="chat-tools btn-success">
                      <i className="fa fa-cog"></i>{" "}
                    </a>
                  </div>
                  <div className="invite-row">
                    <h4 className="pull-left">
                      People {usersCount} / {rooms.nbrP}
                    </h4>
                  </div>
                  <ul className="chat-available-user">
                    {rooms.users &&
                      rooms.users.map((user) => (
                        <li key={user._id}>
                          <a href="#chat-room.html">
                            <i className="fa fa-circle text-success"></i>
                            {user.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
