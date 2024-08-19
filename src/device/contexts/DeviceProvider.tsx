"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  DeviceFormData,
  DeviceInterface,
  DeviceTypeInterface,
} from "../DeviceTypeScript";

import {
  BasicResponse,
  IResponse,
  MessageInterface,
  MessageType,
} from "@/types/Basics";
import { DynamicAlert } from "@/components/alert/DynamicAlert";
import { IDevice, IDeviceFilter, IDeviceRequest } from "../types/Device";
import { getDeviceListAPI } from "../services/DeviceService";
import { IDisplayStatus, IError, IPagination } from "../types";
import { ISelectDeviceType } from "../types/DeviceType";

interface DeviceContextProps {
  // Devices List State
  devicesList: IDevice[];
  setDevicesList: (devicesList: IDevice[]) => void;
  // Fetch Device List
  // fetchDeviceList: (page: number, size: number) => void;
  // Pagination state
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  resetPagination: () => void;
  // Message
  message: MessageInterface;
  setMessage: (message: MessageInterface) => void;
  resetMessage: () => void;
  // Device id
  deviceId: number;
  setDeviceId: (id: number) => void;
  //search device state
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  // Table loading state
  tableLoading: boolean;
  setTableLoading: (tableLoading: boolean) => void;
  // Alert state
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;
  // Open Form
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;
  handleOpenForm: () => void;
  // Device Request
  deviceRequest: IDeviceRequest;
  setDeviceRequest: (request: IDeviceRequest) => void;
  resetDeviceRequest: () => void;
  // Errors state
  errors: IError[];
  setErrors: (errors: IError[]) => void;
  // Reset errors
  resetErrors: () => void;
  // Select Device Type
  deviceTypes: ISelectDeviceType[];
  setDeviceTypes: (deviceTypes: ISelectDeviceType[]) => void;

  // Device Filter
  deviceFilter: IDeviceFilter;
  setDeviceFilter: (filter: IDeviceFilter) => void;
  resetDeviceFilter: () => void;
  // Open Filter Form
  openFilterForm: boolean;
  setOpenFilterForm: (openFilterForm: boolean) => void;
  handleOpenFilterForm: () => void;

  // Display Status
  displayStatus: IDisplayStatus;
  setDisplayStatus: (displayStatus: IDisplayStatus) => void;
  onChangeDisplayStatus: (status: string) => void;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Messages State
  const [message, setMessage] = useState<MessageInterface>({
    message: "",
    messageType: MessageType.INIT,
    messagesObject: null,
  });

  // Reset Message
  const resetMessage = () => {
    setMessage({
      message: "",
      messageType: MessageType.INIT,
      messagesObject: null,
    });
  };

  // Alert State
  const [alertOpen, setAlertOpen] = useState(false);

  // Open Form
  const [openForm, setOpenForm] = useState(false);

  // Devices List State
  const [devicesList, setDevicesList] = useState<IDevice[]>([]);

  // Search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pagination
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    size: 5,
  });

  // Reset Pagination
  const resetPagination = () => {
    setPagination({
      currentPage: 1,
      totalPages: 1,
      size: 5,
    });
  };

  // Update device
  const [deviceId, setDeviceId] = useState<number>(0);

  // Table loading state
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  // Device Request
  const [deviceRequest, setDeviceRequest] = useState<IDeviceRequest>({
    imei: "",
    deviceTypeId: 0,
    remarque: "",
  });

  // Reset Device Request
  const resetDeviceRequest = () => {
    setDeviceRequest({
      imei: "",
      deviceTypeId: 0,
      remarque: "",
    });
  };
  // Handle Open Form
  const handleOpenForm = () => {
    setOpenForm(!openForm);
    resetDeviceRequest();
    resetErrors();
    setDeviceId(0);
  };
  // Errors state
  const [errors, setErrors] = useState<IError[]>([]);
  // Reset Errors
  const resetErrors = () => {
    setErrors([]);
  };

  // Select Device Type
  const [deviceTypes, setDeviceTypes] = useState<ISelectDeviceType[]>([]);

  // Device Filter
  const [deviceFilter, setDeviceFilter] = useState<IDeviceFilter>({
    status: "",
    type: 0,
    createdFrom: "",
    createdTo: "",
  });

  // Reset Device Filter
  const resetDeviceFilter = () => {
    setDeviceFilter({
      status: "",
      type: 0,
      createdFrom: "",
      createdTo: "",
    });
  };

  // Open Filter Form
  const [openFilterForm, setOpenFilterForm] = useState(false);
  const handleOpenFilterForm = () => {
    setOpenFilterForm(!openFilterForm);
  };

  // Display Status
  const [displayStatus, setDisplayStatus] = useState<IDisplayStatus>({
    filter: false,
    search: false,
    normal: true,
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

  return (
    <DeviceContext.Provider
      value={{
        // Message
        message,
        resetMessage,
        setMessage,
        // Devices List
        devicesList,
        setDevicesList,
        // fetchDeviceList,
        // Pagination
        pagination,
        setPagination,
        resetPagination,
        // Device id
        setDeviceId,
        deviceId,
        // Search device by imei
        searchTerm,
        setSearchTerm,
        // Table loading state
        tableLoading,
        setTableLoading,
        // Alert state
        alertOpen,
        setAlertOpen,
        // Open Form
        openForm,
        setOpenForm,
        // Handle Open Form
        handleOpenForm,
        // Device Request
        deviceRequest,
        setDeviceRequest,
        resetDeviceRequest,
        // Errors state
        errors,
        setErrors,
        // Reset Errors
        resetErrors,
        // Select Device Type
        deviceTypes,
        setDeviceTypes,
        // Device Filter
        deviceFilter,
        setDeviceFilter,
        resetDeviceFilter,
        // Open Filter Form
        openFilterForm,
        setOpenFilterForm,
        handleOpenFilterForm,
        // Display Status
        displayStatus,
        setDisplayStatus,
        // On Change Display Status
        onChangeDisplayStatus,
      }}
    >
      {children}
      {message.messageType != MessageType.INIT && (
        <DynamicAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title={message.messageType.toString()}
          message={message.message ?? ""}
          type={message.messageType}
        />
      )}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};

export { DeviceProvider };
