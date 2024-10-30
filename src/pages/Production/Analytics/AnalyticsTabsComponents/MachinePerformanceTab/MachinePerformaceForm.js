import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import TreeView from "react-treeview";
import ReactPaginate from "react-paginate";
import "react-treeview/react-treeview.css";
import ByMachinesTreeView from "./ByMachinesTreeView";
import ByMaterialTreeView from "./ByMaterialTreeView";
import ByOperationTreeView from "./ByOperationTreeView";
import ByCustomerTreeView from "./ByCustomerTreeView";
import { MachinePerformanceContext } from "../../../../../Context/AnalysisContext";

export default function MachinePerformaceForm({
  fromDate,
  toDate,
  processedMachineData,
  operationsData,
  getMachinePerformanceData,
  processedData,
  processedCustomerData,
  getTreeViewData,
}) {
  const [byMachine, setByMachine] = useState(true);
  const [byMaterial, setByMaterial] = useState(false);
  const [byOperation, setByOperation] = useState(false);
  const [byCustomer, setByCustomer] = useState(false);
  const itemsPerPage = 200; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);
  const [selectRow, setSelectRow] = useState([]);
  const getMachineLog = getMachinePerformanceData.machineLogBook || [];
  const { byMachineData, byOperationData, byMaterialData, byCustomerData } =
    useContext(MachinePerformanceContext);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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

  // Formate date
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTimeDate = (dateString) => {
    const dateObject = new Date(dateString);

    const datePart = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const timePart = dateObject.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Check if time is not 00:00:00 (no specific time provided)
    return dateObject.getHours() === 0 &&
      dateObject.getMinutes() === 0 &&
      dateObject.getSeconds() === 0
      ? datePart
      : `${datePart} ${timePart}`;
  };

  // Pagination : Calculate the start and end indices for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  let currentPageData;

  if (byMachine) {
    currentPageData = (byMachineData || []).slice(startIndex, endIndex);
  } else if (byOperation) {
    currentPageData = (byOperationData || []).slice(startIndex, endIndex);
  } else if (byMaterial) {
    currentPageData = (byMaterialData || []).slice(startIndex, endIndex);
  } else if (byCustomer) {
    currentPageData = (byCustomerData || []).slice(startIndex, endIndex);
  } else {
    currentPageData = []; // Fallback in case neither checkbox is checked
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Select row
  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  // sorting function for table headings of the table
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...currentPageData];

    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        // Convert only for the "intiger" columns
        if (sortConfig.key === "JW_Rate" || sortConfig.key === "Mtrl_rate") {
          valueA = parseFloat(valueA);
          valueB = parseFloat(valueB);
        }

        if (valueA < valueB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  };

  return (
    <div>
      <div className="row mt-1">
        <div className="col-md-4">
          {byMachine && (
            <ByMachinesTreeView
              processedMachineData={processedMachineData}
              fromDate={fromDate}
              toDate={toDate}
              getTreeViewData={getTreeViewData}
            />
          )}
          {byMaterial && (
            <ByMaterialTreeView
              processedData={processedData}
              fromDate={fromDate}
              toDate={toDate}
            />
          )}
          {byOperation && (
            <ByOperationTreeView
              operationsData={operationsData}
              fromDate={fromDate}
              toDate={toDate}
            />
          )}
          {byCustomer && (
            <ByCustomerTreeView
              processedCustomerData={processedCustomerData}
              fromDate={fromDate}
              toDate={toDate}
            />
          )}
        </div>

        <div className="col-md-8">
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
              height: "300px",
              overflowY: "scroll",
              overflowX: "scroll",
            }}
          >
            <Table striped className="table-data border">
              <thead
                className="tableHeaderBGColor"
                // style={{ textAlign: "center" }}
              >
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th onClick={() => requestSort("ShiftDate")}>ShiftDate</th>
                  <th onClick={() => requestSort("Shift")}>Shift</th>
                  <th onClick={() => requestSort("Machine")}>Machine</th>
                  <th onClick={() => requestSort("Shift_Ic")}>Shift_ic</th>
                  <th onClick={() => requestSort("ShiftOperator")}>
                    ShiftOperator
                  </th>
                  <th onClick={() => requestSort("MachineOperator")}>
                    MachineOperator
                  </th>
                  <th onClick={() => requestSort("TaskNo")}>TaskNo</th>
                  <th onClick={() => requestSort("Program")}>Program</th>
                  <th onClick={() => requestSort("Material")}>Operation</th>
                  <th onClick={() => requestSort("Operation")}>Mtrl_Code</th>
                  <th onClick={() => requestSort("FromTime")}>From Time</th>
                  <th onClick={() => requestSort("ToTime")}>To Time</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {sortedData().length > 0 ? (
                  sortedData().map((item, index) => (
                    <tr
                      key={index}
                      style={{ whiteSpace: "nowrap" }}
                      onClick={() => selectedRowFun(item, index)}
                      className={
                        index === selectRow?.index ? "selcted-row-clr" : ""
                      }
                    >
                      <td>{formatDate(item.ShiftDate)}</td>
                      <td>{item.Shift}</td>
                      <td>{item.Machine}</td>
                      <td>{item.Shift_Ic}</td>
                      <td>{item.ShiftOperator}</td>
                      <td>{item.MachineOperator}</td>
                      <td>{item.TaskNo}</td>
                      <td>{item.Program}</td>
                      <td>{item.Operation}</td>
                      <td>{item.Mtrl_Code}</td>
                      <td>{formatTimeDate(item.FromTime)}</td>
                      <td>{formatTimeDate(item.ToTime)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {getMachineLog.length > 0 && (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={Math.ceil(getMachineLog.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
