import React, { useContext, useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";
import { MachinePerformanceContext } from "../../../../../Context/AnalysisContext";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";

export default function ByCustomerTreeView({
  processedCustomerData,
  fromDate,
  toDate,
}) {
  const { setByCustomerData } = useContext(MachinePerformanceContext);
  const [selectRow, setSelectRow] = useState("");

  const selectedRowFun = (customerCode, index) => {
    setSelectRow(index);

    axios
      .post(`${baseURL}/analysisRouterData/byCustomerTabledata`, {
        fromDate: fromDate,
        toDate: toDate,
        customerCode: customerCode,
      })
      .then((res) => {
        setByCustomerData(res.data);
      })
      .catch((err) => {
        console.log("Error in table", err);
      });
  };

  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll" }}>
        <div className="container">
          {processedCustomerData.map((customer, i) => {
            const label = (
              <span
                className={`node ${i === selectRow ? "selcted-row-clr" : ""}`}
                style={{ fontSize: "11px", cursor: "pointer" }}
                onClick={() => selectedRowFun(customer.Cust_Code, i)}
              >
                {customer.Cust_name} ({customer.Cust_Code}) -{" "}
                {customer.custMachineTime}
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
                      {operation.Operation} - {operation.opsMachineTime}
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
                          <div className="info" style={{ fontSize: "11px" }}>
                            {machine.Machine} - {machine.machineTime}
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
