import React from "react";
import { Table } from "react-bootstrap";
import CustPerformaceTreeView from "./CustPerformaceTreeView";

export default function CustomerPerformanceForm() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6 d-flex">
          <label className="form-label col-md-2">Select Customer</label>
          <select className="ip-select col-md-4 mt-1">
            <option value="option 1"> Name1</option>
            <option value="option 2">Name2</option>
            <option value="option 3">Name3</option>
          </select>
        </div>

        <div className="col-md-6">
          <button className="button-style group-button">
            Load Customer Data
          </button>
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-9">
          <div className="">
            <div
              style={{
                height: "350px",
                overflowY: "scroll",
                overflowX: "scroll",
              }}
            >
              <Table className="table-data border">
                <thead
                  className="tableHeaderBGColor"
                  style={{ textAlign: "center" }}
                >
                  <tr>
                    <th style={{ whiteSpace: "nowrap" }}>Material</th>
                    <th style={{ whiteSpace: "nowrap" }}>Operation</th>
                    <th style={{ whiteSpace: "nowrap" }}>Matrl_rate</th>
                    <th style={{ whiteSpace: "nowrap" }}>Value Added</th>
                    <th style={{ whiteSpace: "nowrap" }}>Machine Time</th>
                    <th style={{ whiteSpace: "nowrap" }}>Hour Rate</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  <tr className=""></tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <CustPerformaceTreeView />
        </div>
      </div>
    </div>
  );
}
