// Filename: OperatorContextProvider.tsx

"use client";

import { DynamicAlert } from "@/components/alert/DynamicAlert";
import {
  ErrorInterface,
  MessageInterface,
  MessageType,
  Pagination,
} from "@/types/Basics";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { IOperator, IOperatorRequest } from "../types/type";
import { IMyFieldError } from "../types";
import { getOperatorsWithPaginationAPI } from "../OperatorService";

// Define the type for the context state
interface OperatorContextProps {
  // Operators List state
  operatorsList: IOperator[];
  setOperatorsList: (operatorsList: IOperator[]) => void;

  // Operator Request state
  operatorRequest: IOperatorRequest;
  setOperatorRequest: (operatorRequest: IOperatorRequest) => void;
  resetOperatorRequest: () => void;

  // Pagination state
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;

  // loading state
  loading: boolean;
  setLoading: (loading: boolean) => void;

  // Example alert state
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;

  // Example message state
  message: MessageInterface;
  setMessage: (message: MessageInterface) => void;

  // Fetch Operators List
  fetchOperatorsList: (page: number, size: number) => void;

  // Field Error Response
  error: IMyFieldError;
  setError: (error: IMyFieldError) => void;
  // Field Errors Response
  errors: IMyFieldError[];
  setErrors: (errors: IMyFieldError[]) => void;

  // Table loading state
  tableLoading: boolean;
  setTableLoading: (tableLoading: boolean) => void;

  // Operator Id state
  operatorId: number;
  setOperatorId: (operatorId: number) => void;
  // Open Form state
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;
  // Handle open form
  handleOpenForm: () => void;
}

// Create the context
const OperatorContext = createContext<OperatorContextProps | undefined>(
  undefined
);

// Define the provider component
const OperatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Operators List state
  const [operatorsList, setOperatorsList] = useState<IOperator[]>([]);

  // Operator Request state
  const [operatorRequest, setOperatorRequest] = useState<IOperatorRequest>({
    name: "",
  });

  // Reset Operator Request
  const resetOperatorRequest = () => {
    setOperatorRequest({
      name: "",
    });
  };

  // Pagination state
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    size: 4,
    totalPages: 1,
    totalElements: 0,
  });

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Alert state
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  // Message state
  const [message, setMessage] = useState<MessageInterface>({
    message: "",
    messageType: MessageType.INIT,
    messagesObject: null,
  });

  // Field Error Response
  const [error, setError] = useState<IMyFieldError>({
    field: "",
    message: "",
  });
  // Field Errors Response
  const [errors, setErrors] = useState<IMyFieldError[]>([]);

  // Fetch Operators List
  const fetchOperatorsList = (page: number, size: number) => {
    setLoading(true);
    getOperatorsWithPaginationAPI(page, size)
      .then((response) => {
        setOperatorsList(response.data);
        setPagination({
          currentPage: response.metadata.currentPage,
          size: response.metadata.size,
          totalPages: response.metadata.totalPages,
          totalElements: response.metadata.totalElements,
        });
      })
      .catch((error: any) => {
        console.log("Operators List Error: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Table loading state
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  // Operator Id state
  const [operatorId, setOperatorId] = useState<number>(0);
  // Open Form state
  const [openForm, setOpenForm] = useState<boolean>(false);
  // Handel open form
  const handleOpenForm = () => {
    setOpenForm(!openForm);
    resetOperatorRequest();
    setErrors([]);
    if (operatorId) {
      setOperatorId(0);
    }
  };

  return (
    <OperatorContext.Provider
      value={{
        operatorsList,
        setOperatorsList,
        operatorRequest,
        setOperatorRequest,
        resetOperatorRequest,
        pagination,
        setPagination,
        loading,
        setLoading,
        alertOpen,
        setAlertOpen,
        message,
        setMessage,
        fetchOperatorsList,
        error,
        setError,
        errors,
        setErrors,
        tableLoading,
        setTableLoading,
        operatorId,
        setOperatorId,
        openForm,
        setOpenForm,
        handleOpenForm,
      }}
    >
      {children}

      {message && message.messageType !== MessageType.INIT && (
        <DynamicAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title={message.messageType?.toString()}
          message={message.message ?? ""}
          type={message.messageType}
        />
      )}
    </OperatorContext.Provider>
  );
};

// Custom hook to use the context
export const useOperatorContext = () => {
  const context = useContext(OperatorContext);
  if (!context) {
    throw new Error(
      "useOperatorContext must be used within a OperatorProvider"
    );
  }
  return context;
};

export { OperatorProvider };
