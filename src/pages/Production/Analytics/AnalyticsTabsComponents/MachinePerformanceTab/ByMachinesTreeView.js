import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function ByMachinesTreeView({ processedMachineData }) {
  const dataSource = processedMachineData.map((task) => ({
    type: task.machine, // Machine name
    machineTime: task.machineTime.toFixed(2), // Machine time
    productionOps: task.productionOps.map((production) => ({
      name: `${production.operation} : ${production.time.toFixed(2)} value -`, // Production operations
    })),
    otherActions: task.otherActions.map((action) => ({
      name: `${action.operation} : ${action.time.toFixed(2)}`, // Other actions
    })),
  }));

  console.log("data");

  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll" }}>
        <div className="container">
          {dataSource.map((node, i) => {
            const machineLabel = (
              <span className="node" style={{ fontSize: "12px" }}>
                {`${node.type} / ${node.machineTime}`}{" "}
                {/* Machine name with machineTime */}
              </span>
            );

            return (
              <TreeView
                key={node.type + "|" + i}
                nodeLabel={machineLabel}
                defaultCollapsed={true} // You can change this to true if you want machines collapsed initially
              >
                {/* Production Operations */}
                <TreeView
                  nodeLabel={
                    <span
                      style={{ fontSize: "12px", backgroundColor: "#92ec93" }}
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
                      {production.name}{" "}
                      {/* Show production operation with time */}
                    </div>
                  ))}
                </TreeView>

                {/* Other Actions */}
                <TreeView
                  nodeLabel={
                    <span
                      style={{ fontSize: "12px", backgroundColor: "#f48483" }}
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
                      {action.name} {/* Show other action with time */}
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
