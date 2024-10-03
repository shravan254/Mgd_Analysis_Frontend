import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsAllTabs from "./AnalyticsAllTabs";
import { baseURL } from "../../../api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";

export default function AnalyticsForm() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [getMachinePerformanceData, setGetMachinePerformanceData] = useState(
    []
  );
  const [custBilling, setCustBilling] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalVA, setTotalVA] = useState(0);
  const [totalMV, setTotalMV] = useState(0);
  const [processedMachineData, setProcessedMachineData] = useState([]);
  const [operationsData, setOperationsData] = useState([]);
  const [machineOperationsrateList, setMachineOperationsrateList] = useState(
    []
  );
  const [processedData, setProcessedData] = useState([]);
  const [processedCustomerData, setProcessedCustomerData] = useState([]);
  const navigate = useNavigate();

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDate = (e) => {
    setToDate(e.target.value);
  };

  const handleButtonClick = () => {
    handleGetData();
  };

  const handleGetData = async () => {
    let machineLogs = [];  
  
   await axios
      .post(baseURL + `/analysisRouterData/loadMachinePerfomanceData`, {
        fromDate: fromDate,
        toDate: toDate,
      })
      .then((res) => {
        setGetMachinePerformanceData(res.data);
        toast.success("Data loaded successfully.");
        const { machineLogBook, custBilling } = res.data;
  
        machineLogs = machineLogBook; // Assign machineLogBook to machineLogs
  
        processMachineLog(machineLogBook, custBilling);
  
        // Store the result of processMachineData in a variable
        const processedMachineData = processMachineData(machineLogBook);
  
        // Process the machine log to format the operations data
        const operations = processOperations(machineLogBook);
        setProcessedMachineData(processedMachineData);
        setOperationsData(operations);
  
        // Process the machine log to format the material data
        const materialData = processMaterialData(machineLogBook);
        setProcessedData(materialData);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  
   await axios
      .get(baseURL + `/analysisRouterData/prodDataMachineOperationsrateList`)
      .then((res) => {
        const { machineData, customerData } = res.data;
        setMachineOperationsrateList(machineData);
  
        // Process the machine log and custBilling to format the Customer data
        const loadCustomerData = processCustomerData(machineLogs, customerData);
        setProcessedCustomerData(loadCustomerData);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  };
  

  // Helper functions 
  const getMachineOperationHrRate = (machine, operation) => {
    const rateItem = machineOperationsrateList.find(
      (item) => item.Machine === machine && item.Operation === operation
    );
    return rateItem ? rateItem.TgtRate : 0;
  };

  const formatValue = (value) => {
    return value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getHourMin = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  const processMachineLog = (machineLogBook, custBillingData) => {
    const custOpsMachineList = machineLogBook.reduce((acc, log) => {
      const timeDiff =
        (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60); // In minutes
      const existingCust = acc.find((cust) => cust.Cust_Code === log.Cust_Code);
      if (existingCust) {
        existingCust.custMachineTime += timeDiff;
      } else {
        acc.push({
          Cust_name: log.Cust_Name,
          Cust_Code: log.Cust_Code,
          custMachineTime: timeDiff,
        });
      }
      return acc;
    }, []);

    const updatedCustBilling = custBillingData.map((cust) => {
      const matchingLog = custOpsMachineList.find(
        (log) => log.Cust_Code === cust.Cust_Code
      );
      if (matchingLog) {
        cust.Machinetime = matchingLog.custMachineTime;
        cust.Hours = getHourMin(matchingLog.custMachineTime);
      }
      return cust;
    });

    const totalHours = custOpsMachineList.reduce(
      (sum, cust) => sum + cust.custMachineTime,
      0
    );
    const totalVA = updatedCustBilling.reduce(
      (sum, cust) => sum + (cust.JWValue || 0),
      0
    );
    const totalMV = updatedCustBilling.reduce(
      (sum, cust) => sum + (cust.MaterialValue || 0),
      0
    );

    setCustBilling(updatedCustBilling);
    setTotalHours(getHourMin(totalHours));
    setTotalVA(totalVA);
    setTotalMV(totalMV);
  };

  //Load By Machine
  const processMachineData = (machineLogBook) => {
    // Process the machine log data similarly to how the VB code does it
    const machines = [...new Set(machineLogBook.map((log) => log.Machine))]; // Distinct Machines

    return machines.map((machine) => {
      let machineTime = 0;
      const productionOps = machineLogBook
        .filter((log) => log.Machine === machine && log.TaskNo !== "100")
        .reduce((acc, log) => {
          const opsTime =
            Math.abs(new Date(log.ToTime) - new Date(log.FromTime)) /
            (1000 * 60); // Minutes
          machineTime += opsTime;
          acc.push({
            operation: log.Operation,
            time: opsTime,
          });
          return acc;
        }, []);

      const otherActions = machineLogBook
        .filter((log) => log.Machine === machine && log.TaskNo === "100")
        .reduce((acc, log) => {
          const opsTime =
            Math.abs(new Date(log.ToTime) - new Date(log.FromTime)) /
            (1000 * 60); // Minutes
          machineTime += opsTime;
          acc.push({
            operation: log.Operation,
            time: opsTime,
          });
          return acc;
        }, []);

      return {
        machine,
        machineTime,
        productionOps,
        otherActions,
      };
    });
  };

  //Load By Operation
  const processOperations = (machineLogBook) => {
    // Processing production operations (TaskNo !== "100")
    const productionOps = machineLogBook
      .filter((log) => log.TaskNo !== "100")
      .reduce((acc, log) => {
        const opsTime =
          Math.abs(new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60); // Time difference in minutes
        if (!acc[log.Operation]) {
          acc[log.Operation] = { machines: [], totalOpsTime: 0, totalValue: 0 };
        }
        acc[log.Operation].machines.push({
          machine: log.Machine,
          time: opsTime,
          value:
            (opsTime * getMachineOperationHrRate(log.Machine, log.Operation)) /
            60,
        });
        acc[log.Operation].totalOpsTime += opsTime;
        acc[log.Operation].totalValue += acc[log.Operation].machines.reduce(
          (sum, machine) => sum + machine.value,
          0
        );
        return acc;
      }, {});

    const productionTreeData = {
      title: `Production / Value ${formatValue(
        Object.values(productionOps).reduce(
          (sum, ops) => sum + ops.totalValue,
          0
        )
      )}`,
      key: "production",
      children: Object.keys(productionOps).map((operation, idx) => {
        const opsData = productionOps[operation];
        return {
          title: `${operation} : ${getHourMin(
            opsData.totalOpsTime
          )} / Value ${formatValue(opsData.totalValue)}`,
          key: `production-${idx}`,
          children: opsData.machines.map((machine, idx2) => ({
            title: `${machine.machine} : ${getHourMin(
              machine.time
            )} / Value ${formatValue(machine.value)}`,
            key: `machine-${idx}-${idx2}`,
          })),
        };
      }),
    };

    // Processing other actions (TaskNo === "100")
    const otherActionsOps = machineLogBook
      .filter((log) => log.TaskNo === "100")
      .reduce((acc, log) => {
        const opsTime =
          Math.abs(new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60); // Time difference in minutes
        if (!acc[log.Operation]) {
          acc[log.Operation] = { machines: [], totalOpsTime: 0 };
        }
        acc[log.Operation].machines.push({
          machine: log.Machine,
          time: opsTime,
        });
        acc[log.Operation].totalOpsTime += opsTime;
        return acc;
      }, {});

    const otherActionsTreeData = {
      title: "Other Actions",
      key: "otherActions",
      children: Object.keys(otherActionsOps).map((operation, idx) => {
        const opsData = otherActionsOps[operation];
        return {
          title: `${operation} : ${getHourMin(opsData.totalOpsTime)}`,
          key: `otherActions-${idx}`,
          children: opsData.machines.map((machine, idx2) => ({
            title: `${machine.machine} : ${getHourMin(machine.time)}`,
            key: `other-machine-${idx}-${idx2}`,
          })),
        };
      }),
    };

    return [productionTreeData, otherActionsTreeData];
  };

  // Load By Material
  const processMaterialData = (machineLogBook) => {
    const materialHours = machineLogBook.reduce((acc, log) => {
      if (log.FromTime && log.ToTime && !log.TaskNo.startsWith("100")) {
        const materialTime = (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60); // Calculate time in minutes

        // Group by Material
        const materialGroup = acc.find((item) => item.Material === log.Material);
        if (materialGroup) {
          materialGroup.mtrlTime += materialTime;
          materialGroup.opsGroup.push(log);
        } else {
          acc.push({
            Material: log.Material,
            mtrlTime: materialTime,
            opsGroup: [log],
          });
        }
      }
      return acc;
    }, []);

    // Process operations and material codes within each material group
    return materialHours.map((mtrl) => {
      const opsGroup = mtrl.opsGroup.reduce((opsAcc, log) => {
        const operationTime = (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60);

        // Group by Operation
        const opsItem = opsAcc.find((item) => item.Operation === log.Operation);
        if (opsItem) {
          opsItem.opsTime += operationTime;
          opsItem.mtrlCodeList.push(log);
        } else {
          opsAcc.push({
            Operation: log.Operation,
            opsTime: operationTime,
            mtrlCodeList: [log],
          });
        }
        return opsAcc;
      }, []);

      // For each operation, calculate the material codes
      const mtrlCodeList = opsGroup.map((ops) => {
        const mtrlCodeTime = ops.mtrlCodeList.reduce((acc, mtrlCodeLog) => {
          const mtrlCodeTime = (new Date(mtrlCodeLog.ToTime) - new Date(mtrlCodeLog.FromTime)) / (1000 * 60);
          return acc + mtrlCodeTime;
        }, 0);

        return {
          Operation: ops.Operation,
          mtrlCodeTime,
          mtrlCodes: ops.mtrlCodeList.map((log) => ({
            Mtrl_Code: log.Mtrl_Code,
            time: mtrlCodeTime,
          })),
        };
      });

      return {
        Material: mtrl.Material,
        mtrlTime: mtrl.mtrlTime,
        opsGroup: mtrlCodeList,
      };
    });
  };

  //Load By Customer
  const processCustomerData = (machineLogBook, custBilling) => {
    const customerMap = {};

    machineLogBook.forEach((log) => {
      if (!log.Cust_Code || log.TaskNo === "100" || !log.FromTime || !log.ToTime) return;

      const custKey = log.Cust_Code;
      const opKey = log.Operation;
      const machineKey = log.Machine;

      if (!customerMap[custKey]) {
        customerMap[custKey] = {
          Cust_name: custBilling.find((c) => c.Cust_Code === log.Cust_Code)?.Cust_name || "Unknown",
          Cust_Code: log.Cust_Code,
          custMachineTime: 0,
          OpsGp: {},
        };
      }

      // Add machine time for the customer
      const machineTime = (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60); // in minutes
      customerMap[custKey].custMachineTime += machineTime;

      // Group by Operation
      if (!customerMap[custKey].OpsGp[opKey]) {
        customerMap[custKey].OpsGp[opKey] = {
          Operation: log.Operation,
          opsMachineTime: 0,
          machineGp: {},
        };
      }
      customerMap[custKey].OpsGp[opKey].opsMachineTime += machineTime;

      // Group by Machine
      if (!customerMap[custKey].OpsGp[opKey].machineGp[machineKey]) {
        customerMap[custKey].OpsGp[opKey].machineGp[machineKey] = {
          Machine: log.Machine,
          machineTime: 0,
        };
      }
      customerMap[custKey].OpsGp[opKey].machineGp[machineKey].machineTime += machineTime;
    });

    // Convert object into array to use in JSX rendering
    return Object.values(customerMap).map((customer) => ({
      ...customer,
      OpsGp: Object.values(customer.OpsGp).map((operation) => ({
        ...operation,
        machineGp: Object.values(operation.machineGp),
      })),
    }));
};

  console.log("Processed Machine Data:", processedMachineData);
  console.log("operationsData", operationsData);
  console.log("fromdate", fromDate, "todate", toDate);
  console.log("getMachinePerformanceData", getMachinePerformanceData);
  console.log(
    "custBilling",
    custBilling,
    "totalHours",
    totalHours,
    "totalVA",
    totalVA,
    "totalMV",
    totalMV
  );
  console.log("processedData", processedData);
  console.log("processedCustomerData", processedCustomerData);
  

  return (
    <div>
      <div className="row">
        <h4 className="title ">Performance Analysis</h4>
      </div>

      <div className="row">
        <div className="col-md-3">
          <label className="form-label">Magod Laser: Jigani</label>
        </div>
        <div className="col-md-3 d-flex mt-1" style={{ gap: "10px" }}>
          <label className="form-label">From</label>
          <input
            className="in-field"
            type="date"
            onChange={(e) => handleFromDate(e)}
          ></input>
        </div>
        <div className="col-md-3 d-flex mt-1" style={{ gap: "10px" }}>
          <label className="form-label">To</label>
          <input
            className="in-field"
            type="date"
            onChange={(e) => handleToDate(e)}
          ></input>
        </div>
        <div className="col-md-3">
          <button
            className="button-style group-button"
            onClick={handleButtonClick}
          >
            Load Data
          </button>
          <button
            className="button-style group-button"
            type="button"
            onClick={(e) => navigate("/Analysis")}
          >
            Close
          </button>
        </div>
      </div>

      <AnalyticsAllTabs
        fromDate={fromDate}
        toDate={toDate}
        processedMachineData={processedMachineData}
        operationsData={operationsData}
        machineOperationsrateList={machineOperationsrateList}
        custBilling={custBilling}
        getMachinePerformanceData={getMachinePerformanceData}
        processedData={processedData}
        processedCustomerData={processedCustomerData}
      />
    </div>
  );
}
