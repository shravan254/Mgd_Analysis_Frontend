import { Tab } from "bootstrap";
import React from "react";
import { useState } from "react";
import { Tabs } from "react-bootstrap";
import MachinePerformaceForm from "./AnalyticsTabsComponents/MachinePerformanceTab/MachinePerformaceForm";
import ValueAdditionTableForm from "./AnalyticsTabsComponents/ValueAdditionTab/ValueAdditionTableForm";
import CustomerPerformanceForm from "./AnalyticsTabsComponents/CustomerPerformanceTab/CustomerPerformanceForm";
import SchedulePerformanceFormTable from "./AnalyticsTabsComponents/SchedulePerformanceTab/SchedulePerformanceFormTable";

export default function AnalyticsAllTabs({
  fromDate,
  toDate,
  processedMachineData,
  operationsData
}) {
  const [key, setKey] = useState("machinePerformance");

  console.log("dates in tabs", fromDate, "and", toDate);

  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="tab_font">
        <Tab eventKey="machinePerformance" title="Machine Performance">
          <MachinePerformaceForm
            fromDate={fromDate}
            toDate={toDate}
            processedMachineData={processedMachineData}
            operationsData={operationsData}
          />
        </Tab>
        <Tab eventKey="valueAddition" title="Value Addition">
          <ValueAdditionTableForm fromDate={fromDate} toDate={toDate} />
        </Tab>
        <Tab eventKey="customerPerformance" title="Customer Performance">
          <CustomerPerformanceForm fromDate={fromDate} toDate={toDate} />
        </Tab>
        <Tab eventKey="schedulePerformance" title="Schedule Performance">
          <SchedulePerformanceFormTable fromDate={fromDate} toDate={toDate} />
        </Tab>
      </Tabs>
    </div>
  );
}
