import React, { useState } from "react";
import "./Login.css";
import Loginapi from "../../services/Loginapi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/Register");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      name,
      password,
    };
    // Assuming Loginapi(user) calls the Login function defined earlier
    Loginapi(user)
      .then((response) => {
        if (response.success) {
          console.log(response);
          const token = response.token; // Assuming the token is present in the response
          localStorage.setItem("token", token); // Save the token in localStorage
          navigate("/");
        }
      })
      .catch((err) => {
        // The login failed or there was an error
        console.log("error", err);
      });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group">
            <div className="text-center">
              You don't have account?
              <span className="link-primary" onClick={handleSignup}>
                Sign Up
              </span>
            </div>
            <label>Username</label>
            <input
              type="text"
              id="username"
              className="form-control mt-1"
              placeholder="Username"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              required
            />
          </div>
          <div className="d-grid mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
