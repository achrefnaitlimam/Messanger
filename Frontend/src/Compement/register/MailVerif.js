import React, { useState, useEffect } from "react";
import "./MailVerif.css";
import MailVerifApi from "../../services/MailVerifApi";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MailVerif() {
  const [Code, setCode] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const location = useLocation();
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  useEffect(() => {
    // Empty dependency array to ensure the effect runs only once
  }, []);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      Code,
      name,
      email,
      password,
    };
    MailVerifApi(user)
      .then((response) => {
        if (!response.success) {
          setAlertVariant("danger");
          setAlertMessage(response.message);
        } else {
          navigate("/Login");
        }
      })
      .catch((error) => {
        {
          setAlertVariant("danger");
          setAlertMessage("Registration failed. Please try again.");
        }
      });
    setTimeout(() => {
      setAlertMessage("");
    }, 1400);
  };
  return (
    <div className="Mail">
      <div className="border">
        <form onSubmit={handleSubmit}>
          <h2>Check Your Email</h2>
          {email}
          <p>Enter your verification code below to Confirm Account:</p>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your Code"
            onChange={(event) => setCode(event.target.value)}
            value={Code}
          />
          <br></br>
          <button className="btn btn-primary">Confirm Code</button>
        </form>
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
    </div>
  );
}

export default MailVerif;
