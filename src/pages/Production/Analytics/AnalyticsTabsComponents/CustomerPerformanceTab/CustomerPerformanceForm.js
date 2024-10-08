import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";
import CustPerformaceTreeView from "./CustPerformaceTreeView";
import { toast } from "react-toastify";

export default function CustomerPerformanceForm({
  fromDate,
  toDate,
  machineOperationsrateList,
}) {
  const [getCustCode, setGetCustCode] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [getCustomerNames, setGetCustomerNames] = useState([]);
  const [getCustomerDataByName, setGetCustomerDataByName] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [selectRow, setSelectRow] = useState([]);
  const [treeViewNodes, setTreeViewNodes] = useState([]);
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
    const dataCopy = [...customerDetails];

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

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);

    const selectedOperation = list.Operation;
    const selectedMaterial = list.Material;

    // Get machine operation time for the selected row
    const machineOpsTime = getCustomerDataByName.custLog
      .filter(
        (log) =>
          log.Operation === selectedOperation &&
          log.Mtrl_Code === selectedMaterial
      )
      .reduce((acc, log) => {
        const key = log.Machine;
        const machineTime =
          (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60); // Calculate time in minutes

        if (!acc[key]) {
          acc[key] = {
            machineTime: 0,
          };
        }

        acc[key].machineTime += machineTime;
        return acc;
      }, {});

    // Clear previous nodes (equivalent to TreeView_CustMachine.Nodes.Clear())
    const machineNodes = [];

    let mchineHrValue = 0;
    let taskTime = 0;

    Object.keys(machineOpsTime).forEach((machine) => {
      const time = machineOpsTime[machine].machineTime;
      const newNode = `${machine} :- ${getHourMin(time)}`;
      machineNodes.push(newNode);

      // Calculate hourly machine rate value
      mchineHrValue +=
        (getMachineOperationHrRate(machine, selectedOperation) * time) / 60;
      taskTime += time;
    });

    // Summary Node
    const summaryNode = {
      title: "Summary",
      details: [
        { label: "Material", value: selectedMaterial },
        { label: "Operation", value: selectedOperation },
        {
          label: "Machine Time Value",
          value: Math.round(mchineHrValue).toLocaleString(),
        },
        {
          label: "Billed Amount",
          value: item.JW_Rate ? parseFloat(item.JW_Rate).toFixed(2) : "N/A",
        },
        {
          label: "Hour Rate Target",
          value:
            taskTime === 0 ? "NA" : Math.round((mchineHrValue * 60) / taskTime),
        },
        {
          label: "Hour Rate Achieved",
          value: item.HrRate ? item.HrRate : "N/A",
        },
      ],
    };

    // Expand the summary node
    setTreeViewNodes([...machineNodes, summaryNode]);
  };

  // Helper function to calculate machine operation hourly rate
  const getMachineOperationHrRate = (machine, operation) => {
    const rateItem = machineOperationsrateList.find(
      (item) => item.Machine === machine && item.Operation === operation
    );
    return rateItem ? rateItem.TgtRate : 0;
  };

  // Utility function to convert minutes to hour-min format
  const getHourMin = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  const handleCustNames = (selected) => {
    if (selected && selected.length > 0) {
      const selectedCustomer = selected[0];
      setSelectedOption(selected); // Update selected option state
      setGetCustCode(selectedCustomer.cust_code || ""); // Use fallback for cust_code
    } else {
      setSelectedOption([]); // Reset selected option
      setGetCustCode(""); // Reset customer code
    }
  };

  useEffect(() => {
    axios
      .get(baseURL + `/analysisRouterData/customerNames`)
      .then((res) => {
        setGetCustomerNames(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  }, []);

  const loadCustomerData = () => {
    handleCustomerApi();
  };

  const handleCustomerApi = () => {
    axios
      .post(baseURL + `/analysisRouterData/loadCustomerDetailsByName/`, {
        fromDate,
        toDate,
        getCustCode,
      })
      .then((res) => {
        setGetCustomerDataByName(res.data);
        const { custLog, custBilling } = res.data;
        processCustomerDetails(custLog, custBilling);
      })
      .catch((err) => {
        console.error("Error in fetching table data:", err);
      });
  };

  const processCustomerDetails = (custLog, custBilling) => {
    let custBillOpsValue = [];

    // Process Billing
    const custMtrlOpsBilling = custBilling.reduce((acc, bill) => {
      const key = `${bill.Mtrl_Code}-${bill.Operation}`;
      if (!acc[key]) {
        acc[key] = {
          Mtrl_Code: bill.Mtrl_Code,
          Operation: bill.Operation,
          valueAdded: 0,
          mtrlValue: 0,
        };
      }

      // Ensure JWValue and MaterialValue are parsed as numbers
      const jwValue = parseFloat(bill.JWValue.replace(/[^0-9.-]+/g, "")) || 0;
      const materialValue =
        parseFloat(bill.MaterialValue.replace(/[^0-9.-]+/g, "")) || 0;

      acc[key].valueAdded += jwValue;
      acc[key].mtrlValue += materialValue;

      return acc;
    }, {});

    let id = 1;
    for (const item of Object.values(custMtrlOpsBilling)) {
      custBillOpsValue.push({
        id: id++,
        Material: item.Mtrl_Code,
        JW_Rate: item.valueAdded,
        Operation: item.Operation,
        Mtrl_rate: item.mtrlValue,
        MachineTime: 0, // Will be updated later
      });
    }

    // Process Machine Log
    const custMachineLog = custLog.reduce((acc, log) => {
      const key = `${log.Mtrl_Code}-${log.Operation}`;
      if (!acc[key]) {
        acc[key] = {
          Mtrl_Code: log.Mtrl_Code,
          Operation: log.Operation,
          mtrlOpsMachineTime: 0,
          machines: {},
        };
      }
      const fromTime = new Date(log.FromTime);
      const toTime = new Date(log.ToTime);

      // Ensure valid dates are provided
      if (!isNaN(fromTime) && !isNaN(toTime)) {
        const diffInMinutes = (toTime - fromTime) / (1000 * 60); // Calculate time difference in minutes
        acc[key].mtrlOpsMachineTime += diffInMinutes;

        if (!acc[key].machines[log.Machine]) {
          acc[key].machines[log.Machine] = 0;
        }
        acc[key].machines[log.Machine] += diffInMinutes;
      }

      return acc;
    }, {});

    // Update machine time in the billing data
    custBillOpsValue = custBillOpsValue.map((bill) => {
      const logItem = custMachineLog[`${bill.Material}-${bill.Operation}`];
      if (logItem) {
        bill.MachineTime =
          Math.round((logItem.mtrlOpsMachineTime / 60) * 100) / 100; // Convert minutes to hours, rounded to 2 decimals
      }
      return bill;
    });

    // Update state and immediately calculate machine hours after state is set
    setCustomerDetails(custBillOpsValue);
    calcMachineHours(custBillOpsValue); // Pass the data directly to avoid re-render loop
  };

  // Modified calcMachineHours to accept data directly
  const calcMachineHours = (details) => {
    const updatedDetails = details.map((row) => {
      const jwRate = parseFloat(row.JW_Rate) || 0;
      const machineTime = parseFloat(row.MachineTime) || 0;

      if (machineTime > 0) {
        row.HrRate = Math.round(jwRate / machineTime); // Calculate hourly rate
      } else {
        row.HrRate = "N/A"; // Handle the case where MachineTime is 0 or undefined
      }

      return row;
    });

    setCustomerDetails(updatedDetails); // Update the state with the calculated hourly rates
  };

  console.log("getCustCode", getCustCode);
  console.log("getCustomerDataByName", getCustomerDataByName);
  console.log("customerDetails", customerDetails);
  console.log("selected row", selectRow);
  console.log("treeViewNodes", treeViewNodes);

  return (
    <div>
      <div className="row">
        <div className="col-md-6 d-flex">
          <label className="form-label col-md-2">Select Customer</label>

          <Typeahead
            className="ip-select mt-1"
            id="basic-example"
            labelKey={(option) =>
              option && option.Cust_Name ? option.Cust_Name.toString() : ""
            }
            options={getCustomerNames}
            placeholder="Select Customer"
            onChange={handleCustNames}
            selected={selectedOption}
          />
        </div>

        <div className="col-md-6">
          <button
            className="button-style group-button"
            onClick={loadCustomerData}
          >
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
              <Table striped className="table-data border">
                <thead
                  className="tableHeaderBGColor"
                  style={{ textAlign: "center" }}
                >
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th onClick={() => requestSort("Material")}>Material</th>
                    <th onClick={() => requestSort("Operation")}>Operation</th>
                    <th onClick={() => requestSort("Mtrl_rate")}>Matrl_rate</th>
                    <th onClick={() => requestSort("JW_Rate")}>Value Added</th>
                    <th onClick={() => requestSort("MachineTime")}>
                      Machine Time
                    </th>
                    <th onClick={() => requestSort("HrRate")}>Hour Rate</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {customerDetails?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        onClick={() => selectedRowFun(item, index)} // Use index instead of key
                        className={
                          index === selectRow?.index ? "selcted-row-clr" : ""
                        }
                      >
                        <td>{item.Material}</td>
                        <td>{item.Operation}</td>
                        <td>
                          {parseFloat(item.Mtrl_rate)
                            ? parseFloat(item.Mtrl_rate).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>
                          {parseFloat(item.JW_Rate)
                            ? parseFloat(item.JW_Rate).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>{item.MachineTime || "N/A"}</td>
                        <td>{item.HrRate || "N/A"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <CustPerformaceTreeView treeViewNodes={treeViewNodes} />
        </div>
      </div>
    </div>
  );
}
