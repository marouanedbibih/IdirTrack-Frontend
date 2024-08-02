// Filename: MyContextProvider.tsx

// Chnage the word "My" by your context name
"use client";

import { Staff } from "@/types/StaffTypes";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

// Define the type for the context state
interface StaffContextProps {
  // Staff state
  staffList: Staff[];
  setStaffList: (staffList: Staff[]) => void;
}

// Create the context
const StaffContext = createContext<StaffContextProps | undefined>(undefined);

// Define the provider component
const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to hold the staff list
  const [staffList, setStaffList] = useState<Staff[]>([]);

  return (
    <StaffContext.Provider value={{ 
        staffList, 
        setStaffList
     }}>
      {children}
    </StaffContext.Provider>
  );
};

// Custom hook to use the context
export const useStaffContext = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaffContext must be used within a StaffProvider");
  }
  return context;
};

export { StaffProvider };
