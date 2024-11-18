import React, { useState } from "react";
import { Table } from "react-bootstrap";
import SchedulePerformanceTreeView from "./SchedulePerformanceTreeView";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";
import { toast } from "react-toastify";

export default function SchedulePerformanceFormTable({
  fromDate,
  toDate,
  machineOperationsrateList,
}) {
  const [getCustomers, setGetCustomers] = useState([]);
  const [selectedCustomerDeatails, setSelectedCustomerDetails] = useState();
  const [selectRow, setSelectRow] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [sortSecondConfig, setSecondConfig] = useState({
    key: null,
    direction: null,
  });
  const [treeNodes, setTreeNodes] = useState([]);
  const [tableData, setTableData] = useState([]);

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
        toast.success("Loading schedule data.");
      })
      .catch((err) => {
        console.error("Error in fetching table data:", err);
      });
  };

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
    const selectedScheduleId = list.ScheduleId;

    console.log("selectedScheduleId", selectedScheduleId);

    axios
      .post(baseURL + `/analysisRouterData/getTableData/`, {
        fromDate,
        toDate,
        selectedScheduleId,
      })
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => console.error("Error fetching shift logs:", error));

    // Fetch combined data (nctasklist and scheduleLog) from the backend API
    axios
      .post(baseURL + `/analysisRouterData/loadCustomerDetails/`, {
        fromDate,
        toDate,
        selectedScheduleId,
      })
      .then((response) => {
        setSelectedCustomerDetails(response.data);

        const { nctasklist, scheduleLog } = response.data;

        processMachineTimeData(nctasklist, scheduleLog);
      })
      .catch((error) => console.error("Error fetching shift logs:", error));
  };

  // Processing machine time data for TreeView nodes
  const processMachineTimeData = (nctasklist, scheduleLog) => {
    const taskMachineTime = scheduleLog.reduce((acc, log) => {
      const key = log.TaskNo;
      const taskTime =
      Math.floor(new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60); // time in minutes

      if (!acc[key]) {
        acc[key] = {
          TaskNo: log.TaskNo,
          NcTaskId: log.NcTaskId,
          taskTime: 0,
          MachineList: {},
        };
      }
      acc[key].taskTime += taskTime;

      if (!acc[key].MachineList[log.Machine]) {
        acc[key].MachineList[log.Machine] = 0;
      }
      acc[key].MachineList[log.Machine] += taskTime;

      return acc;
    }, {});

    // Mapping processed data to TreeView nodes
    const newTreeNodes = Object.values(taskMachineTime).map((task) => {
      const taskNode = {
        title: `${task.TaskNo} - ${getHourMin(task.taskTime)}`,
        machines: Object.entries(task.MachineList).map(([machine, time]) => ({
          title: `${machine} / MachineTime: ${getHourMin(time)}`,
          time: time,
        })),
      };

      // Add machine target rate calculations (from ncTaskList if available)
      const ncTask = nctasklist.find((t) => t.NcTaskId === task.NcTaskId);
      if (ncTask) {
        taskNode.billedValue = ncTask.JWValue;
        taskNode.operation = ncTask.Operation;
      }

      return taskNode;
    });

    setTreeNodes(newTreeNodes);
  };

  // Format time in hours and minutes
  const getHourMin = (min) => {
    const hr = Math.floor(min / 60);
    const mins = Math.floor(min % 60);
    return `${hr}:${mins < 10 ? "0" : ""}${mins}`;
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

  // Helper function to calculate hourly rate for a machine
  const getMachineOperationHrRate = (machine, operation) => {
    const rateItem = machineOperationsrateList.find(
      (item) => item.Machine === machine && item.Operation === operation
    );
    return rateItem ? rateItem.TgtRate : 0;
  };

  // sorting function for table headings of the table
  const requestSecondSort = (key) => {
    let direction = "asc";
    if (sortSecondConfig.key === key && sortSecondConfig.direction === "asc") {
      direction = "desc";
    }
    setSecondConfig({ key, direction });
  };

  const sortedSecondData = () => {
    const dataCopy = [...tableData];

    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        let valueA = a[sortSecondConfig.key];
        let valueB = b[sortSecondConfig.key];

        // Convert only for the "intiger" columns
        if (
          sortSecondConfig.key === "MaterialValue" ||
          sortSecondConfig.key === "HourRateTarget" ||
          sortSecondConfig.key === "HourRateAchieved" ||
          sortSecondConfig.key === "MachineHours" ||
          sortSecondConfig.key === "Pierces" ||
          sortSecondConfig.key === "LOC" ||
          sortSecondConfig.key === "Thick" 
          
        ) {
          valueA = parseFloat(valueA);
          valueB = parseFloat(valueB);
        }

        if (valueA < valueB) {
          return sortSecondConfig.direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortSecondConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  };

  // console.log("selected customer data", selectedCustomerDeatails);
  // console.log("treeNodes", treeNodes);
  // console.log("selected row", selectRow);
  // console.log("customers", getCustomers);
  // console.log("tableData", tableData);

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
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
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
          <Table striped className="table-data border">
            <thead
              className="tableHeaderBGColor"
              style={{ textAlign: "center" }}
            >
              <tr style={{ whiteSpace: "nowrap" }}>
                <th onClick={() => requestSecondSort("TaskNo")}>TaskNo</th>
                <th onClick={() => requestSecondSort("Mtrl_Code")}>Material</th>
                <th onClick={() => requestSecondSort("Thick")}>Thick</th>
                <th onClick={() => requestSecondSort("Operation")}>
                  Operation
                </th>
                <th onClick={() => requestSecondSort("LOC")}>LOC</th>
                <th onClick={() => requestSecondSort("Pierces")}>Pierces</th>
                <th onClick={() => requestSecondSort("MachineHours")}>
                  Machine Hours
                </th>
                <th onClick={() => requestSecondSort("HourRateAchieved")}>
                  Hour Rate Achieved
                </th>
                <th onClick={() => requestSecondSort("HourRateTarget")}>
                  Hour Rate Target
                </th>
                <th
                  onClick={() => requestSecondSort("MaterialValue")}
                  style={{ textAlign: "left" }}
                >
                  Material Value
                </th>
              </tr>
            </thead>

            <tbody className="tablebody">
              {sortedSecondData() ? (
                sortedSecondData().map((item, index) => {
                  return (
                    <tr
                      className=""
                      style={{ whiteSpace: "nowrap" }}
                      key={item.NcTaskId || index}
                    >
                      <td>{item.TaskNo}</td>
                      <td>{item.Mtrl_Code}</td>
                      <td>{item.Thick}</td>
                      <td>{item.Operation}</td>
                      <td>{item.LOC}</td>
                      <td>{item.Pierces}</td>
                      <td>{item.MachineHours}</td>
                      <td>{item.HourRateAchieved}</td>
                      <td>{item.HourRateTarget}</td>
                      <td style={{ textAlign: "left" }}>
                        {item.MaterialValue}
                      </td>
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
          <SchedulePerformanceTreeView treeNodes={treeNodes} />
        </div>
      </div>
    </div>
  );
}
