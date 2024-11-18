import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalyticsAllTabs from "./AnalyticsAllTabs";
import { baseURL } from "../../../api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";

export default function AnalyticsForm() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [getMachinePerformanceData, setGetMachinePerformanceData] = useState(
    []
  );
  const [custBilling, setCustBilling] = useState([]);
  const [processedMachineData, setProcessedMachineData] = useState([]);
  const [operationsData, setOperationsData] = useState([]);
  const [machineOperationsrateList, setMachineOperationsrateList] = useState(
    []
  );
  const [processedData, setProcessedData] = useState([]);
  const [processedCustomerData, setProcessedCustomerData] = useState([]);
  const [getMachineLogBook, setGetMachineLogBook] = useState([]);
  const [getCustBillig, setGetCustBillig] = useState([]);
  const [getCustomerData, setGetCustomerData] = useState([]);
  const [getTreeViewData, setTreeViewData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    await axios
      .post(baseURL + `/analysisRouterData/loadMachinePerfomanceData`, {
        fromDate: fromDate,
        toDate: toDate,
      })
      .then((res) => {
        setGetMachinePerformanceData(res.data);
        const { machineLogBook, custBilling } = res.data;
        setGetMachineLogBook(machineLogBook);
        setGetCustBillig(custBilling);
        setCustBilling(custBilling);
      })
      .catch((err) => {
        console.log("err in table", err);
      });

    await axios
      .get(baseURL + `/analysisRouterData/prodDataMachineOperationsrateList`)
      .then((res) => {
        const { machineData, customerData } = res.data;
        setMachineOperationsrateList(machineData);
        setGetCustomerData(customerData);
      })
      .catch((err) => {
        console.log("err in table", err);
      });

    setLoading(false);
  };

  useEffect(() => {
    // Load Machine
    const processedMachineData = processMachineData(getMachineLogBook);
    setProcessedMachineData(processedMachineData);

    // Load Operation
    const operations = processOperations(getMachineLogBook);
    setOperationsData(operations);

    // Load Material
    const materialData = processMaterialData(getMachineLogBook);
    setProcessedData(materialData);

    // Load Customer
    const loadCustomerData = processCustomerData(
      getMachineLogBook,
      getCustomerData
    );
    setProcessedCustomerData(loadCustomerData);
  }, [getMachineLogBook, getCustBillig, getCustomerData]);

  const formatValue = (value) => {
    return value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getMachineOperationHrRate = (machine, operation) => {
    const rateItem = machineOperationsrateList.find(
      (item) => item.Machine === machine && item.Operation === operation
    );
    return rateItem ? rateItem.TgtRate : 0;
  };

  const getHourMin = (min) => {
    const hr = Math.floor(min / 60);
    const mins = Math.floor(min % 60);
    return `${hr}:${mins < 10 ? "0" : ""}${mins}`;
  };

  // Load By Machine
  const processMachineData = (machineLogBook) => {
    const machines = [...new Set(machineLogBook.map((log) => log.Machine))];

    return machines.map((machine) => {
      const machineLogs = machineLogBook.filter(
        (log) => log.Machine === machine
      );
      const productionLogs = machineLogs.filter((log) => log.TaskNo !== "100");
      const otherLogs = machineLogs.filter((log) => log.TaskNo === "100");

      // Group operations for production and other logs, including value calculation
      const productionOps = groupOperations(productionLogs, machine);
      const otherOps = groupOperations(otherLogs, machine);

      // Calculate total machine time (no double counting here, already accumulated in groupOperations)
      const totalProductionTime = productionOps.reduce(
        (sum, op) => sum + op.OpsTime,
        0
      );
      const totalOtherTime = otherOps.reduce((sum, op) => sum + op.OpsTime, 0);

      const machineTime = totalProductionTime + totalOtherTime;

      return {
        machine,
        machineTime: getHourMin(machineTime), // Convert total machine time to hr and min
        production: {
          time: getHourMin(totalProductionTime),
          operations: productionOps.map((op) => ({
            ...op,
            formattedTime: getHourMin(op.OpsTime),
            value: op.Value.toFixed(2), // Use the already calculated value
          })),
        },
        other: {
          time: getHourMin(totalOtherTime),
          operations: otherOps.map((op) => ({
            ...op,
            formattedTime: getHourMin(op.OpsTime),
            value: op.Value.toFixed(2), // Use the already calculated value
          })),
        },
      };
    });
  };

  // Helper function to group operations by type and sum their time
  const groupOperations = (logs, machine) => {
    const opsGroup = logs.reduce((acc, log) => {
      const key = log.Operation;

      const fromTime = Date.parse(log.FromTime);
      const toTime = Date.parse(log.ToTime);

      // Calculate time in minutes and round down to avoid extra minute
      const time = Math.floor((toTime - fromTime) / 60000); // Floored time in minutes

      // If the operation doesn't exist in the accumulator, initialize it
      if (!acc[key]) {
        acc[key] = {
          Operation: log.Operation,
          OpsTime: 0,
          Rate: getMachineOperationHrRate(machine, log.Operation), // Store the rate for this operation
          Value: 0, // Initialize Value here
        };
      }

      // Accumulate the time for the operation
      acc[key].OpsTime += time;

      // Recalculate value based on accumulated time and rate
      acc[key].Value = (acc[key].OpsTime * acc[key].Rate) / 60;

      return acc;
    }, {});

    // Return the grouped operations with the calculated values
    return Object.values(opsGroup);
  };

  //Load By Operation
  const processOperations = (machineLogBook) => {
    // Helper function to group by machine
    const groupByMachine = (operations) => {
      return operations.reduce((acc, machine) => {
        const uniqueKey = `${machine.machine}-${machine.time}`;
        // Check if the machine's time entry already exists
        if (!acc[machine.machine]) {
          acc[machine.machine] = { details: [], totalTime: 0, totalValue: 0 };
        }
        // Avoid adding duplicate machine entries
        if (!acc[machine.machine].details.some((d) => d.key === uniqueKey)) {
          acc[machine.machine].details.push(machine);
          acc[machine.machine].totalTime += machine.time;
          acc[machine.machine].totalValue += machine.value;
        }
        return acc;
      }, {});
    };

    // Processing production operations (TaskNo !== "100")
    const productionOps = machineLogBook
      .filter((log) => log.TaskNo !== "100")
      .reduce((acc, log) => {
        const opsTime = Math.max(
          0,
          Math.floor(
            (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60)
          ) // Time in minutes
        );

        if (!acc[log.Operation]) {
          acc[log.Operation] = [];
        }
        acc[log.Operation].push({
          machine: log.Machine,
          time: opsTime,
          value:
            (opsTime * getMachineOperationHrRate(log.Machine, log.Operation)) /
            60,
        });
        return acc;
      }, {});

    // Generate tree data for production
    const productionTreeData = {
      title: `Production / Value ${formatValue(
        Object.values(productionOps)
          .flat()
          .reduce((sum, op) => sum + op.value, 0)
      )}`,
      key: "production",
      children: Object.keys(productionOps).map((operation, idx) => {
        const machineGrouped = groupByMachine(productionOps[operation]);
        return {
          title: `${operation} : ${getHourMin(
            Object.values(machineGrouped).reduce(
              (sum, m) => sum + m.totalTime,
              0
            )
          )} / Value ${formatValue(
            Object.values(machineGrouped).reduce(
              (sum, m) => sum + m.totalValue,
              0
            )
          )}`,
          key: `production-${idx}`,
          children: Object.keys(machineGrouped).map((machineName, idx2) => {
            const machineData = machineGrouped[machineName];
            return {
              title: `${machineName} : ${getHourMin(
                machineData.totalTime
              )} / Value ${formatValue(machineData.totalValue)}`,
              key: `machine-${operation}-${idx2}`,
              children: machineData.details.map((detail, idx3) => ({
                title: `Time: ${getHourMin(detail.time)} / Value: ${formatValue(
                  detail.value
                )}`,
                key: `detail-${operation}-${idx2}-${idx3}`,
              })),
            };
          }),
        };
      }),
    };

    // Processing other actions (TaskNo === "100")
    const otherActionsOps = machineLogBook
      .filter((log) => log.TaskNo === "100")
      .reduce((acc, log) => {
        const opsTime = Math.max(
          0,
          Math.floor(
            (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60)
          ) // Time in minutes
        );

        if (!acc[log.Operation]) {
          acc[log.Operation] = [];
        }
        acc[log.Operation].push({
          machine: log.Machine,
          time: opsTime,
        });
        return acc;
      }, {});

    // Generate tree data for other actions
    const otherActionsTreeData = {
      title: "Other Actions",
      key: "otherActions",
      children: Object.keys(otherActionsOps).map((operation, idx) => {
        const machineGrouped = groupByMachine(otherActionsOps[operation]);
        return {
          title: `${operation} : ${getHourMin(
            Object.values(machineGrouped).reduce(
              (sum, m) => sum + m.totalTime,
              0
            )
          )}`,
          key: `otherActions-${idx}`,
          children: Object.keys(machineGrouped).map((machineName, idx2) => {
            const machineData = machineGrouped[machineName];
            return {
              title: `${machineName} : ${getHourMin(machineData.totalTime)}`,
              key: `other-machine-${operation}-${idx2}`,
              children: machineData.details.map((detail, idx3) => ({
                title: `Time: ${getHourMin(detail.time)}`,
                key: `detail-other-${operation}-${idx2}-${idx3}`,
              })),
            };
          }),
        };
      }),
    };

    return [productionTreeData, otherActionsTreeData];
  };

  // Load By Material
  const processMaterialData = (machineLogBook) => {
    // Step 1: Group logs by Material
    const materialHours = machineLogBook.reduce((acc, log) => {
      if (log.FromTime && log.ToTime && !log.TaskNo.startsWith("100")) {
        const materialTime = Math.floor(
          (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60)
        ); // Time in minutes

        // Find or initialize the material group
        let materialGroup = acc.find((item) => item.Material === log.Material);
        if (!materialGroup) {
          materialGroup = {
            Material: log.Material,
            mtrlTime: 0,
            opsGroup: [],
          };
          acc.push(materialGroup);
        }

        // Accumulate material time (only once)
        materialGroup.mtrlTime += materialTime;

        // Push log into the opsGroup for further processing
        materialGroup.opsGroup.push(log);
      }
      return acc;
    }, []);

    // Step 2: Group operations and material codes within each material group
    return materialHours.map((mtrl) => {
      // Process operations
      const operations = mtrl.opsGroup.reduce((opsAcc, log) => {
        const operationTime = Math.floor(
          (new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60)
        ); // Time in minutes

        // Find or initialize the operation group
        let opsItem = opsAcc.find((item) => item.Operation === log.Operation);
        if (!opsItem) {
          opsItem = {
            Operation: log.Operation,
            opsTime: 0,
            mtrlCodes: [],
          };
          opsAcc.push(opsItem);
        }

        // Accumulate operation time (only once)
        opsItem.opsTime += operationTime;

        // Find or initialize the material code group
        let mtrlCodeItem = opsItem.mtrlCodes.find(
          (item) => item.Mtrl_Code === log.Mtrl_Code
        );
        if (!mtrlCodeItem) {
          mtrlCodeItem = {
            Mtrl_Code: log.Mtrl_Code,
            time: 0,
          };
          opsItem.mtrlCodes.push(mtrlCodeItem);
        }

        // Accumulate time for the material code
        mtrlCodeItem.time += operationTime;

        return opsAcc;
      }, []);

      // Construct the final structure for the material
      return {
        Material: mtrl.Material,
        mtrlTime: getHourMin(mtrl.mtrlTime), // Convert total material time to "hr:min"
        operations: operations.map((ops) => ({
          Operation: ops.Operation,
          opsTime: getHourMin(ops.opsTime), // Convert total operation time to "hr:min"
          mtrlCodes: ops.mtrlCodes.map((mtrlCode) => ({
            Mtrl_Code: mtrlCode.Mtrl_Code,
            time: getHourMin(mtrlCode.time), // Convert material code time to "hr:min"
          })),
        })),
      };
    });
  };

  //Load By Customer
  const processCustomerData = (machineLogBook, custBilling) => {
    const customerMap = {};
  
    machineLogBook.forEach((log) => {
      if (
        !log.Cust_Code ||
        log.TaskNo === "100" ||
        !log.FromTime ||
        !log.ToTime
      )
        return;
  
      const custKey = log.Cust_Code;
      const opKey = log.Operation;
      const machineKey = log.Machine;
  
      if (!customerMap[custKey]) {
        customerMap[custKey] = {
          Cust_name:
            custBilling.find((c) => c.Cust_Code === log.Cust_Code)?.Cust_name ||
            "Unknown",
          Cust_Code: log.Cust_Code,
          custMachineTime: 0,
          OpsGp: {},
        };
      }
  
      // Add machine time for the customer
      const machineTime =
        Math.floor((new Date(log.ToTime) - new Date(log.FromTime)) / (1000 * 60)); // in minutes
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
      customerMap[custKey].OpsGp[opKey].machineGp[machineKey].machineTime +=
        machineTime;
    });
  
    // Convert object into array and sort by `custMachineTime` in descending order
    const customerArray = Object.values(customerMap).map((customer) => ({
      ...customer,
      custMachineTime: customer.custMachineTime, // Keep as minutes for sorting
      OpsGp: Object.values(customer.OpsGp).map((operation) => ({
        ...operation,
        opsMachineTime: operation.opsMachineTime, // Keep as minutes for sorting
        machineGp: Object.values(operation.machineGp).map((machine) => ({
          ...machine,
          machineTime: machine.machineTime, // Keep as minutes for sorting
        })),
      })),
    }));
  
    // Sort customers by total time in descending order
    customerArray.sort((a, b) => b.custMachineTime - a.custMachineTime);
  
    // Convert minutes back to hr:min format for display
    return customerArray.map((customer) => ({
      ...customer,
      custMachineTime: getHourMin(customer.custMachineTime), // Convert to hr:min
      OpsGp: customer.OpsGp.map((operation) => ({
        ...operation,
        opsMachineTime: getHourMin(operation.opsMachineTime), // Convert to hr:min
        machineGp: operation.machineGp.map((machine) => ({
          ...machine,
          machineTime: getHourMin(machine.machineTime), // Convert to hr:min
        })),
      })),
    }));
  };

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

      {loading ? (
        <Loading animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Loading>
      ) : (
        <AnalyticsAllTabs
          fromDate={fromDate}
          toDate={toDate}
          processedMachineData={processedMachineData}
          getTreeViewData={getTreeViewData}
          operationsData={operationsData}
          machineOperationsrateList={machineOperationsrateList}
          custBilling={custBilling}
          getMachinePerformanceData={getMachinePerformanceData}
          processedData={processedData}
          processedCustomerData={processedCustomerData}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
