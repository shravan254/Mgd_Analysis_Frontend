import React, { useState } from "react";
import { Table } from "react-bootstrap";
import ValueAdditionTreeView from "./ValueAdditionTreeView";

export default function ValueAdditionTableForm({
  custBilling,
  getMachinePerformanceData,
  machineOperationsrateList,
}) {
  const [selectRow, setSelectRow] = useState([]);
  const [treeViewData, setTreeViewData] = useState([]);
  const [totalMachineTime, setTotalMachineTime] = useState(0);
  const [machineTgtValue, setMachineTgtValue] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // sorting function for table headings of the table
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...custBilling];

    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        // Convert only for the "intiger" columns
        if (
          sortConfig.key === "JWValue" ||
          sortConfig.key === "MaterialValue"
        ) {
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

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
    setCustMachineTime(list);
  };

  const setCustMachineTime = (selectRow) => {
    const CustCode = selectRow?.Cust_Code;
    const machineLogBook = getMachinePerformanceData?.machineLogBook || [];
  
    if (!CustCode) return;
  
    // Calculate machine time and operations time
    const custMachineTime = machineLogBook
      .filter((log) => log.Cust_Code === CustCode && log.FromTime && log.ToTime)
      .reduce((acc, log) => {
        const fromTime = new Date(log.FromTime);
        const toTime = new Date(log.ToTime);
  
        // Ensure time difference is positive and accurate in minutes
        const machineTime = Math.max(0, Math.floor((toTime - fromTime) / 60000));
  
        // Initialize machine entry if not present
        if (!acc[log.Machine]) {
          acc[log.Machine] = { machineTime: 0, operations: {} };
        }
        acc[log.Machine].machineTime += machineTime;
  
        // Initialize operation entry if not present
        if (!acc[log.Machine].operations[log.Operation]) {
          acc[log.Machine].operations[log.Operation] = 0;
        }
        acc[log.Machine].operations[log.Operation] += machineTime;
  
        return acc;
      }, {});
  
    let totalMachineTime = 0;
    let totalMachineTgtValue = 0;
  
    const treeData = [];
  
    // Build tree structure for each machine and its operations
    Object.keys(custMachineTime).forEach((machine) => {
      const machineTime = custMachineTime[machine].machineTime;
      totalMachineTime += machineTime;
  
      const machineNode = {
        label: `${machine} - ${getHourMin(machineTime)}`,
        children: [],
      };
  
      // Operations under each machine
      Object.keys(custMachineTime[machine].operations).forEach((operation) => {
        const opsTime = custMachineTime[machine].operations[operation];
        const machineValue = calculateMachineValue(machine, operation, opsTime);
        totalMachineTgtValue += machineValue;
  
        machineNode.children.push({
          label: `${operation} / ${getHourMin(
            opsTime
          )} / Value: ${formatCurrency(machineValue)}`,
        });
      });
  
      treeData.push(machineNode);
    });
  
    // Add summary node at the end
    treeData.push({
      label: "Summary :",
      style: { fontWeight: "bold" },
      children: [
        {
          label: `Total Machine Time: ${getHourMin(totalMachineTime)}`,
          style: { fontWeight: "bold" },
        },
        {
          label: `Target Value Addition: ${formatCurrency(totalMachineTgtValue)}`,
          style: { backgroundColor: "#f48483", fontWeight: "bold" },
        },
        {
          label: `Total Value Added: ${
            selectRow?.JWValue ? formatCurrency(selectRow.JWValue) : "₹0"
          }`,
          style: { backgroundColor: "#92ec93", fontWeight: "bold" },
        },
        {
          label: `Average Target Machine Hour Rate: ${
            totalMachineTime > 0
              ? formatCurrency(totalMachineTgtValue / (totalMachineTime / 60))
              : "N/A"
          }`,
          style: { backgroundColor: "#f48483", fontWeight: "bold" },
        },
        {
          label: `Average Machine Hour Rate Achieved: ${
            selectRow?.JWValue && totalMachineTime > 0
              ? formatCurrency(selectRow.JWValue / (totalMachineTime / 60))
              : "N/A"
          }`,
          style: { backgroundColor: "#92ec93", fontWeight: "bold" },
        },
      ],
    });
  
    setTreeViewData(treeData);
  };
  
  // Calculate the machine operation value based on the operation time and hourly rate
  const calculateMachineValue = (machine, operation, opsTime) => {
    const rate = getMachineOperationHrRate(machine, operation);
    return (rate * opsTime) / 60; // Convert opsTime (minutes) to hours for value calculation
  };
  
  // Format time in hours and minutes
  const getHourMin = (min) => {
    const hr = Math.floor(min / 60);
    const mins = Math.floor(min % 60);
    return `${hr}:${mins < 10 ? "0" : ""}${mins}`;
  };
  
  // Format the currency in INR
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };
  
  // Helper function to calculate machine operation hourly rate
  const getMachineOperationHrRate = (machine, operation) => {
    const rateItem = machineOperationsrateList.find(
      (item) => item.Machine === machine && item.Operation === operation
    );
    return rateItem ? rateItem.TgtRate : 0;
  };
  
  // console.log("treeViewData", treeViewData);
  // console.log("totalMachineTime", totalMachineTime);
  // console.log("machineTgtValue", machineTgtValue);
  // console.log("Selected row", selectRow);
  // console.log("custBilling", custBilling);

  return (
    <div>
      <div className="row mt-1">
        <div className="col-md-4">
          <ValueAdditionTreeView treeViewData={treeViewData} />
        </div>

        <div className="col-md-8">
          <div
            style={{
              height: "370px",
              overflowY: "scroll",
              overflowX: "scroll",
            }}
          >
            <Table striped className="table-data border">
              <thead
                className="tableHeaderBGColor"
                style={{ whiteSpace: "nowrap", textAlign: "center" }}
              >
                <tr>
                  <th onClick={() => requestSort("Cust_Name")}>Customer</th>
                  <th
                    style={{ textAlign: "right" }}
                    onClick={() => requestSort("JWValue")}
                  >
                    Value Addition
                  </th>
                  <th
                    style={{ textAlign: "right" }}
                    onClick={() => requestSort("MaterialValue")}
                  >
                    Material Value
                  </th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {sortedData()?.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => selectedRowFun(item, index)} // Use index instead of key
                      className={
                        index === selectRow?.index ? "selcted-row-clr" : ""
                      }
                      style={{ textAlign: "center" }}
                    >
                      <td>{item.Cust_Name}</td>
                      <td style={{ textAlign: "right" }}>
                        {parseFloat(item.JWValue)
                          ? parseFloat(item.JWValue).toFixed(2)
                          : "0.00"}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {parseFloat(item.MaterialValue)
                          ? parseFloat(item.MaterialValue).toFixed(2)
                          : "0.00"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
