import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import "../Css/SongComponent.css";

export default function Component() {
  return (
    <div className="songComponent">
      <div className="songText">
        <strong>You're Beautiful</strong>
        <p>James Blunt</p>
      </div>
      <div>
        <FaPlayCircle />
      </div>
      <div></div>
    </div>
  );
}
