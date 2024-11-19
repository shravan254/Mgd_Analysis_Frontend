import React, { useState } from "react";
import TreeView from "react-treeview";

import "react-treeview/react-treeview.css";

export default function SchedulePerformanceTreeView({ treeNodes }) {
  // const dataSource = taskMachineTime
  //   .map((task) => ({
  //     type: `${task.TaskNo} - ${task.taskTime.toFixed(2)}`,
  //     people: task.MachineList.map((machine) => ({
  //       name: `${machine.Machine} / Machine Time: ${machine.machineTime.toFixed(
  //         2
  //       )}`,
  //     })),
  //   }))
  //   .sort((a, b) => {
  //     // Sort by TaskNo first, and then by taskTime if TaskNo is the same
  //     const taskComparison = a.type.localeCompare(b.type);
  //     if (taskComparison !== 0) return taskComparison; // Sort by TaskNo
  //     return a.people.length - b.people.length; // Sort by number of machines if TaskNo is the same
  //   });

  return (
    <div>
      <div className="MainDiv" style={{ height: "350px", overflowY: "scroll" }}>
        <div className="container">
          {treeNodes
            .sort((a, b) => {
              // Compare the task titles
              if (a.title < b.title) return -1;
              if (a.title > b.title) return 1;
              return 0;
            })
            .map((node, i) => {
              // First Node (Main Title)
              const mainLabel = (
                <span className="node" style={{ fontSize: "12px" }}>
                  {node.title}
                </span>
              );

              return (
                <TreeView
                  key={node.title + "|" + i}
                  nodeLabel={mainLabel} // First node showing the title
                  defaultCollapsed={false} // Collapsed by default
                >
                  {/* After collapsing, show machine details */}
                  {node.machines.map((machine, index) => (
                    <TreeView
                      key={machine.title + "|" + index}
                      nodeLabel={
                        <span className="node" style={{ fontSize: "12px" }}>
                          {machine.title}
                        </span>
                      }
                      defaultCollapsed={true}
                    />
                  ))}
                </TreeView>
              );
            })}
        </div>
      </div>
    </div>
  );
}
