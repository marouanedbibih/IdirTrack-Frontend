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
  createDeviceApi,
  getDeviceListApi,
  getDeviceTypeListApi,
} from "../DeviceService";
import { BasicResponse, MessageInterface, MessageType } from "@/types/Basics";
import { DynamicAlert } from "@/components/alert/DynamicAlert";

interface DeviceContextProps {
  devicesList: DeviceInterface[];
  fetchDeviceList: (page: number, size: number) => void;
  pagination: Pagination;
  setCurrentPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  // deviceDetails: DeviceInterface;
  // setDeviceDetails: (device: DeviceInterface) => void;

  // Device Form Data State and functions
  deviceFormData: DeviceFormData;
  setDeviceFormData: (device: DeviceFormData) => void;

  // Fetch Device Types List
  deviceTypes: DeviceTypeInterface[];
  fetchDeviceTypes: (page: number, size: number) => void;

  // Create new device
  createDevice: (device: DeviceFormData) => void;

  // Message
  message: MessageInterface;

  // Create device form modal state
  isCreateDeviceModalOpen: boolean;
  setIsCreateDeviceModalOpen: (isOpen: boolean) => void;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Messages State
  const [message, setMessage] = useState<MessageInterface>({
    message: "",
    messageType: MessageType.SUCCESS,
    messageObject: {},
  });

  // Alert State
  const [alertOpen, setAlertOpen] = useState(false);

  // Create device form modal state
  const [isCreateDeviceModalOpen, setIsCreateDeviceModalOpen] = useState(false);

  const [devicesList, setDevicesList] = useState<DeviceInterface[]>([]);

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
  });

  const setCurrentPage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const setTotalPages = (totalPages: number) => {
    setPagination((prev) => ({ ...prev, totalPages }));
  };

  const fetchDeviceList = (page: number, size: number) => {
    getDeviceListApi(page, size)
      .then((data: BasicResponse) => {
        setDevicesList(data.content);
        setTotalPages(data.metadata?.totalPages || 1);
        setCurrentPage(data.metadata?.currentPage || 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Device Form Data State and functions
  const [deviceFormData, setDeviceFormData] = useState<DeviceFormData>({
    imei: "",
    deviceTypeId: 0,
    remarque: "",
  });

  // Reset Device Form Data
  const resetDeviceFormData = () => {
    setDeviceFormData({
      imei: "",
      deviceTypeId: 0,
      remarque: "",
    });
  };

  // Device Types State
  const [deviceTypes, setDeviceTypes] = useState<DeviceTypeInterface[]>([]);

  /**
   * Function to fetch Device Types
   * @param page
   * @param size
   */
  const fetchDeviceTypes = (page: number, size: number) => {
    getDeviceTypeListApi(page, size)
      .then((data: BasicResponse) => {
        setDeviceTypes(data.content);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Device Types", deviceTypes);
      });
  };

  /**
   * Create new device function
   * @param devicePayload
   */
  const createDevice = (devicePayload: DeviceFormData) => {
    console.log("Create Device Payload", devicePayload);
    createDeviceApi(devicePayload)
      .then((data: BasicResponse) => {
        console.log("Create Device Response", data);
        // Set message state
        setMessage({
          message: data.message,
          messageType:
            MessageType[data.messageType as keyof typeof MessageType], // Convert string to enum
          messageObject: data.messageObject || {},
        });

        // Open alert
        setAlertOpen(true);

        // Reset Device Form Data
        resetDeviceFormData();

        // Close the create device form modal
        setIsCreateDeviceModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // fetchDeviceList(pagination.currentPage, 5);
    console.log("Message", message);
  }, [message]);

  return (
    <DeviceContext.Provider
      value={{
        // Message
        message,

        devicesList,
        fetchDeviceList,
        pagination,
        setCurrentPage,
        setTotalPages,

        // Device Form Data
        deviceFormData,
        setDeviceFormData,

        // Device Types
        deviceTypes,
        fetchDeviceTypes,

        // Create new device
        createDevice,

        // Create device form modal state
        isCreateDeviceModalOpen,
        setIsCreateDeviceModalOpen,

        // deviceDetails,
        // setDeviceDetails,
      }}
    >
      {children}
      {message && (
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

export interface Pagination {
  currentPage: number;
  totalPages: number;
}
