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
import { IDeviceType, IDeviceTypeRequest } from "../types/DeviceType";
import {
  getAllDeviceTypesListAPI,
} from "../services/DeviceTypeService";
import { getTotalDevicesCountAPI } from "../services/DeviceService";

// Define the type for the context state
interface DeviceTypeContextProps {
  // DeviceType state
  DeviceTypeList: IDeviceType[];
  setDeviceTypeList: (DeviceTypeList: IDeviceType[]) => void;

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

  // DeviceType Request state
  DeviceTypeRequest: IDeviceTypeRequest;
  setDeviceTypeRequest: (request: IDeviceTypeRequest) => void;
  resetDeviceTypeRequest: () => void;

  // Modal Form state
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;

  // Handle open form
  handleOpenForm: () => void;

  // Errors
  errors: ErrorInterface[];
  setErrors: (errors: ErrorInterface[]) => void;

  // Stafe ID
  DeviceTypeId: number;
  setDeviceTypeId: (DeviceTypeId: number) => void;

  // Fetch all DeviceTypes
  fetchDeviceTypeList: (page: number, size: number) => void;

  // Total Devices count
  totalDevicesCount: number;
  setTotalDevicesCount: (totalDevicesCount: number) => void;
  fetchTotalDevicesCount: () => void;

  // Size 
  size: number;
  setSize: (size: number) => void;
}

// Create the context
const DeviceTypeContext = createContext<DeviceTypeContextProps | undefined>(
  undefined
);

// Define the provider component
const DeviceTypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State to hold the DeviceType list
  const [DeviceTypeList, setDeviceTypeList] = useState<IDeviceType[]>([]);

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

  // DeviceType Request
  const [DeviceTypeRequest, setDeviceTypeRequest] = useState<IDeviceTypeRequest>({
    name: "",
  });

  // Reset DeviceType Request
  const resetDeviceTypeRequest = () => {
    setDeviceTypeRequest({
      name: "",
    });
  };

  // Modal Form state
  const [openForm, setOpenForm] = useState<boolean>(false);

  // Handel open form
  const handleOpenForm = () => {
    setOpenForm(!openForm);
    resetDeviceTypeRequest();
    setErrors([]);
  };

  // Errors state
  const [errors, setErrors] = useState<ErrorInterface[]>([]);

  // DeviceType ID state
  const [DeviceTypeId, setDeviceTypeId] = useState<number>(0);

  /**
   * This function is used to fetch the DeviceType list from the service and update the state
   * of the DeviceType list, the pagination and the loading state
   * @param page
   * @param size
   */

  const fetchDeviceTypeList = (page: number, size: number) => {
    setTableLoading(true);
    getAllDeviceTypesListAPI(page, size)
      .then((data) => {
        setDeviceTypeList(data.content);
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

  // Total Devices count
  const [totalDevicesCount, setTotalDevicesCount] = useState<number>(0);
  const fetchTotalDevicesCount = () => {
    getTotalDevicesCountAPI()
      .then((data) => {
        setTotalDevicesCount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Size state
  const [size, setSize] = useState<number>(4);

  return (
    <DeviceTypeContext.Provider
      value={{
        DeviceTypeList,
        setDeviceTypeList,
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

        // DeviceType Request state
        DeviceTypeRequest,
        setDeviceTypeRequest,

        // Modal Form state
        openForm,
        setOpenForm,

        // Handle open form
        handleOpenForm,

        // Errors
        errors,
        setErrors,

        // Reset DeviceType Request
        resetDeviceTypeRequest,

        // DeviceType ID
        DeviceTypeId,
        setDeviceTypeId,

        // Fetch all DeviceTypes
        fetchDeviceTypeList,

        // Total Devices count
        totalDevicesCount,
        setTotalDevicesCount,
        fetchTotalDevicesCount,

        // Size
        size,
        setSize,
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
    </DeviceTypeContext.Provider>
  );
};

// Custom hook to use the context
export const useDeviceTypeContext = () => {
  const context = useContext(DeviceTypeContext);
  if (!context) {
    throw new Error(
      "useDeviceTypeContext must be used within a DeviceTypeProvider"
    );
  }
  return context;
};

export { DeviceTypeProvider };
