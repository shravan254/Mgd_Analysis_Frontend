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
    const CustCode = selectRow?.Cust_Code; // Assuming CustCode is in the selectedRow
    const machineLogBook = getMachinePerformanceData?.machineLogBook || [];

    if (!CustCode) return;

    const custMachineTime = machineLogBook
      .filter((log) => log.Cust_Code === CustCode && log.FromTime && log.ToTime)
      .reduce((acc, log) => {
        const machineTime =
          Math.abs(new Date(log.ToTime) - new Date(log.FromTime)) / 60000; // Time in minutes
        if (!acc[log.Machine])
          acc[log.Machine] = { machineTime: 0, operations: {} };
        acc[log.Machine].machineTime += machineTime;

        if (!acc[log.Machine].operations[log.Operation])
          acc[log.Machine].operations[log.Operation] = 0;
        acc[log.Machine].operations[log.Operation] += machineTime;

        return acc;
      }, {});

    let totalMachineTime = 0;
    let totalMachineTgtValue = 0;

    const treeData = [];

    Object.keys(custMachineTime).forEach((machine) => {
      const machineTime = custMachineTime[machine].machineTime;
      totalMachineTime += machineTime;

      const machineNode = {
        label: `${machine} - ${formatHoursMinutes(machineTime)}`,
        children: [],
      };

      // Operations under the machine
      Object.keys(custMachineTime[machine].operations).forEach((operation) => {
        const opsTime = custMachineTime[machine].operations[operation];
        const machineValue = calculateMachineValue(machine, operation, opsTime);
        totalMachineTgtValue += machineValue;

        machineNode.children.push({
          label: `${operation} / Hrs: ${formatHoursMinutes(
            opsTime
          )} / Value: ${formatCurrency(machineValue)}`,
        });
      });

      treeData.push(machineNode);
    });

    // Adding summary node
    treeData.push({
      label: "Summary :",
      style: { fontWeight: "bold" },
      children: [
        {
          label: `Total Machine Time: ${formatHoursMinutes(totalMachineTime)}`,
          style: { fontWeight: "bold" },
        },
        {
          label: `Target Value Addition: ${formatCurrency(
            totalMachineTgtValue
          )}`,
          style: { backgroundColor: "#f48483", fontWeight: "bold" }, // Color for Target Value Addition
        },
        {
          label: `Total Value Added: ${
            selectRow?.JWValue ? formatCurrency(selectRow.JWValue) : "$0"
          }`,
          style: { backgroundColor: "#92ec93", fontWeight: "bold" }, // Color for Total Value Added
        },
        {
          label: `Average Target Machine Hour Rate: ${Math.round(
            totalMachineTgtValue / (totalMachineTime / 60)
          )}`,
          style: { backgroundColor: "#f48483", fontWeight: "bold" }, // Color for Average Target Machine Hour Rate
        },
        {
          label: `Average Machine Hour Rate Achieved: ${
            selectRow?.JWValue
              ? Math.round(selectRow.JWValue / (totalMachineTime / 60))
              : 0
          }`,
          style: { backgroundColor: "#92ec93", fontWeight: "bold" }, // Color for Average Machine Hour Rate Achieved
        },
      ],
    });

    setTreeViewData(treeData);
  };

  const calculateMachineValue = (machine, operation, opsTime) => {
    const rate = getMachineOperationHrRate(machine, operation);
    return (rate * opsTime) / 60;
  };

  const formatHoursMinutes = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hrs}h ${mins}m`;
  };

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

  console.log("treeViewData", treeViewData);
  console.log("totalMachineTime", totalMachineTime);
  console.log("machineTgtValue", machineTgtValue);
  console.log("Selected row", selectRow);

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
