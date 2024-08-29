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
import { IFieldErrors } from "@/types";

// Props interface
interface BoitierProviderProps {
  // Fields Errors
  fieldErrors: IFieldErrors[];
  setFieldErrors: (fieldErrors: IFieldErrors[]) => void;
  removeFieldError: (field: string) => void;
  resetFieldErrors: () => void;

  // Boitier request state
  boitierRequest: BoitierRequest;
  setBoitierRequest: (value: BoitierRequest) => void;
  resetBoitierRequest: () => void;
}

const BoitierContext = createContext<BoitierProviderProps | undefined>(
  undefined
);

const BoitierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Field Errors local state
  const [fieldErrors, setFieldErrors] = useState<IFieldErrors[]>([]);
  // Function to remove error by field
  const removeFieldError = (field: string) => {
    setFieldErrors((prevErrors) =>
      prevErrors.filter((error) => error.field !== field)
    );
  };
  // Function to reset all errors
  const resetFieldErrors = () => {
    setFieldErrors([]);
  };

  // Boitier Request local state
  const [boitierRequest, setBoitierRequest] = useState<BoitierRequest>({
    startDate: "",
    endDate: "",
    deviceId: null,
    simId: null,
  });
  // Function to reset Boitier Request
  const resetBoitierRequest = () => {
    setBoitierRequest({
      startDate: "",
      endDate: "",
      deviceId: null,
      simId: null,
    });
  };


  return (
    <BoitierContext.Provider
      value={{
        // Field Errors
        fieldErrors,
        setFieldErrors,
        removeFieldError,
        resetFieldErrors,
        // Boitier Request
        boitierRequest,
        setBoitierRequest,
        resetBoitierRequest,
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
