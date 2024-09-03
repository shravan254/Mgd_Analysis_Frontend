import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function CustPerformaceTreeView() {
  const dataSource = [
    {
      type: "Program No",
      collapsed: false,
      people: [
        {
          name: "Laser11",
          one: "Process 1",
          two: "Process 2",
          three: "Process 3",
          collapsed: false,
        },

        {
          name: "Laser12",
          one: "Process 4",
          two: "Process 5",
          three: "Process 6",
          collapsed: false,
        },

        {
          name: "Laser13",
          one: "Process 7",
          two: "Process 8",
          three: "Process 9",
          collapsed: false,
        },

        {
          name: "Laser14",
          one: "Process 10",
          two: "Process 11",
          three: "Process 12",
          collapsed: false,
        },
      ],
    },
  ];
  const [subMenuOpen, setSubMenuOpen] = useState(-1);
  const toggleMenu = (x) => setSubMenuOpen(subMenuOpen === x ? -1 : x);
  return (
    <div>
      <div className="MainDiv" style={{ height: "350px", overflowY: "scroll" }}>
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
                      style={{ fontSize: "12px", backgroundColor: "#C0C0C0" }}
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
                        style={{ fontSize: "11px", backgroundColor: "#afbfa1" }}
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
