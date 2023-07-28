import React, { useEffect, useState } from "react";
import { HomeApi, AddRoomApi } from "../../services/HomeApi";
import "./Home.css";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navarbar from "../FIxed/Navarbar";
import jwtDecode from "jwt-decode";

import { AddUserRoom } from "../../services/RoomApi";
function Home() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [nbrP, setNbrP] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [payload, setPayload] = useState([]);

  useEffect(() => {
    HomeApi()
      .then((response) => {
        setRooms(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setIsLoading(false);
      });
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        setPayload(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []); // Empty dependency array to run the effect only once on mount

  const handleAddClick = () => {
    setShowForm(true);
  };

  const navigate = useNavigate();

  const handleNavigate = (roomName) => {
    AddUserRoom(roomName, payload.name);
    navigate(`/Room/${roomName}`);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let room = {
      name,
      nbrP,
    };
    AddRoomApi(room)
      .then((response) => {
        setAlertVariant("success");
        setAlertMessage("Room added successfully.");
        HomeApi()
          .then((response) => {
            setRooms(response);
            setIsLoading(false);
          })
          .catch((error) => {
            setError("Error fetching data");
          });
      })
      .catch((error) => {
        setAlertVariant("danger");
        setAlertMessage("Registration failed. Please try again.");
      });
    setShowForm(false);

    setTimeout(() => {
      setAlertMessage("");
    }, 1400);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navarbar />
      <div className="Home">
        <div className="add-room">
          <button className="add-button" onClick={handleAddClick}>
            Add
          </button>
          {showForm && (
            <div className="form-pop-up">
              <button className="close-button" onClick={handleCloseForm}>
                X
              </button>
              <h2>Add New Room</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="roomName">Room Name:</label>
                <input
                  type="text"
                  id="roomName"
                  name="roomName"
                  placeholder="Name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
                <label htmlFor="roomName">Room Size:</label>
                <input
                  type="number"
                  id="roomSize"
                  name="roomSize"
                  placeholder="Size"
                  onChange={(event) => setNbrP(event.target.value)}
                  value={nbrP}
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
        <div className="screen__home">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {rooms.map((room, index) => (
              <div key={index} className="col">
                <div className="card">
                  {/* You can use the roomName here as needed */}
                  <div className="card-body">
                    <img
                      src="https://icon-library.com/images/online-chat-icon/online-chat-icon-17.jpg"
                      className="card-img-top"
                      alt="..."
                    />
                    <h5 className="card-title">{room.name}</h5>
                    <p className="card-text">
                      User Online in This Room {room.nbrP}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleNavigate(room.name)}
                    >
                      Navigate to Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="alert">
          {alertMessage && (
            <Alert
              variant={alertVariant}
              onClose={() => setAlertMessage("")}
              dismissible
              settime
            >
              {alertMessage}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
