import { Tab } from "bootstrap";
import React from "react";
import { useState } from "react";
import { Tabs } from "react-bootstrap";
import MachinePerformaceForm from "./AnalyticsTabsComponents/MachinePerformanceTab/MachinePerformaceForm";
import ValueAdditionTableForm from "./AnalyticsTabsComponents/ValueAdditionTab/ValueAdditionTableForm";
import CustomerPerformanceForm from "./AnalyticsTabsComponents/CustomerPerformanceTab/CustomerPerformanceForm";
import SchedulePerformanceFormTable from "./AnalyticsTabsComponents/SchedulePerformanceTab/SchedulePerformanceFormTable";

export default function AnalyticsAllTabs() {
  const [key, setKey] = useState("machinePerformance");
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="tab_font">
        <Tab eventKey="machinePerformance" title="Machine Performance">
          <MachinePerformaceForm />
        </Tab>
        <Tab eventKey="valueAddition" title="Value Addition">
          <ValueAdditionTableForm />
        </Tab>
        <Tab eventKey="customerPerformance" title="Customer Performance">
          <CustomerPerformanceForm />
        </Tab>
        <Tab eventKey="schedulePerformance" title="Schedule Performance">
          <SchedulePerformanceFormTable />
        </Tab>
      </Tabs>
    </div>
  );
}
