"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Pagination, VehicleInterface } from "../VehicleTypes";
import { vehicleDetailstemplate } from "../templates/VehicleTemplates";

interface VehicleContextProps {
  // Vehicle List state
  vehiclesList: VehicleInterface[];
  setVehiclesList: (vehicles: VehicleInterface[]) => void;

  // Vehicle Pagination
  vehiclePagination: Pagination;
  setVehiclePagination: (pagination: Pagination) => void;

  // Vehicle Details
  vehicleDetails: VehicleInterface;
  setVehicleDetails: (vehicle: VehicleInterface) => void;

  // Vehicle ID
  vehicleId: number | null;
  setVehicleId: (id: number | null) => void;

  // Open Vehicle Details Dialog
  openVehicleDetailsDialog: boolean;
  setOpenVehicleDetailsDialog: (open: boolean) => void;
  handleOpenVehicleDetailsDialog: () => void;

  // Vehicle Delete ID
  vehicleDeleteId: number | null;
  setVehicleDeleteId: (id: number | null) => void;
}

const VehicleContext = createContext<VehicleContextProps | undefined>(
  undefined
);

const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Vehicle List state
  const [vehiclesList, setVehiclesList] = useState<VehicleInterface[]>([]);

  // Vehicle Pagination
  const [vehiclePagination, setVehiclePagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
  });

  // Open Vehicle Details Dialog
  const [openVehicleDetailsDialog, setOpenVehicleDetailsDialog] = useState<boolean>(
    false
  );

  // Handle Open Vehicle Details Dialog
  const handleOpenVehicleDetailsDialog = () => {
    setOpenVehicleDetailsDialog(!openVehicleDetailsDialog);
  };


  // const fetchVehiclesList = async (page: number, size: number) => {
  //   try {
  //     const data = await getVehicleListApi(page, size);
  //     setVehiclesList(data.content);
  //     setVehiclePagination({
  //       currentPage: data.metaData?.currentPage || 1,
  //       totalPages: data.metaData?.totalPages || 1,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching vehicles list:", error);
  //   }
  // };

  // Vehicle Details
  const [vehicleDetails, setVehicleDetails] = useState<VehicleInterface>(
    vehicleDetailstemplate
  );

  // Vehicle ID
  const [vehicleId, setVehicleId] = useState<number | null>(null);


  useEffect(() => {
    console.log("Vehicle Details", vehicleDetails);
  }, [vehicleDetails]);

  // Vehicle Delete ID
  const [vehicleDeleteId, setVehicleDeleteId] = useState<number | null>(null);

  return (
    <VehicleContext.Provider
      value={{
        // Vehicle List state
        vehiclesList,
        setVehiclesList,
        // Vehicle Pagination
        vehiclePagination,
        setVehiclePagination,
        // Vehicle Details
        vehicleDetails,
        setVehicleDetails,
        // Vehicle ID
        vehicleId,
        setVehicleId,
        // Open Vehicle Details Dialog
        openVehicleDetailsDialog,
        setOpenVehicleDetailsDialog,
        handleOpenVehicleDetailsDialog,
        // Vehicle Delete ID
        vehicleDeleteId,
        setVehicleDeleteId,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error("useVehicle must be used within a VehicleProvider");
  }
  return context;
};

export { VehicleContext, VehicleProvider };
