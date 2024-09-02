"use client";

import {
  IDialog,
  IDisplayStatus,
  IFetching,
  IID,
  ILoading,
  IMyFieldError,
  InputError,
  IPagination,
} from "@/types";
import { IClient } from "@/vehicle/VehicleTypes";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { IClientRequest, IClientTableDTO } from "../types/type";

// Define the type for the context state
interface ClientContextProps {
  // Basics Satets
  dialog: IDialog;
  setDialog: (dialog: IDialog) => void;
  loading: ILoading;
  setLoading: (loading: ILoading) => void;
  fetching: IFetching;
  setFetching: (fetching: IFetching) => void;
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  initPagination: () => void;
  IIDs: IID;
  setIIDs: (IIDs: IID) => void;

  // Client Edit Satets
  clientRequest: IClientRequest;
  setClientRequest: (clientRequest: IClientRequest) => void;
  initClientRequest: () => void;
  fieldErrors: IMyFieldError[];
  setFieldErrors: (fieldErrors: IMyFieldError[]) => void;
  initFieldErrors: () => void;

  // Client Fetch States
  data: IClientTableDTO[] | null;
  setData: (data: IClientTableDTO[] | null) => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
}

// Create the context
const ClientContext = createContext<ClientContextProps | undefined>(undefined);

// Define the provider component
const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Client Fetch States
  const [data, setData] = useState<IClientTableDTO[] | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Basics States
  const [dialog, setDialog] = useState<IDialog>({
    delete: false,
    form: false,
    filter: false,
  });
  const [loading, setLoading] = useState<ILoading>({
    delete: false,
    form: false,
    table: false,
  });
  const [fetching, setFetching] = useState<IFetching>({
    normal: true,
    filter: false,
    search: false,
  });
  const [IIDs, setIIDs] = useState<IID>({
    delete: null,
    update: null,
    fetch: null,
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

  // Client Edit States
  const [clientRequest, setClientRequest] = useState<IClientRequest>({
    categoryId: 0,
    cne: "",
    email: "",
    isDisabled: true,
    name: "",
    password: "",
    phone: "",
    remarque: "",
    username: "",
    company: "",
  });
  const initClientRequest = () => {
    setClientRequest({
      categoryId: 0,
      cne: "",
      email: "",
      isDisabled: true,
      name: "",
      password: "",
      phone: "",
      remarque: "",
      username: "",
      company: "",
    });
  };
  const [fieldErrors, setFieldErrors] = useState<IMyFieldError[]>([]);
  const initFieldErrors = () => {
    setFieldErrors([]);
  };

  return (
    <ClientContext.Provider
      value={{
        // Client Fetch States
        data,
        setData,
        searchKeyword,
        setSearchKeyword,
        // Basics States
        dialog,
        setDialog,
        loading,
        setLoading,
        fetching,
        setFetching,
        IIDs,
        setIIDs,
        pagination,
        setPagination,
        initPagination,
        // Client Edit States
        clientRequest,
        setClientRequest,
        initClientRequest,
        fieldErrors,
        setFieldErrors,
        initFieldErrors,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

// Custom hook to use the context
export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};

export { ClientProvider };
