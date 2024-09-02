"use client";
import { Staff, StaffRequest } from "@/staff/type";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";
import { IDialog, IFetching, IID, ILoading, IMyFieldError, IPagination } from "@/types";

// Define the type for the context state
interface StaffContextProps {
  // Staff Fetching states
  staffList: Staff[] | null;
  setStaffList: (staffList: Staff[] | null) => void;
  search: string;
  setSearch: (search: string) => void;

  // Staff Editing states
  staffRequest: StaffRequest;
  setStaffRequest: (request: StaffRequest) => void;
  resetStaffRequest: () => void;
  fieldErrors: IMyFieldError[];
  setFieldErrors: (errors: IMyFieldError[]) => void;

  // Basic states
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  initPagination: () => void;
  loading: ILoading;
  setLoading: (loading: ILoading) => void;
  dialog: IDialog;
  setDialog: (dialog: IDialog) => void;
  fetching: IFetching;
  setFetching: (fetching: IFetching) => void;
  IID: IID;
  setIID: (IIDs: IID) => void;
}

// Create the context
const StaffContext = createContext<StaffContextProps | undefined>(undefined);

// Define the provider component
const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Basics states
  const [loading, setLoading] = useState<ILoading>({ 
    delete: false,
    form: false,
    table: false,
  });
  const [dialog, setDialog] = useState<IDialog>({ 
    delete: false,
    form: false,
    filter: false,
  });
  const [fetching, setFetching] = useState<IFetching>({ 
    normal: false,
    filter: false,
    search: false,
  });
  const [IID, setIID] = useState<IID>({ 
    delete: null,
    update: null,
    fetch: null,
  });
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    size: 5,
  });
  const initPagination = () => {
    setPagination({
      currentPage: 1,
      totalPages: 1,
      totalElements: 0,
      size: 5,
    });
  };

  // Satff Fetching states
  const [staffList, setStaffList] = useState<Staff[] | null>(null);
  const [search, setSearch] = useState<string>("");


  // Staff Editing states
  const [staffRequest, setStaffRequest] = useState<StaffRequest>({
    name: "",
    phone: "",
    position: "",
    clientId: 0,
  });
  const resetStaffRequest = () => {
    setStaffRequest({
      name: "",
      phone: "",
      position: "",
      clientId: 0,
    });
  };
  const [fieldErrors, setFieldErrors] = useState<IMyFieldError[]>([]);


  return (
    <StaffContext.Provider
      value={{
        staffList,
        setStaffList,
        pagination,
        setPagination,
        initPagination,
        search,
        setSearch,
        staffRequest,
        setStaffRequest,
        fieldErrors,
        setFieldErrors,
        loading,
        setLoading,
        dialog,
        setDialog,
        fetching,
        setFetching,
        IID,
        setIID,
        resetStaffRequest,
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
