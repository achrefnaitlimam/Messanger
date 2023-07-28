import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "./Nav.css";
import { GetRoom } from "../../services/RoomApi";
function Navarbar() {
  const [payload, setPayload] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Retrieve the token from localStorage or wherever it is stored
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        setPayload(decodedToken);
        GetRoom(decodedToken.name)
          .then((response) => {
            setRooms(response.data);
          })
          .catch((error) => {
            console.error("Error fetching rooms:", error);
          });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Login";
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <img
            src="https://icons-for-free.com/download-icon-chat+icon-1320184411998302345_512.png"
            alt="..."
            width={50}
            height={50}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link ml-3" href="/">
                Home <span className="sr-only"></span>
              </a>
            </li>
          </ul>
          {rooms &&
            rooms.map((room, index) => (
              <ul className="navbar-nav" key={index}>
                <li className="nav-item active">
                  <a className="nav-link ml-3" href={`/Room/${room}`}>
                    {room} <span className="sr-only"></span>
                  </a>
                </li>
              </ul>
            ))}
        </div>
        <div
          className="navbar-text ml-auto mr-3"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div>
            <span className="mr-2">{payload.name}</span>
          </div>
          <div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navarbar;
