import React from "react";
import { Table } from "react-bootstrap";
import ValueAdditionTreeView from "./ValueAdditionTreeView";

export default function ValueAdditionTableForm() {
  return (
    <div>
      <div className="row mt-1">
        <div className="col-md-3">
          <ValueAdditionTreeView />
        </div>

        <div className="col-md-9">
          <div
            style={{
              height: "370px",
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
                  <th style={{ whiteSpace: "nowrap" }}>Customer</th>
                  <th style={{ whiteSpace: "nowrap" }}>Value Addition</th>
                  <th style={{ whiteSpace: "nowrap" }}>Material Value</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                <tr className=""></tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
