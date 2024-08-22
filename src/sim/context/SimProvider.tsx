"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import { ISim, ISimRequest } from "../types/type";
import { IDisplayStatus,  IFieldErrors, Pagination } from "@/types";
import { IOperator } from "@/operators/types/type";

// Props
interface SimContextProps {
  // Sim List State
  simList: ISim[] | null;
  setSimList: (simList: ISim[] | null) => void;
  // Pagination State
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
  resetPagination: () => void;
  // Table Loading State
  tableLoading: boolean;
  setTableLoading: (loading: boolean) => void;
  // Display Status State
  displayStatus: IDisplayStatus;
  setDisplayStatus: (status: IDisplayStatus) => void;
  onChangeDisplayStatus: (status: string) => void;
  // Sim ID State
  simId: number | null;
  setSimId: (simId: number | null) => void;
  // Open Dialog State
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  // Loading Delete State
  loadingDelete: boolean;
  setLoadingDelete: (loading: boolean) => void;
  // Search Term State
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  // Sim Request State
  simRequest: ISimRequest;
  setSimRequest: (simRequest: ISimRequest) => void;
  resetSimRequest: () => void;
  // Open Form
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;
  handleOpenForm: () => void;
  // Errors State
  fieldErrors: IFieldErrors[];
  setFieldErrors: (errors: IFieldErrors[]) => void;
  resetFieldErrors: () => void;
  // List of Operators
  operatorList: IOperator[];
  setOperatorList: (operatorList: IOperator[]) => void;
  // Form Loading State
  formLoading: boolean;
  setFormLoading: (loading: boolean) => void;
}

const SimContext = createContext<SimContextProps | undefined>(undefined);

const SimProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Devices List State
  const [simList, setSimList] = useState<ISim[] | null>(null);

  // Pagination State
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    size: 5,
    totalElements: 0,
  });
  // Reset Pagination
  const resetPagination = () => {
    setPagination({
      currentPage: 1,
      totalPages: 1,
      size: 5,
      totalElements: 0,
    });
  };

  // Table Loading State
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  // Display Status State
  const [displayStatus, setDisplayStatus] = useState<IDisplayStatus>({
    normal: true,
    filter: false,
    search: false,
  });

  // On Change Display Status
  const onChangeDisplayStatus = (status: string) => {
    resetPagination();
    if (status === "filter") {
      setDisplayStatus({
        filter: true,
        search: false,
        normal: false,
      });
    } else if (status === "search") {
      setDisplayStatus({
        filter: false,
        search: true,
        normal: false,
      });
    } else {
      setDisplayStatus({
        filter: false,
        search: false,
        normal: true,
      });
    }
  };

  // Sim ID State
  const [simId, setSimId] = useState<number | null>(null);

  // Open Dialog State
  const [openDialog, setOpenDialog] = React.useState(false);
  // Loading Delete State
  const [loadingDelete, setLoadingDelete] = React.useState(false);

  // Search Term State
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Sim Request State
  const [simRequest, setSimRequest] = useState<ISimRequest>({
    ccid: "",
    operatorId: 0,
    phone: "",
    pin: "",
    puk: "",
  });
  const resetSimRequest = () => {
    setSimRequest({
      ccid: "",
      operatorId: 0,
      phone: "",
      pin: "",
      puk: "",
    });
  }

  // Open Form
  const [openForm, setOpenForm] = React.useState(false);

  // Handle Open Form
  const handleOpenForm = () => {
    setOpenForm(!openForm);
    resetFieldErrors();
  };

  // Errors State
  const [fieldErrors, setFieldErrors] = useState<IFieldErrors[]>([]);
  const resetFieldErrors = () => {
    setFieldErrors([]);
  };

  // List of Operators
  const [operatorList, setOperatorList] = useState<IOperator[]>([]);
  
  // Form Loading State
  const [formLoading, setFormLoading] = useState<boolean>(false);


  return (
    <SimContext.Provider
      value={{
        // Devices List State
        simList,
        setSimList,
        // Pagination State
        pagination,
        setPagination,
        resetPagination,
        // Table Loading State
        tableLoading,
        setTableLoading,
        // Display Status State
        displayStatus,
        setDisplayStatus,
        onChangeDisplayStatus,
        // Sim ID State
        simId,
        setSimId,
        // Open Dialog State
        openDialog,
        setOpenDialog,
        // Loading Delete State
        loadingDelete,
        setLoadingDelete,
        // Search Term State
        searchTerm,
        setSearchTerm,
        // Sim Request State
        simRequest,
        setSimRequest,
        resetSimRequest,
        // Open Form
        openForm,
        setOpenForm,
        handleOpenForm,
        // Errors State
        fieldErrors,
        setFieldErrors,
        resetFieldErrors,
        // List of Operators
        operatorList,
        setOperatorList,
        // Form Loading State
        formLoading,
        setFormLoading,

      }}
    >
      {children}
    </SimContext.Provider>
  );
};

export const useSimContext = () => {
  const context = useContext(SimContext);
  if (!context) {
    throw new Error("useSimContext must be used within a SimProvider");
  }
  return context;
};

export { SimProvider };
