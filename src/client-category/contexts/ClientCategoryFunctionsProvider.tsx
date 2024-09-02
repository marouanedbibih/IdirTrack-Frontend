"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useClientCategoryContext } from "./ClientCategoryProvider";
import {
  createClientCategoryAPI,
  deleteClientCategoryAPI,
  getClientCategoryByIdAPI,
  getClientCategoryiesForDropdownAPI,
  getListOfClientCategoriesAPI,
  updateClientCategoryAPI,
} from "../ClientCategoryService";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ICategoryRequest } from "../types/type";
import { MessageType } from "@/types/Basics";
import { after } from "node:test";
import { IMyResponse } from "@/operators/types";

// Define the type for the context state
interface ClientCategoryFunctionsContextProps {
  fetchClientCategories: (page: number, size: number) => void;
  createClientCategory: (request: ICategoryRequest) => void;
  updateClientCategory: (id: number, request: ICategoryRequest) => void;
  fetchClientCategoryById: (id: number) => void;
  deleteClientCategory: (id: number) => void;
  fetchClientCategoryDropdown: () => void;
}

// Create the context
const ClientCategoryFunctionsContext = createContext<
  ClientCategoryFunctionsContextProps | undefined
>(undefined);

// Define the provider component
const ClientCategoryFunctionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Global context
  const { setMessage, setAlertOpen } = useGlobalContext();
  // Data state
  const { data, setData } = useClientCategoryContext();
  // Table loading state
  const { tableLoading, setTableLoading } = useClientCategoryContext();
  // Pagination state
  const { pagination, setPagination, initPagination } =
    useClientCategoryContext();
  // Form loading state
  const { formLoading, setFormLoading } = useClientCategoryContext();
  // Category request state
  const { categoryRequest, setCategoryRequest, initClientCategoryRequest } =
    useClientCategoryContext();
  // Delete loading state
  const { deleteLoading, setDeleteLoading } = useClientCategoryContext();
  // afterAction state
  const { afterAction } = useClientCategoryContext();
  // Delete Dialog state
  const { isDeleteDialogOpen, setOpenDeleteDialog } = useClientCategoryContext();
  // Open Form state
  const { isFormOpen, setOpenForm } = useClientCategoryContext();
  // Client Category Dropdown state
  const { clientCategoryDropdown, setClientCategoryDropdown } =
    useClientCategoryContext();
  

  // Fatch client categories data from API
  const fetchClientCategories = async (page: number, size: number) => {
    setData(null);
    setTableLoading(true);
    getListOfClientCategoriesAPI(page, size)
      .then((res: IMyResponse) => {
        res.data
          ? (setData(res.data),
            setPagination({
              currentPage: res.metadata.currentPage,
              size: res.metadata.size,
              totalPages: res.metadata.totalPages,
              totalElements: res.metadata.totalElements,
            }))
          : setData(null);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          message: err.message
            ? err.message
            : "Failed to fetch client categories",
          messageType: MessageType.ERROR,
        });
        setAlertOpen(true);
      })
      .finally(() => setTableLoading(false));
  };

  // Fetch client category by ID
  const fetchClientCategoryById = async (id: number) => {
    setFormLoading(true);
    getClientCategoryByIdAPI(id)
      .then((res: IMyResponse) => {
        setCategoryRequest(res.data);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          message: err.message
            ? err.message
            : "Failed to fetch client category",
          messageType: MessageType.ERROR,
        });
        setAlertOpen(true);
      })
      .finally(() => setFormLoading(false));
  };

  // Create a new client category
  const createClientCategory = async (request: ICategoryRequest) => {
    setFormLoading(true);
    createClientCategoryAPI(request)
      .then((res: IMyResponse) => {
        setMessage({
          message: res.message
            ? res.message
            : "Client category created successfully",
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        afterAction();
        fetchClientCategories(pagination.currentPage, pagination.size);
        setOpenForm(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          message: err.message
            ? err.message
            : "Failed to create client category",
          messageType: MessageType.ERROR,
        });
        setAlertOpen(true);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  // Update client category by ID
  const updateClientCategory = async (
    id: number,
    request: ICategoryRequest
  ) => {
    setFormLoading(true);
    updateClientCategoryAPI(id, request)
      .then((res: IMyResponse) => {
        setMessage({
          message: res.message
            ? res.message
            : "Client category updated successfully",
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        afterAction();
        fetchClientCategories(pagination.currentPage, pagination.size);
        setOpenForm(false);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          message: err.message
            ? err.message
            : "Failed to update client category",
          messageType: MessageType.ERROR,
        });
        setAlertOpen(true);
      })
      .finally(() => setFormLoading(false));
  };

  // Delete client category by ID
  const deleteClientCategory = async (id: number) => {
    setDeleteLoading(true);
    deleteClientCategoryAPI(id)
      .then((res: IMyResponse) => {
        setMessage({
          message: res.message
            ? res.message
            : "Client category deleted successfully",
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        afterAction();
        fetchClientCategories(pagination.currentPage, pagination.size);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          message: err.message
            ? err.message
            : "Failed to delete client category",
          messageType: MessageType.ERROR,
        });
        setAlertOpen(true);
      })
      .finally(() =>{
        setDeleteLoading(false);
        setOpenDeleteDialog(false);
      });
  };

  // Fetch list of client categories for dropdown
  const fetchClientCategoryDropdown = async () => {
    getClientCategoryiesForDropdownAPI()
      .then((res: IMyResponse) => {
        setClientCategoryDropdown(res.data);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          message: err.message
            ? err.message
            : "Failed to fetch client categories",
          messageType: MessageType.ERROR,
        });
        setAlertOpen(true);
      });
  };

  return (
    <ClientCategoryFunctionsContext.Provider
      value={{
        fetchClientCategories,
        createClientCategory,
        updateClientCategory,
        fetchClientCategoryById,
        deleteClientCategory,
        fetchClientCategoryDropdown,
      }}
    >
      {children}
    </ClientCategoryFunctionsContext.Provider>
  );
};

// Custom hook to use the context
export const useClientCategoryFunctionsContext = () => {
  const context = useContext(ClientCategoryFunctionsContext);
  if (!context) {
    throw new Error(
      "useClientCategoryFunctionsContext must be used within a ClientCategoryFunctionsProvider"
    );
  }
  return context;
};

export { ClientCategoryFunctionsProvider };
