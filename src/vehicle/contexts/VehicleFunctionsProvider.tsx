"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

// Define the type for the context state
interface VehicleFunctionsContextProps {

}

// Create the context
const VehicleFunctionsContext = createContext<VehicleFunctionsContextProps | undefined>(undefined);

// Define the provider component
const VehicleFunctionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


  return (
    <VehicleFunctionsContext.Provider
      value={{

      }}
    >
      {children}

    </VehicleFunctionsContext.Provider>
  );
};

// Custom hook to use the context
export const useVehicleFunctionsContext = () => {
  const context = useContext(VehicleFunctionsContext);
  if (!context) {
    throw new Error("useVehicleFunctionsContext must be used within a VehicleFunctionsProvider");
  }
  return context;
};

export { VehicleFunctionsProvider };
