import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function ByOperationTreeView({ operationsData }) {
  // Function to map the structure to the desired format
  const mapDataToTreeView = (data) => {
    return data.map((group) => {
      return {
        type: group.title, // Using the title as the group type
        collapsed: false,
        people: group.children.map((child) => {
          return {
            name: child.title, // Directly using the title without splitting
            one: `Time: N/A`, // Set default values since you're not splitting
            two: `Value: N/A`,
            three: `Key: ${child.key}`, // Adding the key as additional info
            collapsed: false,
          };
        }),
      };
    });
  };

  // Map the source data
  const dataSource = mapDataToTreeView(operationsData);

  const [subMenuOpen, setSubMenuOpen] = useState(-1);
  const toggleMenu = (x) => setSubMenuOpen(subMenuOpen === x ? -1 : x);

  return (
    <div>
      <div className="MainDiv" style={{ height: "375px", overflowY: "scroll", overflowX: "scroll" }}>
        <div className="container">
          {dataSource.map((node, i) => {
            const type = node.type;
            const label = (
              <span className="node" style={{ fontSize: "12px" }}>
                {type}
              </span>
            );

            return (
              <TreeView
                key={type + "|" + i}
                nodeLabel={label}
                defaultCollapsed={true}
              >
                {node.people.map((person) => {
                  const label2 = (
                    <span
                      className="node"
                      style={{ fontSize: "12px" }}
                    >
                      {person.name}
                    </span>
                  );
                  return (
                    <TreeView
                      nodeLabel={label2}
                      key={person.name}
                      defaultCollapsed={true}
                    >
                      <div
                        className="info"
                        style={{ fontSize: "11px" }}
                      >
                        {person.one}
                      </div>
                      <div
                        className="info"
                        style={{ fontSize: "11px", backgroundColor: "#afbfa1" }}
                      >
                        {person.two}
                      </div>
                      <div
                        className="info"
                        style={{ fontSize: "11px", backgroundColor: "#afbfa1" }}
                      >
                        {person.three}
                      </div>
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
