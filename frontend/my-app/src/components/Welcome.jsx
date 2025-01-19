import React from "react";
import { useNavigate } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to the Endangered Species Platform</h1>
      <div className="box-container">
        <button className="box" onClick={() => navigate("/Species")}>
          <h2>Species</h2>
          <p>Manage and view species information.</p>
        </button>
        <button className="box" onClick={() => navigate("/Reserves")}>
          <h2>Reserves</h2>
          <p>Manage and view reserve information.</p>
        </button>
      </div>
      {/* Animated Leaves */}
      <div className="leaf"></div>
      <div className="leaf"></div>
      <div className="leaf"></div>
    </div>
  );
};

export default Welcome;
