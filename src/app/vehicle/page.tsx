"use client";

import { IDisplayStatus, Pagination } from "@/types";
import VehicleList from "@/vehicle/components/VehicleList";
import { VehicleTable } from "@/vehicle/components/VehicleTable";
import useVehicle from "@/vehicle/hooks/useVehicle";
import { Card } from "@material-tailwind/react";
import React from "react";

const VehiclePage: React.FC = () => {


  return (
    <div>
      <VehicleList />
    </div>
  );
};

export default VehiclePage;
