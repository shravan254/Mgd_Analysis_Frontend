import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function SchedulePerformanceTreeView({ taskMachineTime }) {
  const dataSource = taskMachineTime
    .map((task) => ({
      type: `${task.TaskNo} - ${task.taskTime.toFixed(2)}`,
      people: task.MachineList.map((machine) => ({
        name: `${machine.Machine} / Machine Time: ${machine.machineTime.toFixed(
          2
        )}`,
      })),
    }))
    .sort((a, b) => {
      // Sort by TaskNo first, and then by taskTime if TaskNo is the same
      const taskComparison = a.type.localeCompare(b.type);
      if (taskComparison !== 0) return taskComparison; // Sort by TaskNo
      return a.people.length - b.people.length; // Sort by number of machines if TaskNo is the same
    });

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
                defaultCollapsed={true} // Set to false to prevent collapsing
              >
                {node.people.map((person) => {
                  const label2 = (
                    <span className="node" style={{ fontSize: "12px" }}>
                      {person.name}
                    </span>
                  );
                  return (
                    <TreeView
                      nodeLabel={label2}
                      key={person.name}
                      defaultCollapsed={true} // Set to false to prevent collapsing
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
