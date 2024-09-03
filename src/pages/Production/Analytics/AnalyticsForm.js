import React from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsAllTabs from "./AnalyticsAllTabs";

export default function AnalyticsForm() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="row">
        <h4 className="title ">Performance Analysis</h4>
      </div>

      <div className="row">
        <div className="col-md-3">
          <label className="form-label">Magod Laser: Jigani</label>
        </div>
        <div className="col-md-3 d-flex mt-1" style={{gap:'10px'}}>
          <label className="form-label">From</label>
          <input className="in-field" type="date"></input>
        </div>
        <div className="col-md-3 d-flex mt-1" style={{gap:'10px'}}>
          <label className="form-label">To</label>
          <input className="in-field" type="date"></input>
        </div>
        <div className="col-md-3">
          <button className="button-style group-button">Load Data</button>
          <button
            className="button-style group-button"
            type="button"
            onClick={(e) => navigate("/Analysis")}
          >
            Close
          </button>
        </div>
      </div>

      <AnalyticsAllTabs />
    </div>
  );
}
