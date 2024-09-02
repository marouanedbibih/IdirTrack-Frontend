"use client";

import { DynamicAlert } from "@/components/alert/DynamicAlert";
import {
  ErrorInterface,
  MessageInterface,
  MessageType,
  Pagination,
} from "@/types/Basics";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { IManager, IManagerRequest } from "./ManagerTypes";
import { getAllManagersListAPI } from "./ManagerServices";
import { IDialog, IID, ILoading, IMyFieldError, IPagination } from "@/types";

// Define the type for the context state
interface ManagerContextProps {
  // Basics States
  loading: ILoading;
  setLoading: (loading: ILoading) => void;
  dialog: IDialog;
  setDialog: (dialog: IDialog) => void;
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  initPagination: () => void;
  IID: IID;
  setIID: (IID: IID) => void;

  // Manager Fetching state
  ManagerList: IManager[];
  setManagerList: (ManagerList: IManager[]) => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;

  // Manager Editing state
  ManagerRequest: IManagerRequest;
  setManagerRequest: (request: IManagerRequest) => void;
  resetManagerRequest: () => void;
  fieldsErrors: IMyFieldError[];
  setFieldsErrors: (fieldsErrors: IMyFieldError[]) => void;
}

// Create the context
const ManagerContext = createContext<ManagerContextProps | undefined>(
  undefined
);

// Define the provider component
const ManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Basics States
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
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    size: 5,
    totalElements: 0,
  });
  const initPagination = () => {
    setPagination({
      currentPage: 1,
      totalPages: 1,
      size: 5,
      totalElements: 0,
    });
  };
  const [IID, setIID] = useState<IID>({
    delete: null,
    update: null,
    fetch: null,
  });

  // Fetching States
  const [ManagerList, setManagerList] = useState<IManager[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Editing States
  const [ManagerRequest, setManagerRequest] = useState<IManagerRequest>({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
  });
  const resetManagerRequest = () => {
    setManagerRequest({
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
    });
  };
  const [fieldsErrors, setFieldsErrors] = useState<IMyFieldError[]>([]);




  return (
    <ManagerContext.Provider
      value={{
        // Basics States
        loading,
        setLoading,
        dialog,
        setDialog,
        pagination,
        setPagination,
        initPagination,
        IID,
        setIID,

        // Manager Fetching state
        ManagerList,
        setManagerList,
        searchKeyword,
        setSearchKeyword,

        // Manager Editing state
        ManagerRequest,
        setManagerRequest,
        resetManagerRequest,
        fieldsErrors,
        setFieldsErrors,
      }}
    >
      {children}

    </ManagerContext.Provider>
  );
};

// Custom hook to use the context
export const useManagerContext = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error("useManagerContext must be used within a ManagerProvider");
  }
  return context;
};

export { ManagerProvider };
