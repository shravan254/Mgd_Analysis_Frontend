import React from "react";
import "../Loading.css";

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
}
export default Loading;
