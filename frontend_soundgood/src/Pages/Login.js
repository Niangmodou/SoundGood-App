import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

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
    <div>
      <h1 onClick={() => navigate("/")}>SoundGood</h1>
      <div>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />{" "}
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" value="login" onClick={loginUser}>
          Login
        </button>
      </div>
      <p>{error}</p>
      Already have an account?
      <a href="/register">Register Instead</a>
    </div>
  );
};

export default Login;
