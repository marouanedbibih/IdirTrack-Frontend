"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { VehicleRequest } from "../types/VehicleDto";
import {
  BoitierRequest,
  BoitierVehicle,
  SimBoitier,
} from "@/boitier/BoitierDTO";
import { ErrorInterface, MessageInterface, MessageType } from "@/types/Basics";
import { DynamicAlert } from "@/components/alert/DynamicAlert";

// Define the type for the context state
interface EditVehicleContextProps {
  // Vehicle request state
  vehicleRequest: VehicleRequest;
  setVehicleRequest: (value: VehicleRequest) => void;
  resetVehicleRequest: () => void;

  // Errors state
  errors: ErrorInterface[];
  setErrors: (errors: ErrorInterface[]) => void;
  resetErrors: () => void;

  // Alert state
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;

  // Message state
  message: MessageInterface;
  setMessage: (message: MessageInterface) => void;

  // Boitier Vehicle state
  boitiersList: BoitierVehicle[];
  setBoitiersList: (value: BoitierVehicle[]) => void;

  // Fetch Boitier Not Attached List
  fetchBoitierNotAttachedList: (page: number, size: number) => void;

  // Fetch Boitier Not Attached Loading
  fetchBoitierNotAttachedLoading: boolean;
  setFetchBoitierNotAttachedLoading: (value: boolean) => void;

  // Delete Boitier Dialog
  deleteBoitierDialogOpen: boolean;
  setDeleteBoitierDialogOpen: (value: boolean) => void;
  handelBoitierDeleteDialog: (id: number | null) => void;

  // Select deleted Boitier ID
  selectedBoitierId: number | null;
  setSelectedBoitierId: (value: number | null) => void;

  // Is Boitier Lost
  isLost: boolean;
  setIsLost: (value: boolean) => void;

  // Select updated Boitier ID
  selectedUpdatedBoitierId: number | null;
  setSelectedUpdatedBoitierId: (value: number | null) => void;

  // Sim list
  simsList: SimBoitier[];
  setSimsList: (value: SimBoitier[]) => void;

  // SIM boitier in update
  simBoitierToUpdate: SimBoitier;
  setSimBoitierToUpdate: (simBoitier: SimBoitier) => void;
  retrieveSimById: (id: number) => void;

  // Boitier ID
  boitierId: number | null;
  setBoitierId: (value: number | null) => void;

  unassignedLoading: boolean;
  setUnassignedLoading: (loading: boolean) => void;
}

// Create the context
const EditVehicleContext = createContext<EditVehicleContextProps | undefined>(
  undefined
);

// Define the provider component
const EditVehicleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Vehicle request state
  const [vehicleRequest, setVehicleRequest] = useState<VehicleRequest>({
    matricule: "",
    type: "",
    clientId: null,
    boitiersIds: [],
  });

  // Reset Vehicle Request
  const resetVehicleRequest = () => {
    setVehicleRequest({
      matricule: "",
      type: "",
      clientId: null,
      boitiersIds: [],
    });
  };

  // Boitier request state
  const [boitierRequest, setBoitierRequest] = useState<BoitierRequest>({
    startDate: "",
    endDate: "",
    deviceId: null,
    simId: null,
  });

  // Reset Boitier Request
  const resetBoitierRequest = () => {
    setBoitierRequest({
      startDate: "",
      endDate: "",
      deviceId: null,
      simId: null,
    });
  };

  // Errors state
  const [errors, setErrors] = useState<ErrorInterface[]>([]);

  // Reset Errors
  const resetErrors = () => {
    setErrors([]);
  };

  // Alert state
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  // Message state
  const [message, setMessage] = useState<MessageInterface>({
    message: "",
    messageType: MessageType.INIT,
    messagesObject: null,
  });

  // Boitier Vehicle state
  const [boitiersList, setBoitiersList] = useState<BoitierVehicle[]>([]);

  // Fetch Boitier Not Attached Loading
  const [fetchBoitierNotAttachedLoading, setFetchBoitierNotAttachedLoading] =
    useState<boolean>(false);

  /**
   * FETCH BOITIER NOT ATTACHED TO VEHICLE
   *
   * This function is used to fetch all boitiers that are not attached to a vehicle.
   *
   * @param page number
   * @param size number
   * @returns void
   * @throws Error
   */

  const fetchBoitierNotAttachedList = async (page: number, size: number) => {
    setFetchBoitierNotAttachedLoading(true);
    getBoitierNotAssigned(page, size)
      .then((data) => {
        setBoitiersList(data.content);
        // set the boitiers is in the boitiers Ids in the vehicle request
        setVehicleRequest({
          ...vehicleRequest,
          boitiersIds: data.content.map((boitier: any) => boitier.id),
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Boitiers fetched successfully.");
        setFetchBoitierNotAttachedLoading(false);
      });
  };

  // Delete Boitier Dialog
  const [deleteBoitierDialogOpen, setDeleteBoitierDialogOpen] =
    useState<boolean>(false);

  // Select deleted Boitier ID
  const [selectedBoitierId, setSelectedBoitierId] = useState<number | null>(
    null
  );

  // Handel Delete Boitier Dialog
  const handelBoitierDeleteDialog = (id: number | null) => {
    if (id) {
      setSelectedBoitierId(id);
    }
    setDeleteBoitierDialogOpen(!deleteBoitierDialogOpen);
  };

  // Is Boitier Lost
  const [isLost, setIsLost] = useState<boolean>(false);

  // Use Effect for console handel boitier delete dialog
  useEffect(() => {
    console.log("Selected Boitier ID: ", selectedBoitierId);
    console.log("Delete Boitier Dialog Open: ", deleteBoitierDialogOpen);
  }, [selectedBoitierId, deleteBoitierDialogOpen]);

  // Select updated Boitier ID
  const [selectedUpdatedBoitierId, setSelectedUpdatedBoitierId] = useState<
    number | null
  >(null);

  // SIM boitier in update
  const [simBoitierToUpdate, setSimBoitierToUpdate] = useState<SimBoitier>({
    simMicroserviceId: 0,
    phone: "",
    ccid: "",
    operatorName: "",
  });

  // Sim list
  const [simsList, setSimsList] = useState<SimBoitier[]>([]);

  /**
   * RETRIEVE SIM BY ID
   *
   * This function is used to fetch a sim by ID
   */

  const retrieveSimById = async (id: number) => {
    getSimByIdApi(id)
      .then((data) => {
        // set the fetched sim to the sim boitier
        const fetchedSimBoitier = {
          simMicroserviceId: data.content.id,
          phone: data.content.phone,
          ccid: data.content.ccid,
          operatorName: data.content.operatorName,
        };
        // set the sim boitier to the simBoitierToUpdate
        setSimBoitierToUpdate(fetchedSimBoitier);
        // add the sim to the sim list
        setSimsList((prevSimsList) => [...prevSimsList, fetchedSimBoitier]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Sim fetched successfully.");
      });
  };

  // Boitier ID
  const [boitierId, setBoitierId] = useState<number | null>(null);

  // Unassigned Loading
  const [unassignedLoading, setUnassignedLoading] = useState<boolean>(false);

  return (
    <EditVehicleContext.Provider
      value={{
        // Vehicle request state
        vehicleRequest,
        setVehicleRequest,
        resetVehicleRequest,
        // Boitier request state
        boitierRequest,
        setBoitierRequest,
        resetBoitierRequest,
        // Errors state
        errors,
        setErrors,
        resetErrors,
        // Alert state
        alertOpen,
        setAlertOpen,
        // Message state
        message,
        setMessage,
        // Boitier Vehicle state
        boitiersList,
        setBoitiersList,
        // Fetch Boitier Not Attached List
        fetchBoitierNotAttachedList,
        // Fetch Boitier Not Attached Loading
        fetchBoitierNotAttachedLoading,
        setFetchBoitierNotAttachedLoading,
        // Delete Boitier Dialog
        deleteBoitierDialogOpen,
        setDeleteBoitierDialogOpen,
        // Select deleted Boitier ID
        selectedBoitierId,
        setSelectedBoitierId,
        // Handel Delete Boitier Dialog
        handelBoitierDeleteDialog,
        // Is Boitier Lost
        isLost,
        setIsLost,
        // Select updated Boitier ID
        selectedUpdatedBoitierId,
        setSelectedUpdatedBoitierId,
        // SIM boitier in update
        simBoitierToUpdate,
        setSimBoitierToUpdate,
        retrieveSimById,
        // Sim list
        simsList,
        setSimsList,
        // Boitier ID
        boitierId,
        setBoitierId,
        unassignedLoading,
        setUnassignedLoading,
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
    </EditVehicleContext.Provider>
  );
};

// Custom hook to use the context
export const useEditVehicleContext = () => {
  const context = useContext(EditVehicleContext);
  if (!context) {
    throw new Error(
      "useEditVehicleContext must be used within a EditVehicleProvider"
    );
  }
  return context;
};

export { EditVehicleProvider };
