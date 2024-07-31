"use client";
import React, { useEffect, useState } from "react";
import { DefaultTable } from "@/components/table/DefaultTable";
import { TableData } from "@/components/table/TableData";
// import { getVehiclesApi } from "@/apis/vehicleService";
import Pagination from "@/components/pagination/Pagination";
import { VehicleProvider } from "@/vehicle/contexts/VehicleProvider";
import VehicleList from "@/vehicle/components/VehicleList";
import VehicleDetails from "@/vehicle/components/VehicleDetails";
import { VehicleTableBody } from "@/vehicle/components/table/VehicleTableBody";
import { Card } from "@material-tailwind/react";
import { FooterVehicleListe } from "@/vehicle/components/table/FooterVehicleListe";
import { HeaderVehicleListe } from "@/vehicle/components/table/HeaderVehicleListe";

const TABLE_HEAD = ["Matricule", "Client", "Type"];

const page: React.FC = () => {



  return (
      <div>
          <div className="pt-4">
          <HeaderVehicleListe />
          </div>
          <div className="pt-4 pb-1">
          <VehicleTableBody />
          </div>
          <FooterVehicleListe />
      </div>
  );
};

export default page;
