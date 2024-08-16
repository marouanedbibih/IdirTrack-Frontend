// Filename: MyContextProvider.tsx

// Chnage the word "My" by your context name
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
import { IManager, IManagerRequest } from "./ManagerTypes";
import { getAllManagersListAPI } from "./ManagerServices";

// Define the type for the context state
interface ManagerContextProps {
  // Manager state
  ManagerList: IManager[];
  setManagerList: (ManagerList: IManager[]) => void;

  // Pagination state
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;

  // Search state
  search: string;
  setSearch: (search: string) => void;

  // Table loading state
  tableLoading: boolean;
  setTableLoading: (tableLoading: boolean) => void;

  // Alert state
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;

  // Message state
  message: MessageInterface;
  setMessage: (message: MessageInterface) => void;

  // Manager Request state
  ManagerRequest: IManagerRequest;
  setManagerRequest: (request: IManagerRequest) => void;
  resetManagerRequest: () => void;

  // Modal Form state
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;

  // Handle open form
  handleOpenForm: () => void;

  // Errors
  errors: ErrorInterface[];
  setErrors: (errors: ErrorInterface[]) => void;

  // Stafe ID
  ManagerId: number;
  setManagerId: (ManagerId: number) => void;

  // Fetch all Managers
  fetchManagerList: (page: number, size: number) => void;
}

// Create the context
const ManagerContext = createContext<ManagerContextProps | undefined>(
  undefined
);

// Define the provider component
const ManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to hold the Manager list
  const [ManagerList, setManagerList] = useState<IManager[]>([]);

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

  // Alert state
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  // Message state
  const [message, setMessage] = useState<MessageInterface>({
    message: "",
    messageType: MessageType.INIT,
    messagesObject: null,
  });

  // Manager Request
  const [ManagerRequest, setManagerRequest] = useState<IManagerRequest>({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
  });

  // Reset Manager Request
  const resetManagerRequest = () => {
    setManagerRequest({
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
    });
  };

  // Modal Form state
  const [openForm, setOpenForm] = useState<boolean>(false);

  // Handel open form
  const handleOpenForm = () => {
    setOpenForm(!openForm);
    resetManagerRequest();
  };

  // Errors state
  const [errors, setErrors] = useState<ErrorInterface[]>([]);

  // Manager ID state
  const [ManagerId, setManagerId] = useState<number>(0);

  /**
   * This function is used to fetch the Manager list from the service and update the state
   * of the Manager list, the pagination and the loading state
   * @param page
   * @param size
   */

  const fetchManagerList = (page: number, size: number) => {
    setTableLoading(true);
    getAllManagersListAPI(page, size)
      .then((data) => {
        setManagerList(data.content);
        setPagination({
          currentPage: data.metadata?.currentPage ?? 1,
          totalPages: data.metadata?.totalPages ?? 1,
          size: data.metadata?.size ?? 5,
          totalElements: data.metadata?.totalElements ?? 0,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  return (
    <ManagerContext.Provider
      value={{
        ManagerList,
        setManagerList,
        pagination,
        setPagination,

        search,
        setSearch,

        tableLoading,
        setTableLoading,

        // Alert state
        alertOpen,
        setAlertOpen,

        // Message state
        message,
        setMessage,

        // Manager Request state
        ManagerRequest,
        setManagerRequest,

        // Modal Form state
        openForm,
        setOpenForm,

        // Handle open form
        handleOpenForm,

        // Errors
        errors,
        setErrors,

        // Reset Manager Request
        resetManagerRequest,

        // Manager ID
        ManagerId,
        setManagerId,

        // Fetch all Managers
        fetchManagerList,
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
