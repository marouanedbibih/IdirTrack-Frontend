"use client";

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { Pagination, VehicleInterface } from "../VehicleTypes";
import { getVehicleById, getVehicleListApi } from "../services/vehicleService";
import { vehicleDetailstemplate } from "../templates/VehicleTemplates";
import { BasicResponse } from "@/types/Basics";

interface VehicleContextProps {
  vehiclesList: VehicleInterface[];
  fetchVehiclesList: (page: number, size: number) => void;
  vehiclePagination: Pagination;
  setCurrentPage: (page: number) => void;
  fetchVehicleById: (id: number) => void;
  vehicleDetails: VehicleInterface;
}

const VehicleContext = createContext<VehicleContextProps | undefined>(undefined);

const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehiclesList, setVehiclesList] = useState<VehicleInterface[]>([]);
  const [vehiclePagination, setVehiclePagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
  });

  const setCurrentPage = (page: number) => {
    setVehiclePagination({ ...vehiclePagination, currentPage: page });
  };

  const fetchVehiclesList = async (page: number, size: number) => {
    try {
      const data = await getVehicleListApi(page, size);
      setVehiclesList(data.content);
      setVehiclePagination({
        currentPage: data.metadata?.currentPage || 1,
        totalPages: data.metadata?.totalPages || 1,
        totalItems: data.metadata?.totalItems || 1,
      });
    } catch (error) {
      console.error("Error fetching vehicles list:", error);
    }
  };

  const [vehicleDetails, setVehicleDetails] = useState<VehicleInterface>(vehicleDetailstemplate);

  const fetchVehicleById = async (id: number) => {
    try {
      const data = await getVehicleById(id);
      setVehicleDetails(data.content);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  useEffect(() => {
    console.log("Vehicle Details", vehicleDetails);
  }, [vehicleDetails]);

  return (
    <VehicleContext.Provider
      value={{
        vehiclesList,
        fetchVehiclesList,
        vehiclePagination,
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
