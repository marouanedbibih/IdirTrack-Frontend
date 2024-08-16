"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
  BoitierErrors,
  BoitierRequest,
  DeviceBoitier,
  SimBoitier,
} from "./BoitierDTO";
import {
  createBoitierApi,
  getNotInstalledDevices,
  getPendingSims,
  searchNotInstalledDevices,
  searchPendingSims,
} from "./BoitierService";
import { MessageInterface, MessageType } from "@/types/Basics";
import { DynamicAlert } from "@/components/alert/DynamicAlert";

// Props interface
interface BoitierProviderProps {
  // ------ Message Props ------
  message: MessageInterface;
  setMessage: (message: MessageInterface) => void;

  //------ Sim Props ------

  // Sim Boitier list
  simBoitierList: SimBoitier[];

  // Fetch Sim Boitier list
  fetchSimBoitierList: (page: number, size: number) => void;

  // Search Function
  searchSimTerm: string;
  setSearchSimTerm: (searchSimTerm: string) => void;
  fetchSimBoitierListSearched: (
    searchSimTerm: string,
    page: number,
    size: number
  ) => void;

  // Sim Pagination
  currentSimPage: number;
  setCurrentSimPage: (page: number) => void;
  totalSimPages: number;
  setTotalSimPages: (pages: number) => void;

  // Sim Boitier in update
  simBoitierToUpdate: SimBoitier;
  setSimBoitierToUpdate: (simBoitier: SimBoitier) => void;

  // ------ Devices Props ------

  // Device Boitier list
  deviceBoitierList: DeviceBoitier[];

  // Fetch Device Boitier list
  fetchDeviceBoitierList: (page: number, size: number) => void;

  // Search Function
  searchDeviceTerm: string;
  setSearchDeviceTerm: (imei: string) => void;
  fetchDeviceSearched: (imei: string, page: number, size: number) => void;

  // Device Pagination
  currentDevicePage: number;
  setCurrentDevicePage: (page: number) => void;
  totalDevicePages: number;
  setTotalDevicePages: (pages: number) => void;

  // Create Boitier states
  createNewBoitier: (request: BoitierRequest) => void;
  boitierRequest: BoitierRequest;
  setBoitierRequest: (boitierRequest: BoitierRequest) => void;

  // Boitier errors
  boitierErrors: BoitierErrors;
  setBoitierErrors: (boitierErrors: BoitierErrors) => void;
}

const BoitierContext = createContext<BoitierProviderProps | undefined>(
  undefined
);

const BoitierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ------------------------------ Message ------------------------------
  const [message, setMessage] = useState<MessageInterface>({
    message: "",
    messageType: MessageType.INIT,
  });

  // --------------------------------- Sim ---------------------------------

  // Sim Boitier list
  const [simBoitierList, setSimBoitierList] = useState<SimBoitier[]>([]);

  // Fetch Sim Boitier list with pagination
  const fetchSimBoitierList = (page: number, size: number) => {
    getPendingSims(page, size)
      .then((data) => {
        setSimBoitierList(data.content);
      })
      .catch((error) => {
        console.error("Error from fetchSimBoitierList", error);
      });
  };

  // Pagination
  const [currentSimPage, setCurrentSimPage] = useState<number>(1);
  const [totalSimPages, setTotalSimPages] = useState<number>(1);

  // Search Function
  const [searchSimTerm, setSearchSimTerm] = useState<string>("");
  const fetchSimBoitierListSearched = (
    searchSimterm: string,
    page: number,
    size: number
  ) => {
    searchPendingSims(searchSimterm, page, size)
      .then((data) => {
        setSimBoitierList(data.content);
        console.log("Searched Data:", data);
      })
      .catch((error) => {
        console.error("Error from fetchSimBoitierListSearched", error);
      });
  };

  // --------------------------------- Devices ---------------------------------

  // Device Boitier list
  const [deviceBoitierList, setDeviceBoitierList] = useState<DeviceBoitier[]>(
    []
  );

  // Fetch Device Boitier list
  const fetchDeviceBoitierList = (page: number, size: number) => {
    console.log("Fetch Device Boitier List");
    getNotInstalledDevices(page, size)
      .then((data) => {
        setDeviceBoitierList(data.content);
      })
      .catch((error) => {
        console.error("Error from fetchDeviceBoitierList", error);
      });
  };

  // Search Function
  const [searchDeviceTerm, setSearchDeviceTerm] = useState<string>("");

  const fetchDeviceSearched = (imei: string, page: number, size: number) => {
    console.log("Fetch Device Searched");
    searchNotInstalledDevices(imei, page, size)
      .then((data) => {
        setDeviceBoitierList(data.content);
      })
      .catch((error) => {
        console.error("Error from fetchDeviceSearched", error);
      });
  };

  // Device Pagination
  const [currentDevicePage, setCurrentDevicePage] = useState<number>(1);
  const [totalDevicePages, setTotalDevicePages] = useState<number>(1);

  // --------------------------------- Boitier ---------------------------------

  // Boitier Request
  const [boitierRequest, setBoitierRequest] = useState<BoitierRequest>({
    deviceMicroserviceId: 0,
    imei: "",
    deviceType: "",
    simMicroserviceId: 0,
    phone: "",
    operatorName: "",
    ccid: "",
    startDate: "",
    endDate: "",
  });

  // Reset Boitier Request
  const resetBoitierRequest = () => {
    setBoitierRequest({
      deviceMicroserviceId: 0,
      imei: "",
      deviceType: "",
      simMicroserviceId: 0,
      phone: "",
      operatorName: "",
      ccid: "",
      startDate: "",
      endDate: "",
    });
  };

  // Create Boitier
  const createNewBoitier = (request: BoitierRequest) => {
    console.log("Request Boitier Data:", request);

    createBoitierApi(request)
      .then((data) => {
        console.log("Boitier created successfully");
        setMessage({
          message: data.message,
          messageType: data.messageType,
        });

        // Reset Boitier Request
        resetBoitierRequest();

        // Reset Boitier Errors
        setBoitierErrors({
          device: null,
          sim: null,
          dateStart: null,
          dateEnd: null,
        });

        // Open Alert
        setAlertOpen(true);


      })
      .catch((data) => {
        console.error("Error creating boitier:", data);

        // Set Boitier Errors
        setBoitierErrors({
          device: data.messageObject?.device ?? null,
          sim: data.messageObject?.sim ?? null,
          dateStart: data.messageObject?.dateStart ?? null,
          dateEnd: data.messageObject?.dateEnd ?? null,
        });

        // if exist one message show it
        if (data.message) {
          setMessage({
            message: data.message,
            messageType: MessageType.WARNING,
          });
        }
      });
  };

  useEffect(() => {
    console.log("Message:", message);
    if (message.messageType === MessageType.SUCCESS) {
      resetBoitierRequest();
    }
  }, [message]);

  // Boitier Errors
  const [boitierErrors, setBoitierErrors] = useState<BoitierErrors>({
    device: null,
    sim: null,
    dateStart: null,
    dateEnd: null,
  });

  // Alert state
  const [alertOpen, setAlertOpen] = useState<boolean>(true);



  return (
    <BoitierContext.Provider
      value={{
        // ------ Message Props ------
        message,
        setMessage,

        // Sim Boitier list
        simBoitierList,
        fetchSimBoitierList,

        // Pagination
        currentSimPage,
        setCurrentSimPage,
        totalSimPages,
        setTotalSimPages,

        // Search Function
        searchSimTerm,
        setSearchSimTerm,
        fetchSimBoitierListSearched,

        // Create Boitier states
        createNewBoitier,
        boitierRequest,
        setBoitierRequest,

        // Boitier Errors
        boitierErrors,
        setBoitierErrors,

        // -- Devices --

        // Device Boitier list
        deviceBoitierList,
        fetchDeviceBoitierList,

        // Search Function
        searchDeviceTerm,
        setSearchDeviceTerm,
        fetchDeviceSearched,

        // Device Pagination
        currentDevicePage,
        setCurrentDevicePage,
        totalDevicePages,
        setTotalDevicePages,
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
    </BoitierContext.Provider>
  );
};

export const useBoitierContext = () => {
  const context = useContext(BoitierContext);
  if (!context) {
    throw new Error("useBoitierContext must be used within a BoitierProvider");
  }
  return context;
};

export { BoitierProvider };
