"use client";

import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { BoitierErrors, BoitierRequest, SimBoitier } from "./BoitierDTO";
import { getPendingSims, searchPendingSims } from "./BoitierService";

// Props interface
interface BoitierProviderProps {
  // Sim Boitier list
  simBoitierList: SimBoitier[];

  // Fetch Sim Boitier list
  fetchSimBoitierList: (page: number, size: number) => void;

  // Pagination
  currentSimPage: number;
  setCurrentSimPage: (page: number) => void;
  totalSimPages: number;
  setTotalSimPages: (pages: number) => void;

  // Search Function
  searchSimTerm: string;
  setSearchSimTerm: (searchSimTerm: string) => void;
  fetchSimBoitierListSearched: (
    searchSimTerm: string,
    page: number,
    size: number
  ) => void;

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

  // Create Boitier
  const createNewBoitier = (request: BoitierRequest) => {
    console.log("Request Boitier Data:", request);
  };

  // Boitier Errors
  const [boitierErrors, setBoitierErrors] = useState<BoitierErrors>({
    device: null,
    sim: null,
    startDate: null,
    endDate: null,
  });





  return (
    <BoitierContext.Provider
      value={{
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

      }}
    >
      {children}
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
