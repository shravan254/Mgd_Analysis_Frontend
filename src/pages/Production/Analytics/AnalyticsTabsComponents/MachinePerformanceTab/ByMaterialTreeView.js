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

  const getHourMin = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const sortedData = processedData.sort((a, b) => {
    const timeA = timeStringToMinutes(getHourMin(a.mtrlTime));
    const timeB = timeStringToMinutes(getHourMin(b.mtrlTime));
    return timeB - timeA;
  });

  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll" }}>
        <div className="container">
          {sortedData.map((materialNode, i) => {
            const materialLabel = (
              <span
                className={`node ${i === selectRow ? "selcted-row-clr" : ""}`}
                style={{ fontSize: "11px", cursor: "pointer" }}
                onClick={() => selectedRowFun(materialNode.Material, i)}
              >
                {materialNode.Material} - {getHourMin(materialNode.mtrlTime)}
              </span>
            );

            return (
              <TreeView
                key={materialNode.Material + "|" + i}
                nodeLabel={materialLabel}
                defaultCollapsed={true}
              >
                {materialNode.opsGroup.map((operationNode, j) => {
                  const operationLabel = (
                    <span className="node" style={{ fontSize: "12px" }}>
                      {operationNode.Operation} -{" "}
                      {getHourMin(operationNode.mtrlCodeTime)}
                    </span>
                  );
                  return (
                    <TreeView
                      nodeLabel={operationLabel}
                      key={operationNode.Operation + "|" + j}
                      defaultCollapsed={true}
                    >
                      {operationNode.mtrlCodes.map((mtrlCodeNode, k) => {
                        const mtrlCodeLabel = (
                          <div
                            className="info"
                            style={{
                              fontSize: "11px",
                            }}
                            key={mtrlCodeNode.Mtrl_Code + "|" + k}
                          >
                            {mtrlCodeNode.Mtrl_Code} -{" "}
                            {getHourMin(mtrlCodeNode.time)}
                          </div>
                        );
                        return mtrlCodeLabel;
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
