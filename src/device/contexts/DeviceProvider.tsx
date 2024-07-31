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
  deleteDeviceApi,
  getDeviceByIdApi,
  getDeviceListApi,
  getDeviceTypeListApi,
  searchDeviceApi,
  updateDeviceApi,
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
  setMessage: (message: MessageInterface) => void;
  resetMessage: () => void;

  // Create device form modal state
  isCreateDeviceModalOpen: boolean;
  setIsCreateDeviceModalOpen: (isOpen: boolean) => void;

  // Delete device
  deleteDevice: (id: number) => void;

  // Update device
  fetchDeviceById: (id: number) => void;
  updateDevice: (id:number,payload:DeviceFormData) => void;

  deviceId: number;
  setDeviceId: (id: number) => void;

  //search device by imei
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  fetchSearchDevice: (searchTerm: string, page: number, size: number) => void;

  //fetch device by imei
  fetchDeviceByImei: (imei: string) => void;

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

  // Create device form modal state
  const [isCreateDeviceModalOpen, setIsCreateDeviceModalOpen] = useState(false);

  // Devices List State
  const [devicesList, setDevicesList] = useState<DeviceInterface[]>([]);

  // Pagination
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
    imei: null,
    deviceTypeId: null,
    remarque: null,
  });

  // Reset Device Form Data
  const resetDeviceFormData = () => {
    setDeviceFormData({
      imei: null,
      deviceTypeId: null,
      remarque: null,
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
          messagesObject: data.messagesObject,
        });

        // Open alert
        setAlertOpen(true);

        // Reset Device Form Data
        resetDeviceFormData();

        // Close the create device form modal
        setIsCreateDeviceModalOpen(false);

        // Set device id to 0
        setDeviceId(0);
      })
      .catch((error) => {
        console.error(error);

        // Set message state
        setMessage({
          message: error.message,
          messageType: MessageType.ERROR,
          messagesObject: error.messagesObject,
        });

        // Open alert
        setAlertOpen(true);
      });
  };

  /**
   * Delete device function
   * @param id
   */

  const deleteDevice = (id: number) => {
    console.log("Delete Device Id", id);
    deleteDeviceApi(id)
      .then((data: BasicResponse) => {
        console.log("Delete Device Response", data);
        // Set message state
        setMessage({
          message: data.message,
          messageType:
            MessageType[data.messageType as keyof typeof MessageType], // Convert string to enum
          messagesObject: data.messagesObject,
        });

        // Open alert
        setAlertOpen(true);

        // Fetch Device List
        fetchDeviceList(pagination.currentPage, 5);
      })
      .catch((error) => {
        console.error(error);

        // Set message state
        setMessage({
          message: error.message,
          messageType: MessageType.ERROR,
          messagesObject: error.messagesObject,
        });

        // Open alert
        setAlertOpen(true);
      });
  };

  // Update device
  const [deviceId, setDeviceId] = useState<number>(0);
  /**
   * Handle fetch device by id
   * @param id
   */
  const fetchDeviceById = (id: number) => {
    getDeviceByIdApi(id)
      .then((data: BasicResponse) => {
        console.log("Get Device by Id", data);
        setDeviceFormData(data.content);
        console.log("Device Form Data", deviceFormData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Device Id", deviceId);
      });
  };
  /**
   * Update device function
   */

  const updateDevice = (id: number, payload: DeviceFormData) => {
    updateDeviceApi(id, payload)
      .then((data: BasicResponse) => {
        console.log("Update Device Response", data);
        // Set message state
        setMessage({
          message: data.message,
          messageType:
            MessageType[data.messageType as keyof typeof MessageType], // Convert string to enum
          messagesObject: data.messagesObject,
        });

        // Open alert
        setAlertOpen(true);

        // Close the create device form modal
        setIsCreateDeviceModalOpen(false);

        // Fetch Device List
        fetchDeviceList(pagination.currentPage, 5);
        
        // Reset Device Form Data
        resetDeviceFormData();

        // Set device id to 0
        setDeviceId(0);
      }
      )
      .catch((error) => {
        console.error(error);

        // Set message state
        setMessage({
          message: error.message,
          messageType: MessageType.ERROR,
          messagesObject: error.messagesObject,
        });

        // Open alert
        setAlertOpen(true);
      })
      .finally(() => {
        console.log("Device Id", deviceId);
      }
      );
  };

  //search device by imei
  const [searchTerm, setSearchTerm] = useState<string>("");
  const fetchSearchDevice = async(
    searchTerm: string,
    page : number,
    size : number
  ) => {
    try {
      const data = await searchDeviceApi(searchTerm, page, size);
      console.log("Search device data", data);
        setDevicesList(data.content);
        setTotalPages(data.metadata?.totalPages || 1);
        setCurrentPage(data.metadata?.currentPage || 1);
      
      
    } catch (error) {
      console.error("Search device error", error);
      setDevicesList([]);

    }
  }
  
  useEffect(() => {
    if(searchTerm !== ""){
      fetchSearchDevice(searchTerm, 1, 5);
    }else{
      fetchDeviceList(pagination.currentPage, 5);
    }



  }
  , [searchTerm]);

  return (
    <DeviceContext.Provider
      value={{
        // Message
        message,
        resetMessage,
        setMessage,

        // Devices List
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

        // Delete device
        deleteDevice,

        // Update device
        fetchDeviceById,
        setDeviceId,
        deviceId,
        updateDevice,

        //search device by imei
        searchTerm,
        setSearchTerm,

        //fetch device by imei
        fetchSearchDevice
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

export interface Pagination {
  currentPage: number;
  totalPages: number;
}
