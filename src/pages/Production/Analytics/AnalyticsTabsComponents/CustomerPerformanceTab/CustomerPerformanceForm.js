import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";
import CustPerformaceTreeView from "./CustPerformaceTreeView";

export default function CustomerPerformanceForm({ fromDate, toDate }) {
  const [getCustCode, setGetCustCode] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [getCustomerNames, setGetCustomerNames] = useState([]);
  const [getCustomerDataByName, setGetCustomerDataByName] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);

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
              <Table className="table-data border">
                <thead
                  className="tableHeaderBGColor"
                  style={{ textAlign: "center" }}
                >
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th>Material</th>
                    <th>Operation</th>
                    <th>Matrl_rate</th>
                    <th>Value Added</th>
                    <th>Machine Time</th>
                    <th>Hour Rate</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {customerDetails?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        style={{ whiteSpace: "nowrap", textAlign: "center" }}
                      >
                        <td>{item.Material}</td>
                        <td>{item.Operation}</td>
                        <td>{parseFloat(item.Mtrl_rate).toFixed(2)}</td>
                        <td>{parseFloat(item.JW_Rate).toFixed(2)}</td>
                        <td>{item.MachineTime}</td>
                        <td>{item.HrRate}</td>
                      </tr>
                    );
                  })}
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
