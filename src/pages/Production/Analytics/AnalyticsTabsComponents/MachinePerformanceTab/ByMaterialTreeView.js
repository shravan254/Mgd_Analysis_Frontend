import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function ByMaterialTreeView({ processedData }) {
  const getHourMin = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes; // Total minutes
  };

  const sortedData = processedData.sort((a, b) => {
    const timeA = timeStringToMinutes(getHourMin(a.mtrlTime)); // Assuming mtrlTime is stored in minutes
    const timeB = timeStringToMinutes(getHourMin(b.mtrlTime));
    return timeB - timeA; // Descending order
  });

  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll" }}>
        <div className="container">
          {sortedData.map((materialNode, i) => {
            const materialLabel = (
              <span className="node" style={{ fontSize: "12px" }}>
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
