"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useClientContext } from "./ClientProvider";
import {
  createClientAPI,
  deleteClientAPI,
  getClientByIdAPI,
  getListOfClients,
  searchClientAPI,
  updateClientAPI,
} from "../ClientService";
import { useGlobalContext } from "@/context/GlobalProvider";
import { request } from "http";
import { IClientRequest } from "../types/type";
import { MessageType } from "@/types/Basics";
import { IMyResponse } from "@/operators/types";
import { IMyErrResponse } from "@/types";

// Define the type for the context state
interface ClientFunctionsContextProps {
  fetchClients: (page: number, size: number) => void;
  searchClients: (keyword: string, page: number, size: number) => void;
  createClient: (request: IClientRequest) => void;
  fetchClientById: (id: number) => void;
  updateClientById: (id: number, request: IClientRequest) => void;
  deleteClientById: (id: number) => void;
}

// Create the context
const ClientFunctionsContext = createContext<
  ClientFunctionsContextProps | undefined
>(undefined);

// Define the provider component
const ClientFunctionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Global context
  const { setAlertOpen, setMessage } = useGlobalContext();
  // Data from the context
  const { data, setData } = useClientContext();
  // Loading from the context
  const { tableLoading, setTableLoading } = useClientContext();
  // Pagination from the context
  const { pagination, setPagination } = useClientContext();
  // Search keyword from the context
  const { searchKeyword } = useClientContext();
  // Client Request from the context
  const { clientRequest, setClientRequest } = useClientContext();
  // ILoading from the context
  const { loading, setLoading } = useClientContext();
  // IDialog from the context
  const { dialog, setDialog } = useClientContext();
  // InputError from the context
  const { inputErrors, setInputErrors } = useClientContext();
  // Init Client Request
  const { initClientRequest } = useClientContext();

  // Fetch clients
  const fetchClients = async (page: number, size: number) => {
    // Set the loading
    setTableLoading(true);
    // Call the service
    getListOfClients(page, size)
      .then((res: ApiResponse) => {
        res.content ? setData(res.content) : setData(null);
        setPagination({
          currentPage: res.metadata.currentPage,
          totalPages: res.metadata.totalPages,
          size: res.metadata.size,
          totalElements: res.metadata.totalElements,
        });
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
        setAlertOpen(true);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  // Search clients
  const searchClients = async (keyword: string, page: number, size: number) => {
    setData(null);
    // Set the loading
    setTableLoading(true);
    // Call the service
    searchClientAPI(keyword, page, size)
      .then((res: ApiResponse) => {
        if (res.content) {
          setData(res.content);
          setPagination({
            currentPage: res.metadata.currentPage,
            totalPages: res.metadata.totalPages,
            size: res.metadata.size,
            totalElements: res.metadata.totalElements,
          });
        } else {
          setData(null);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            size: 5,
            totalElements: 0,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // setMessage(err.message);
        setAlertOpen(true);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  // Create client
  const createClient = (request: IClientRequest) => {
    setLoading({ ...loading, form: true });
    createClientAPI(request)
      .then((res: ApiResponse) => {
        setMessage({
          message: res.message ? res.message : "Client created successfully",
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        setDialog({ ...dialog, form: false });
        fetchClients(pagination.currentPage, pagination.size);
        initClientRequest();
      })
      .catch((err: ApiResponse) => {
        console.error("Error creating client", err);
        setMessage({
          message: err.message ? err.message : "Error creating client",
          messageType: MessageType.ERROR,
        });
        setInputErrors(err.errors);
      })
      .finally(() => {
        setLoading({ ...loading, form: false });
      });
  };

  // Fetch client by ID
  const fetchClientById = async (id: number) => {
    // Set the loading
    setLoading({ ...loading, form: true });
    // Call the service
    getClientByIdAPI(id)
      .then((res: IMyResponse) => {
        setClientRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
        setAlertOpen(true);
      })
      .finally(() => {
        setLoading({ ...loading, form: false });
      });
  };

  // Update client by ID
  const updateClientById = async (id: number, request: IClientRequest) => {
    // Set the loading
    setLoading({ ...loading, form: true });
    // Call the service
    updateClientAPI(id, request)
      .then((res: ApiResponse) => {
        setMessage({
          message: res.message ? res.message : "Client updated successfully",
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        setDialog({ ...dialog, form: false });
        fetchClients(pagination.currentPage, pagination.size);
        initClientRequest();
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
        setAlertOpen(true);
      })
      .finally(() => {
        setLoading({ ...loading, form: false });
      });
  };

  // Delete client by ID
  const deleteClientById = async (id: number) => {
    // Set the loading
    setLoading({ ...loading, delete: true });
    // Call the service
    deleteClientAPI(id)
      .then((res: IMyResponse) => {
        setMessage({
          message: res.message ? res.message : "Client deleted successfully",
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        fetchClients(pagination.currentPage, pagination.size);
      })
      .catch((err: IMyErrResponse) => {
        console.log(err);
        setMessage({
          message: err.message,
          messageType: MessageType.ERROR,
        });
        setAlertOpen(true);
      })
      .finally(() => {
        setLoading({ ...loading, delete: false });
        setDialog({ ...dialog, delete: false });
      });
  };

  return (
    <ClientFunctionsContext.Provider
      value={{
        fetchClients,
        searchClients,
        createClient,
        fetchClientById,
        updateClientById,
        deleteClientById,
      }}
    >
      {children}
    </ClientFunctionsContext.Provider>
  );
};

// Custom hook to use the context
export const useClientFunctionsContext = () => {
  const context = useContext(ClientFunctionsContext);
  if (!context) {
    throw new Error(
      "useClientFunctionsContext must be used within a ClientFunctionsProvider"
    );
  }
  return context;
};

export { ClientFunctionsProvider };
