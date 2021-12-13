import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../Css/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = () => {
    const payload = {
      username: username,
      password: password,
    };

    const URL = "http://127.0.0.1:5000/api/login";

    axios
      .post(URL, payload)
      .then((response) => {
        const status = response["data"]["status"];

        if (status.trim() === "Succesfully logged in user") {
          const token = response["data"]["token"];
          localStorage.setItem("userToken", token);

          setIsLoggedIn(true);
        } else {
          setErrorMessage(status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Checking whether user succesfully logged in
  if (isLoggedIn) navigate("/");

  return (
    <div className="loginPage">
      {/* <h1 onClick={() => navigate("/")}>SoundGood</h1> */}
      <h1>Login</h1>
      <h3>Please sign in to continue</h3>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div style={{ textAlign: "right" }}>
        <button
          className="actionBtn"
          type="submit"
          value="login"
          onClick={loginUser}
        >
          Login
        </button>
      </div>
      <p>{error}</p>
      Don't have an account?
      <a
        href="/register"
        style={{
          marginLeft: "3vw",
          fontWeight: "bold",
          textDecoration: "none",
          color: "white",
        }}
      >
        Sign Up
      </a>
    </div>
  );
};

export default Login;
