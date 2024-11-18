import axios from "axios";
import React, { useContext, useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";
import { baseURL } from "../../../../../api/baseUrl";
import { MachinePerformanceContext } from "../../../../../Context/AnalysisContext";

export default function ByMaterialTreeView({
  processedData,
  fromDate,
  toDate,
}) {
  const [selectRow, setSelectRow] = useState("");
  const { setByMaterialData } = useContext(MachinePerformanceContext);

  const selectedRowFun = (materialName, index) => {
    setSelectRow(index);

    axios
      .post(baseURL + `/analysisRouterData/byMaterialTabledata`, {
        fromDate: fromDate,
        toDate: toDate,
        materialName: materialName,
      })
      .then((res) => {
        setByMaterialData(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  };

  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll" }}>
        <div className="container">
          {processedData.map((materialNode, i) => {
            const materialLabel = (
              <span
                className={`node ${i === selectRow ? "selcted-row-clr" : ""}`}
                style={{ fontSize: "11px", cursor: "pointer" }}
                onClick={() => selectedRowFun(materialNode.Material, i)}
              >
                {materialNode.Material} - {materialNode.mtrlTime}
              </span>
            );

            return (
              <TreeView
                key={`${materialNode.Material}|${i}`}
                nodeLabel={materialLabel}
                defaultCollapsed={true}
              >
                {materialNode.operations.map((operationNode, j) => {
                  const operationLabel = (
                    <span className="node" style={{ fontSize: "12px" }}>
                      {operationNode.Operation} - {operationNode.opsTime}
                    </span>
                  );

                  return (
                    <TreeView
                      key={`${operationNode.Operation}|${j}`}
                      nodeLabel={operationLabel}
                      defaultCollapsed={true}
                    >
                      {operationNode.mtrlCodes.map((mtrlCodeNode, k) => {
                        return (
                          <div
                            className="info"
                            style={{
                              fontSize: "11px",
                            }}
                            key={`${mtrlCodeNode.Mtrl_Code}|${k}`}
                          >
                            {mtrlCodeNode.Mtrl_Code} - {mtrlCodeNode.time}
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
