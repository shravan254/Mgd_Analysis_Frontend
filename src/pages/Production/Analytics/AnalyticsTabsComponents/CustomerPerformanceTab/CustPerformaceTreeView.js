import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function CustPerformaceTreeView({ treeViewNodes }) {
  const [subMenuOpen, setSubMenuOpen] = useState(-1);
  const toggleMenu = (x) => setSubMenuOpen(subMenuOpen === x ? -1 : x);
  return (
    <div>
      <div className="MainDiv" style={{ height: "350px", overflowY: "scroll" }}>
        <div className="container">
          {treeViewNodes.map((node, i) => {
            // Check if node has details (summary node)
            if (node.details) {
              const summaryLabel = (
                <span className="node" style={{ fontSize: "12px" }}>
                  {node.title}
                </span>
              );

              return (
                <TreeView
                  key={node.title + "|" + i}
                  nodeLabel={summaryLabel}
                  defaultCollapsed={false}
                >
                  {node.details.map((detail, index) => (
                    <div
                      key={detail.label + "|" + index}
                      className="info"
                      style={{ fontSize: "11px" }}
                    >
                      {detail.label}: {detail.value}
                    </div>
                  ))}
                </TreeView>
              );
            } else {
              // Handle machine nodes
              const machineLabel = (
                <span className="node" style={{ fontSize: "12px" }}>
                  {node}
                </span>
              );

              return (
                <TreeView
                  key={node + "|" + i}
                  nodeLabel={machineLabel}
                  defaultCollapsed={true}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
