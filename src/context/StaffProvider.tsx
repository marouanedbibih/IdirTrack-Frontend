// Filename: MyContextProvider.tsx

// Chnage the word "My" by your context name
"use client";

import { searchStaffsAPI } from "@/services/StaffServices";
import { Pagination } from "@/types/Basics";
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

  // Pagination state
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;

  // Search state
  search: string;
  setSearch: (search: string) => void;

  // Table loading state
  tableLoading: boolean;
  setTableLoading: (tableLoading: boolean) => void;
}

// Create the context
const StaffContext = createContext<StaffContextProps | undefined>(undefined);

// Define the provider component
const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to hold the staff list
  const [staffList, setStaffList] = useState<Staff[]>([]);

  // State to hold the pagination
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    size: 5,
    totalElements: 0,
  });

  // State to hold the search
  const [search, setSearch] = useState<string>("");

  // Table loading state
  const [tableLoading, setTableLoading] = useState<boolean>(false);


  return (
    <StaffContext.Provider
      value={{
        staffList,
        setStaffList,
        pagination,
        setPagination,

        search,
        setSearch,

        tableLoading,
        setTableLoading,
      }}
    >
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
