import React, { createContext, useState } from "react";

// Create a context
const MachinePerformanceContext = createContext();

// Create a provider component
const MachinePerformanceProvider = ({ children }) => {
  const [byMachineData, setByMachineData] = useState([]);
  const [byOperationData, setByOperationData] = useState([]);
  const [byMaterialData, setByMaterialData] = useState([]);
  const [byCustomerData, setByCustomerData] = useState([]);

  return (
    <MachinePerformanceContext.Provider
      value={{
        byMachineData,
        setByMachineData,
        byOperationData,
        setByOperationData,
        byMaterialData,
        setByMaterialData,
        byCustomerData,
        setByCustomerData,
      }}
    >
      {children}
    </MachinePerformanceContext.Provider>
  );
};

export { MachinePerformanceContext, MachinePerformanceProvider };
