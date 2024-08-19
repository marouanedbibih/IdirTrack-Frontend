"use client";
import React, { useEffect, useState } from "react";
import { DefaultTable } from "@/components/table/DefaultTable";
import { TableData } from "@/components/table/TableData";
// import { getVehiclesApi } from "@/apis/vehicleService";

import VehicleDetails from "@/vehicle/components/VehicleDetails";
import { FooterVehicleListe } from "@/vehicle/components/table/FooterVehicleListe";
import { HeaderVehicleListe } from "@/vehicle/components/table/HeaderVehicleListe";
import { VehicleTable } from "@/vehicle/components/table/VehicleTable";

const TABLE_HEAD = ["Matricule", "Client", "Type"];

const page: React.FC = () => {



  return (
      <div>
          <div className="pt-4">
          <HeaderVehicleListe />
          </div>
          <div className="flex flex-row gap-4 justify-between items-start pt-8 w-full mb-8">
          <VehicleTable />
          <VehicleDetails/>
          </div>
      </div>
  );
};

export default page;
