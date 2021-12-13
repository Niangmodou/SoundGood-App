import React from "react";
import "../Css/LandingPage.css";
import "../Css/Login.css";

export default function Landing() {
  return (
    <div className="landingPage content">
      <h1>SoundGood</h1>
      <h3>
        Welcome to the place that will help you find that song stuck in your
        head!
      </h3>

      <a href="/login">
        <button type="button" id="Login" className="actionBtn">
          Login
        </button>
      </a>
      <a href="/register">
        <button type="button" id="Register" className="actionBtn">
          Register
        </button>
      </a>
    </div>
  );
}
