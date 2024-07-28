"use client";
import React, { useEffect, useState } from "react";
import { DefaultTable } from "@/components/table/DefaultTable";
import { TableData } from "@/components/table/TableData";
// import { getVehiclesApi } from "@/apis/vehicleService";
import Pagination from "@/components/pagination/Pagination";
import { VehicleProvider } from "@/vehicle/contexts/VehicleProvider";
import VehicleList from "@/vehicle/components/VehicleList";
import VehicleDetails from "@/vehicle/components/VehicleDetails";

const TABLE_HEAD = ["Matricule", "Client", "Type"];

const page: React.FC = () => {



  return (
    <VehicleProvider>
      <div className="grid grid-cols-2 justify-items-start content-between">
        <VehicleList />
        <VehicleDetails />
      </div>
    </VehicleProvider>
  );
};

export default page;
