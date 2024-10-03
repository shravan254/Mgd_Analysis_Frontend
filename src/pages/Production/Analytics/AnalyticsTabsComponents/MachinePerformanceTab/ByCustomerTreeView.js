import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function ByCustomerTreeView({ processedCustomerData }) {
  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll" }}>
        <div className="container">
          {processedCustomerData.map((customer, i) => {
            const label = (
              <span className="node" style={{ fontSize: "11px" }}>
                {customer.Cust_name} ({customer.Cust_Code}) -
                {customer.custMachineTime.toFixed(2)} min
              </span>
            );

            return (
              <TreeView
                key={customer.Cust_Code + "|" + i}
                nodeLabel={label}
                defaultCollapsed={true}
              >
                {customer.OpsGp.map((operation, j) => {
                  const operationLabel = (
                    <span className="node" style={{ fontSize: "11px" }}>
                      {operation.Operation} -
                      {operation.opsMachineTime.toFixed(2)} min
                    </span>
                  );

                  return (
                    <TreeView
                      nodeLabel={operationLabel}
                      key={operation.Operation + "|" + j}
                      defaultCollapsed={true}
                    >
                      {operation.machineGp.map((machine, k) => {
                        const machineLabel = (
                          <div
                            className="info"
                            style={{
                              fontSize: "11px",
                            }}
                          >
                            {machine.Machine} -{machine.machineTime.toFixed(2)}{" "}
                            min
                          </div>
                        );

                        return (
                          <div key={machine.Machine + "|" + k}>
                            {machineLabel}
                          </div>
                        );
                      })}
                    </TreeView>
                  );
                })}
              </TreeView>
            );
          })}
        </div>
      </div>
    </div>
  );
}
