import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function ValueAdditionTreeView({ treeViewData }) {
  // Function to extract the machine number for sorting
  const extractMachineNumber = (label) => {
    const match = label.match(/Laser\s*(\d+)/); // Regex to extract the number after 'Laser'
    return match ? parseInt(match[1], 10) : Infinity; // Return the number or Infinity for unmatched cases
  };

  // Sort treeViewData based on the extracted machine numbers
  const sortedTreeViewData = treeViewData.sort((a, b) => {
    const numberA = extractMachineNumber(a.label);
    const numberB = extractMachineNumber(b.label);
    return numberA - numberB; // Ascending order
  });

  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll" }}>
        <div className="container">
          {sortedTreeViewData.map((node, i) => {
            // Extracting the label for the main node
            const label = (
              <span className="node" style={{ fontSize: "12px", fontWeight: node.style?.fontWeight || "normal" }}>
                {node.label}
              </span>
            );

            return (
              <TreeView
                key={node.label + "|" + i}
                nodeLabel={label}
                defaultCollapsed={false}
              >
                {node.children?.map((child, index) => (
                  <div
                    key={child.label + "|" + index}
                    className="info"
                    style={{ fontSize: "11px", ...(child.style || {}) }}
                  >
                    {child.label}
                  </div>
                ))}
              </TreeView>
            );
          })}
        </div>
      </div>
    </div>
  );
}
