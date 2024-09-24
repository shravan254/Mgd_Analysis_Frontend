import React, { useState } from "react";
import { Table } from "react-bootstrap";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";
import ByMachinesTreeView from "./ByMachinesTreeView";
import ByMaterialTreeView from "./ByMaterialTreeView";
import ByOperationTreeView from "./ByOperationTreeView";
import ByCustomerTreeView from "./ByCustomerTreeView";

// import { useNavigate } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function MachinePerformaceForm({
  fromDate,
  toDate,
  processedMachineData,
  operationsData
}) {
  const [subMenuOpen, setSubMenuOpen] = useState(-1);
  const toggleMenu = (x) => setSubMenuOpen(subMenuOpen === x ? -1 : x);
  const [byMachine, setByMachine] = useState(true);
  const [byMaterial, setByMaterial] = useState(false);
  const [byOperation, setByOperation] = useState(false);
  const [byCustomer, setByCustomer] = useState(false);

  const byMachineSubmit = () => {
    setByMachine(true);
    setByMaterial(false);
    setByCustomer(false);
    setByOperation(false);
  };
  const byMaterialSubmit = () => {
    setByMaterial(true);
    setByMachine(false);

    setByOperation(false);
    setByCustomer(false);
  };

  const byOperationSubmit = () => {
    setByOperation(true);
    setByMachine(false);
    setByMaterial(false);
    setByCustomer(false);
  };
  const byCustomerSubmit = () => {
    setByCustomer(true);
    setByMachine(false);
    setByMaterial(false);
    setByOperation(false);
  };

  return (
    <div>
      <div className="row mt-1">
        <div className="col-md-3">
          {byMachine && (
            <ByMachinesTreeView processedMachineData={processedMachineData} />
          )}
          {byMaterial && <ByMaterialTreeView/>}
          {byOperation && <ByOperationTreeView operationsData={operationsData}/>}
          {byCustomer && <ByCustomerTreeView />}
        </div>

        <div className="col-md-9">
          <div className="row">
            <div className="col-md-2">
              <label className="form-label"> Machine Options</label>
            </div>
            <div className="d-flex col-md-2 mt-1" style={{ gap: "8px" }}>
              <input
                className="form-check-input "
                type="radio"
                name="working"
                defaultChecked
                style={{ marginTop: "8px" }}
                onClick={byMachineSubmit}
              />
              <label className="form-label"> By Machines</label>
            </div>

            <div className="d-flex col-md-2 mt-1" style={{ gap: "8px" }}>
              <input
                className="form-check-input "
                type="radio"
                name="working"
                style={{ marginTop: "8px" }}
                onClick={byOperationSubmit}
              />
              <label className="form-label"> By Operation</label>
            </div>

            <div className="d-flex col-md-2 mt-1" style={{ gap: "8px" }}>
              <input
                className="form-check-input "
                type="radio"
                name="working"
                style={{ marginTop: "8px" }}
                onClick={byMaterialSubmit}
              />
              <label className="form-label"> By Material</label>
            </div>

            <div className="d-flex col-md-2 mt-1" style={{ gap: "8px" }}>
              <input
                className="form-check-input"
                type="radio"
                name="working"
                style={{ marginTop: "8px" }}
                onClick={byCustomerSubmit}
              />
              <label className="form-label"> By Customer</label>
            </div>
          </div>

          <div
            className="mt-1"
            style={{
              height: "340px",
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
                  <th>ShiftDate</th>
                  <th>Shift</th>
                  <th>Machine</th>
                  <th style={{ whiteSpace: "nowrap" }}>Shift_ic</th>
                  <th style={{ whiteSpace: "nowrap" }}>ShiftOperator</th>
                  <th style={{ whiteSpace: "nowrap" }}>MachineOperator</th>
                  <th style={{ whiteSpace: "nowrap" }}>TaskNo</th>
                  <th style={{ whiteSpace: "nowrap" }}>Program</th>
                  <th style={{ whiteSpace: "nowrap" }}>Operation</th>
                  <th style={{ whiteSpace: "nowrap" }}>Mtrl_Code</th>
                  <th style={{ whiteSpace: "nowrap" }}>From Time</th>
                  <th style={{ whiteSpace: "nowrap" }}>To Time</th>
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
