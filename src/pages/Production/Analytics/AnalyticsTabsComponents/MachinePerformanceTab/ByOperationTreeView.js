import React, { useContext, useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";
import { MachinePerformanceContext } from "../../../../../Context/AnalysisContext";

export default function ByOperationTreeView({
  operationsData,
  fromDate,
  toDate,
}) {
  const { setByOperationData } = useContext(MachinePerformanceContext);
  const [selectRow, setSelectRow] = useState("");

  const selectedRowFun = (operationName, index) => {
    const operationOnly = operationName.split(":")[0].trim();
    setSelectRow(index);

    axios
      .post(`${baseURL}/analysisRouterData/byOperationTabledataProduction`, {
        fromDate: fromDate,
        toDate: toDate,
        operationName: operationOnly,
      })
      .then((res) => {
        setByOperationData(res.data);
      })
      .catch((err) => {
        console.log("Error in table", err);
      });
  };

  return (
    <div>
      <div
        className="MainDiv"
        style={{ height: "375px", overflowY: "scroll", overflowX: "scroll" }}
      >
        <div className="container">
          {operationsData.map((node, i) => {
            const label = (
              <span className="node" style={{ fontSize: "12px" }}>
                {node.title}
              </span>
            );

            return (
              <TreeView
                key={node.key + "|" + i}
                nodeLabel={label}
                defaultCollapsed={true}
              >
                {node.children.map((child, childIndex) => {
                  const label2 = (
                    <span
                      className={`node ${
                        childIndex === selectRow ? "selcted-row-clr" : ""
                      }`}
                      style={{ fontSize: "11px", cursor: "pointer" }}
                      onClick={() => selectedRowFun(child.title, childIndex)}
                    >
                      {child.title}
                    </span>
                  );

                  return (
                    <TreeView
                      nodeLabel={label2}
                      key={child.key}
                      defaultCollapsed={true}
                    >
                      {/* Additional info can be mapped from child if necessary */}
                      {child.children.length > 0 && (
                        <div className="info" style={{ fontSize: "11px" }}>
                          {child.children.map((subChild) => (
                            <div key={subChild.key}>{subChild.title}</div>
                          ))}
                        </div>
                      )}
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
