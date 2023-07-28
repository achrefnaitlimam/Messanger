import React, { useState, useEffect } from "react";
import "./Register.css";
import Registerapi from "../../services/Registerapi";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const navigate = useNavigate();
  useEffect(() => {
    // Empty dependency array to ensure the effect runs only once
  }, []);
  const handleSignin = () => {
    navigate("/Login");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Add logic to handle password mismatch
      setAlertVariant("danger");
      setAlertMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8 || !/[!@#$%-^&*(),.?":{}|<>]/.test(password)) {
      setAlertVariant("danger");
      setAlertMessage(
        "Password must have at least 8 characters and contain a special character."
      );
      return;
    }
    if (name.length < 7) {
      setAlertVariant("danger");
      setAlertMessage("Username must have at least 7 characters.");
      return;
    }
    let user = {
      name,
      email,
      password,
    };
    Registerapi(user)
      .then((response) => {
        if (!response.success) {
          setAlertVariant("danger");
          setAlertMessage(response.message);
          // Handle successful registration
        } else {
          setAlertVariant("success");
          setAlertMessage("Registration successful.");
          navigate("/MailVerif", { state: user });

          // Handle registration error
        }
      })
      .catch((error) => {
        setAlertVariant("danger");
        setAlertMessage("Registration failed. Please try again.");
      });
    setTimeout(() => {
      setAlertMessage("");
    }, 1400);
  };

  return (
    <div className="Auth-form-container">
      <form onSubmit={handleSubmit} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?
            <span className="link-primary" onClick={handleSignin}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Username"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>

            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>

            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirm Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
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
  );
}

export default Register;
