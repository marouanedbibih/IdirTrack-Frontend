"use client";
import { getBoitierUnassigned } from "@/boitier/BoitierService";
import { IBoitier } from "@/boitier/types/type";
import { IMyResponse } from "@/operators/types";
import { IFinallyProps } from "@/types";
import { MessageInterface, MessageType } from "@/types/Basics";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useEditVehicleContext } from "./EditVehicleProvider";
import { VehicleRequest } from "../types/VehicleDto";

// Define the type for the context state
interface EditVehicleFunctionsContextProps {
  boitiersUnassigned: IBoitier[] | null;
  fetchBoitierUnassigned: () => void;
}

// Create the context
const EditVehicleFunctionsContext = createContext<
  EditVehicleFunctionsContextProps | undefined
>(undefined);

// Define the provider component
const EditVehicleFunctionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Boitiers Unassigned state
  const [boitiersUnassigned, setBoitiersUnassigned] = useState<
    IBoitier[] | null
  >(null);
  const { unassignedLoading, setUnassignedLoading } = useEditVehicleContext();

  const { vehicleRequest, setVehicleRequest } = useEditVehicleContext();

  // Fetch Boitier Unassigned
  const fetchBoitierUnassigned = () => {
    setUnassignedLoading(true);
    getBoitierUnassigned()
      .then((res: IMyResponse) => {
        if (res.data === null) {
          setBoitiersUnassigned(null);
        } else {
          const boitiers = res.data as IBoitier[]; // Assuming IBoitier is the type for the Boitier
          setBoitiersUnassigned(boitiers);

          // Extract Boitier IDs
          const boitiersIds: number[] = boitiers.map((boitier) => boitier.id);

          // Update vehicle request with Boitier IDs
          setVehicleRequest((prevRequest: VehicleRequest) => ({
            ...prevRequest,
            boitiersIds: boitiersIds, // Correct property name
          }));
        }
      })
      .catch((err) => {
        console.log("Error fetching Boitier Unassigned", err);
      })
      .finally(() => {
        setUnassignedLoading(false);
      });
  };

  return (
    <EditVehicleFunctionsContext.Provider
      value={{
        boitiersUnassigned,
        fetchBoitierUnassigned,
      }}
    >
      {children}
    </EditVehicleFunctionsContext.Provider>
  );
};

// Custom hook to use the context
export const useEditVehicleFunctionsContext = () => {
  const context = useContext(EditVehicleFunctionsContext);
  if (!context) {
    throw new Error(
      "useEditVehicleFunctionsContext must be used within a EditVehicleFunctionsProvider"
    );
  }
  return context;
};

export { EditVehicleFunctionsProvider };
