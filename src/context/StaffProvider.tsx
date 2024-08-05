// Filename: MyContextProvider.tsx

// Chnage the word "My" by your context name
"use client";

import { DynamicAlert } from "@/components/alert/DynamicAlert";
import { getAllStaffsListAPI, searchStaffsAPI } from "@/services/StaffServices";
import {
  ErrorInterface,
  MessageInterface,
  MessageType,
  Pagination,
} from "@/types/Basics";
import { Staff, StaffRequest } from "@/types/StaffTypes";
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

  // Alert state
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;

  // Message state
  message: MessageInterface;
  setMessage: (message: MessageInterface) => void;

  // Staff Request state
  staffRequest: StaffRequest;
  setStaffRequest: (request: StaffRequest) => void;
  resetStaffRequest: () => void;

  // Modal Form state
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;

  // Handle open form
  handleOpenForm: () => void;

  // Errors
  errors: ErrorInterface[];
  setErrors: (errors: ErrorInterface[]) => void;

  // Stafe ID
  staffId: number;
  setStaffId: (staffId: number) => void;

  // Fetch all staffs
  fetchStaffList: (page: number, size: number) => void;
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

  // Alert state
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  // Message state
  const [message, setMessage] = useState<MessageInterface>({
    message: "",
    messageType: MessageType.INIT,
    messagesObject: null,
  });

  // Staff Request
  const [staffRequest, setStaffRequest] = useState<StaffRequest>({
    name: "",
    phone: "",
    position: "",
    clientId: 0,
  });

  // Reset Staff Request
  const resetStaffRequest = () => {
    setStaffRequest({
      name: "",
      phone: "",
      position: "",
      clientId: 0,
    });
  };

  // Modal Form state
  const [openForm, setOpenForm] = useState<boolean>(false);

  // Handel open form
  const handleOpenForm = () => {
    setOpenForm(!openForm);
    resetStaffRequest();
  };

  // Errors state
  const [errors, setErrors] = useState<ErrorInterface[]>([]);

  // Staff ID state
  const [staffId, setStaffId] = useState<number>(0);

  /**
   * This function is used to fetch the staff list from the service and update the state
   * of the staff list, the pagination and the loading state
   * @param page
   * @param size
   */

  const fetchStaffList = (page: number, size: number) => {
    setTableLoading(true);
    getAllStaffsListAPI(page, size)
      .then((data) => {
        setStaffList(data.content);
        setPagination({
          currentPage: data.metaData?.currentPage ?? 1,
          totalPages: data.metaData?.totalPages ?? 1,
          size: data.metaData?.size ?? 5,
          totalElements: data.metaData?.totalElements ?? 0,
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

        // Alert state
        alertOpen,
        setAlertOpen,

        // Message state
        message,
        setMessage,

        // Staff Request state
        staffRequest,
        setStaffRequest,

        // Modal Form state
        openForm,
        setOpenForm,

        // Handle open form
        handleOpenForm,

        // Errors
        errors,
        setErrors,

        // Reset Staff Request
        resetStaffRequest,

        // Staff ID
        staffId,
        setStaffId,

        // Fetch all staffs
        fetchStaffList,
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
