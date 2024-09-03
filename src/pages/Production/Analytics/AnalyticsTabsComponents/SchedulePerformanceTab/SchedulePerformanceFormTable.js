import React from "react";
import { Table } from "react-bootstrap";
import SchedulePerformanceTreeView from "./SchedulePerformanceTreeView";

export default function SchedulePerformanceFormTable() {
  return (
    <div>
      <div className="col-md-2 ms-2">
        <button className="button-style group-button">Load Schedules</button>
      </div>
      <div className="row mt-1">
        <div
          className="col-md-3"
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
                <th style={{ whiteSpace: "nowrap" }}>Schedule No</th>
                <th style={{ whiteSpace: "nowrap" }}>Customer</th>
              </tr>
            </thead>

            <tbody className="tablebody">
              <tr className=""></tr>
            </tbody>
          </Table>
        </div>

        <div
          className="col-md-6"
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
                <th style={{ whiteSpace: "nowrap" }}>TaskNo</th>
                <th style={{ whiteSpace: "nowrap" }}>Material</th>
                <th style={{ whiteSpace: "nowrap" }}>Thick</th>
                <th style={{ whiteSpace: "nowrap" }}>Operation</th>
                <th style={{ whiteSpace: "nowrap" }}>LOC</th>

                <th style={{ whiteSpace: "nowrap" }}>Machine Hours</th>
                <th style={{ whiteSpace: "nowrap" }}>Hour Rate Achieved</th>
                <th style={{ whiteSpace: "nowrap" }}>Hour Rate Target</th>
                <th style={{ whiteSpace: "nowrap" }}>Material Value</th>
              </tr>
            </thead>

            <tbody className="tablebody">
              <tr className=""></tr>
            </tbody>
          </Table>
        </div>

        <div className="col-md-3">
          <SchedulePerformanceTreeView />
        </div>
      </div>
    </div>
  );
}
