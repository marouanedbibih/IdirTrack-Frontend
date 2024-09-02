"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { ICategory, ICategoryDropdown, ICategoryRequest } from "../types/type";
import { IDisplayStatus, IFieldErrors, IPagination } from "@/types";

// Define the type for the context state
interface ClientCategoryContextProps {
  // Data state
  data: ICategory[] | null;
  setData: (data: ICategory[] | null) => void;
  // Table loading state
  tableLoading: boolean;
  setTableLoading: (loading: boolean) => void;
  // Pagination
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  initPagination: () => void;
  // Category id state
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
  // Category request state
  categoryRequest: ICategoryRequest;
  setCategoryRequest: (request: ICategoryRequest) => void;
  initClientCategoryRequest: () => void;
  // Form loading state
  formLoading: boolean;
  setFormLoading: (loading: boolean) => void;
  // Delete loading state
  deleteLoading: boolean;
  setDeleteLoading: (loading: boolean) => void;
  // After action
  afterAction: () => void;
  // Open Form
  isFormOpen: boolean;
  setOpenForm: (open: boolean) => void;
  // Delete Dialog
  isDeleteDialogOpen: boolean;
  setOpenDeleteDialog: (open: boolean) => void;
  // Field errors state
  fieldErrors: IFieldErrors[];
  setFieldErrors: (errors: IFieldErrors[]) => void;
  // Client Category Dropdown
  clientCategoryDropdown: ICategoryDropdown[];
  setClientCategoryDropdown: (data: ICategoryDropdown[]) => void;
}

// Create the context
const ClientCategoryContext = createContext<
  ClientCategoryContextProps | undefined
>(undefined);

// Define the provider component
const ClientCategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Data state
  const [data, setData] = useState<ICategory[] | null>(null);
  // Table loading state
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  // Pagination state
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });
  // Category id state
  const [categoryId, setCategoryId] = useState<number | null>(null);
  // Category request state
  const [categoryRequest, setCategoryRequest] = useState<ICategoryRequest>({
    name: "",
  });
  // Field errors state
  const [fieldErrors, setFieldErrors] = useState<IFieldErrors[]>([]);
  // Initialize pagination
  const initPagination = () => {
    setPagination({
      currentPage: 1,
      size: 5,
      totalPages: 0,
      totalElements: 0,
    });
  };
  // Form loading state
  const [formLoading, setFormLoading] = useState<boolean>(false);
  // Delete loading state
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  // Initialize category request
  const initClientCategoryRequest = () => {
    setCategoryRequest({
      name: "",
    });
  };
  // After action
  const afterAction = () => {
    initClientCategoryRequest();
    initPagination();
    setCategoryId(null);
  };
  // Open Form
  const [isFormOpen, setOpenForm] = useState<boolean>(false);
  // Open Delete Dialog
  const [isDeleteDialogOpen, setOpenDeleteDialog] = useState<boolean>(false);
  // Client Category Dropdown
  const [clientCategoryDropdown, setClientCategoryDropdown] = useState<
    ICategoryDropdown[]
  >([]);

  return (
    <ClientCategoryContext.Provider
      value={{
        data,
        setData,
        tableLoading,
        setTableLoading,
        pagination,
        setPagination,
        categoryId,
        setCategoryId,
        categoryRequest,
        setCategoryRequest,
        initPagination,
        formLoading,
        setFormLoading,
        deleteLoading,
        setDeleteLoading,
        initClientCategoryRequest,
        afterAction,
        isFormOpen,
        setOpenForm,
        isDeleteDialogOpen,
        setOpenDeleteDialog,
        fieldErrors,
        setFieldErrors,
        clientCategoryDropdown,
        setClientCategoryDropdown,
      }}
    >
      {children}
    </ClientCategoryContext.Provider>
  );
};

// Custom hook to use the context
export const useClientCategoryContext = () => {
  const context = useContext(ClientCategoryContext);
  if (!context) {
    throw new Error(
      "useClientCategoryContext must be used within a ClientCategoryProvider"
    );
  }
  return context;
};

export { ClientCategoryProvider };
