"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Pagination, VehicleInterface } from "../VehicleTypes";
import { getVehicleById, getVehicleListApi } from "../services/vehicleService";

import { vehicleDetailstemplate } from "../templates/VehicleTemplates";
import { BasicResponse } from "@/types/Basics";

interface VehicleContextProps {
  vehiclesList: VehicleInterface[];
  fetchVehiclesList: (page: number, size: number) => void;

  vehiclePagination: Pagination;
  setVehiclePagination: (pagination: Pagination) => void;
  setCurrentPage: (page: number) => void;

  // Fetch the vehicle by id context
  fetchVehicleById: (id: number) => void;
  vehicleDetails: VehicleInterface;
}

const VehicleContext = createContext<VehicleContextProps | undefined>(
  undefined
);

const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define the state of the vehicleList
  const [vehiclesList, setVehiclesList] = useState<VehicleInterface[]>([]);

  // Pagination state for the vehicle list
  const [vehiclePagination, setVehiclePagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
  });

  const setCurrentPage = (page: number) => {
    setVehiclePagination({ ...vehiclePagination, currentPage: page });
  };

  // Fetch the vehicle list from the API
  const fetchVehiclesList = async (page: number, size: number) => {
    getVehicleListApi(page, size)
      .then((data: BasicResponse) => {
        console.log("Data Response of getVehicleListApi", data);
        // Update the vehicle list
        setVehiclesList(data.content);
        // Update the pagination
        setVehiclePagination({
          currentPage: data.metadata?.currentPage || 1,
          totalPages: data.metadata?.totalPages || 1,
          totalItems: data.metadata?.totalItems || 1,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // --------------------------------Fetch the vehicle by id Traitement--------------------------------

  // Define the state of the vehicle details
  const [vehicleDetails, setVehicleDetails] = useState<VehicleInterface>(vehicleDetailstemplate);

  // Fetch the vehicle by id
  const fetchVehicleById = async (id: number) => {
    // Call the API to fetch the vehicle by id
    getVehicleById(id)
      .then((data: BasicResponse) => {
        console.log("Data Response of getVehicleById", data);
        // Update the vehicle details
        setVehicleDetails(data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("Vehicle Details", vehicleDetails);
  }
  , [vehicleDetails]);

  return (
    <VehicleContext.Provider
      value={{
        vehiclesList,
        fetchVehiclesList,
        vehiclePagination,
        setVehiclePagination,
        setCurrentPage,
        fetchVehicleById,
        vehicleDetails,
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

export interface PaginationInfos {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
}