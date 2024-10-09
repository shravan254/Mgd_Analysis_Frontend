import React, { useContext, useEffect, useState } from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { MachinePerformanceContext } from "../../../../../Context/AnalysisContext";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";

export default function ByMachinesTreeView({
  processedMachineData,
  fromDate,
  toDate,
}) {
  const { setByMachineData } = useContext(MachinePerformanceContext);
  const [selectRow, setSelectRow] = useState("");
  const [machineName, setMachineName] = useState("");

  const selectedRowFun = (machineName, index) => {
    setMachineName(machineName);
    setSelectRow(index);
  };

  const dataSource = processedMachineData.map((task) => ({
    type: task.machine,
    machineTime: task.machineTime.toFixed(2),
    productionOps: task.production.operations.map((production) => ({
      name: `${production.Operation} - ${Math.floor(
        production.OpsTime / 60
      )} hrs, Value: ${production.Value.toFixed(2)}`,
    })),
    otherActions: task.other.operations.map((action) => ({
      name: `${action.Operation} - ${Math.floor(
        action.OpsTime / 60
      )} hrs, Value: ${action.Value.toFixed(2)}`,
    })),
  }));

  const handleOnClickLabel = async (label) => {
    if (label === "Production") {
      try {
        const response = await axios.post(
          baseURL + `/analysisRouterData/byMachineTabledataProduction`,
          {
            fromDate: fromDate,
            toDate: toDate,
            machineName: machineName,
          }
        );

        const resultData = response.data;

        setByMachineData(resultData);
      } catch (err) {
        console.log("Error in fetching Production table data:", err);
      }
    } else if (label === "Other Actions") {
      try {
        const response = await axios.post(
          baseURL + `/analysisRouterData/byMachineTabledataOtherActions`,
          {
            fromDate: fromDate,
            toDate: toDate,
            machineName: machineName,
          }
        );

        const resultData = response.data;
        setByMachineData(resultData);
      } catch (err) {
        console.log("Error in fetching Other Actions table data:", err);
      }
    } else {
      console.log("Data needs to load...!");
    }
  };

  // Auto-select the first row when the component mounts
  useEffect(() => {
    if (dataSource.length > 0) {
      selectedRowFun(dataSource[0].type, 0);
    }
  }, [dataSource]);

  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll" }}>
        <div className="container">
          {dataSource.map((node, i) => {
            const machineLabel = (
              <span
                className={`node ${i === selectRow ? "selcted-row-clr" : ""}`}
                style={{ fontSize: "11px", cursor: "pointer" }}
                onClick={() => selectedRowFun(node.type, i)}
              >
                {`${node.type} / ${Math.floor(node.machineTime / 60)} hrs`}{" "}
              </span>
            );

            return (
              <TreeView
                key={node.type + "|" + i}
                nodeLabel={machineLabel}
                defaultCollapsed={true}
              >
                <TreeView
                  nodeLabel={
                    <span
                      style={{ fontSize: "12px", backgroundColor: "#92ec93" }}
                      onClick={() => {
                        handleOnClickLabel("Production");
                      }}
                    >
                      Production
                    </span>
                  }
                  defaultCollapsed={true}
                >
                  {node.productionOps.map((production, j) => (
                    <div
                      key={production.name + "|" + j}
                      className="node"
                      style={{ fontSize: "11px" }}
                    >
                      {production.name}
                    </div>
                  ))}
                </TreeView>

                <TreeView
                  nodeLabel={
                    <span
                      style={{ fontSize: "12px", backgroundColor: "#f48483" }}
                      onClick={() => {
                        handleOnClickLabel("Other Actions");
                      }}
                    >
                      Other Actions
                    </span>
                  }
                  defaultCollapsed={true}
                >
                  {node.otherActions.map((action, k) => (
                    <div
                      key={action.name + "|" + k}
                      className="node"
                      style={{ fontSize: "11px" }}
                    >
                      {action.name}
                    </div>
                  ))}
                </TreeView>
              </TreeView>
            );
          })}
        </div>
      </div>
    </div>
  );
}
