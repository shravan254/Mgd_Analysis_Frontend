import React, { useState } from "react";
import { Table } from "react-bootstrap";
import SchedulePerformanceTreeView from "./SchedulePerformanceTreeView";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";

export default function SchedulePerformanceFormTable({ fromDate, toDate }) {
  const [getCustomers, setGetCustomers] = useState([]);
  const [selectedCustomerDeatails, setSelectedCustomerDetails] = useState();
  const [selectRow, setSelectRow] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [taskMachineTime, setTaskMachineTime] = useState([]);

  const btnLoadSchedules = () => {
    getData();
  };

  const getData = () => {
    axios
      .post(baseURL + `/analysisRouterData/loadCustomers/`, {
        fromDate,
        toDate,
      })
      .then((res) => {
        setGetCustomers(res.data);
      })
      .catch((err) => {
        console.error("Error in fetching table data:", err);
      });
  };

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
    const selectedScheduleId = list.ScheduleId;

    // axios
    //   .post(baseURL + `/analysisRouterData/loadCustomerDetails/`, {
    //     fromDate,
    //     toDate,
    //     selectedScheduleId,
    //   })
    //   .then((res) => {
    //     setSelectedCustomerDetails(res.data);
    //   })
    //   .catch((err) => {
    //     console.error("Error in fetching table data:", err);
    //   });

    // Fetch combined data (customerBilling and scheduleLog) from the backend API
    axios
      .post(baseURL + `/analysisRouterData/loadCustomerDetails/`, {
        fromDate,
        toDate,
        selectedScheduleId,
      })
      .then((response) => {
        setSelectedCustomerDetails(response.data);
        const { scheduleLog } = response.data;

        // Process the scheduleLog data to calculate taskMachineTime
        const taskMachineTimeData = scheduleLog.reduce((acc, log) => {
          // Find the task in the accumulator
          let task = acc.find(
            (t) => t.TaskNo === log.TaskNo && t.NcTaskId === log.NcTaskId
          );

          if (!task) {
            task = {
              TaskNo: log.TaskNo,
              NcTaskId: log.NcTaskId,
              taskTime: 0,
              MachineList: [],
            };
            acc.push(task);
          }

          // Calculate taskTime in minutes
          const fromTime = new Date(log.FromTime);
          const toTime = new Date(log.ToTime);
          const timeDiff = (toTime - fromTime) / (1000 * 60); // Time difference in minutes

          task.taskTime += timeDiff;

          // Find the machine in the MachineList
          let machine = task.MachineList.find((m) => m.Machine === log.Machine);

          if (!machine) {
            machine = {
              Machine: log.Machine,
              machineTime: 0,
            };
            task.MachineList.push(machine);
          }

          // Add machine time for this machine
          machine.machineTime += timeDiff;

          return acc;
        }, []);

        setTaskMachineTime(taskMachineTimeData);
      })
      .catch((error) => console.error("Error fetching shift logs:", error));
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
    const dataCopy = [...getCustomers];

    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        // Convert only for the "intiger" columns
        if (sortConfig.key === "OrdSchNo") {
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

  console.log("selected customer data", selectedCustomerDeatails);
  console.log("selected taskMachineTime", taskMachineTime);
  console.log("selected row", selectRow);
  console.log("customers", getCustomers);

  // console.log("dates", fromDate ,"and", toDate);

  return (
    <div>
      <div className="col-md-2 ms-2">
        <button
          className="button-style group-button"
          onClick={btnLoadSchedules}
        >
          Load Schedules
        </button>
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
              <tr style={{ whiteSpace: "nowrap" }}>
                <th onClick={() => requestSort("OrdSchNo")}>Schedule No</th>
                <th onClick={() => requestSort("Cust_Name")}>Customer</th>
              </tr>
            </thead>

            <tbody className="tablebody">
              {sortedData()?.map((item, index) => {
                return (
                  <tr
                    // style={{ whiteSpace: "nowrap" }}
                    key={item.ScheduleId || index}
                    onClick={() => selectedRowFun(item, index)}
                    className={
                      index === selectRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>{item.OrdSchNo}</td>
                    <td>{item.Cust_Name}</td>
                  </tr>
                );
              })}
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
              <tr style={{ whiteSpace: "nowrap" }}>
                <th>TaskNo</th>
                <th>Material</th>
                <th>Thick</th>
                <th>Operation</th>
                <th>LOC</th>
                <th>Pierces</th>
                <th>Machine Hours</th>
                <th>Hour Rate Achieved</th>
                <th>Hour Rate Target</th>
                <th>Material Value</th>
              </tr>
            </thead>

            <tbody className="tablebody">
              {selectedCustomerDeatails &&
              selectedCustomerDeatails.customerBilling ? (
                selectedCustomerDeatails.customerBilling.map((item, index) => {
                  return (
                    <tr
                      className=""
                      style={{ whiteSpace: "nowrap" }}
                      key={item.NcTaskId || index}
                    >
                      <td>{item.TaskNo}</td>
                      <td>{item.Mtrl_Code}</td>
                      <td>{item.Thickness}</td>
                      <td>{item.Operation}</td>
                      <td>{item.TotalLOC}</td>
                      <td>{item.TotalHoles}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{item.MaterialValue}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    Data not found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div className="col-md-3">
          <SchedulePerformanceTreeView taskMachineTime={taskMachineTime} />
        </div>
      </div>
    </div>
  );
}
