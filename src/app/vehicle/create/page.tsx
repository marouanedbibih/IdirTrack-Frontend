import { BoitierProvider } from "@/boitier/BoitierProvider";
import BoitierForm from "@/boitier/components/BoitierForm";
import VehicleForm from "@/vehicle/components/VehicleForm";
import { EditVehicleFunctionsProvider } from "@/vehicle/contexts/EditVehicleFunctionsProvider";
import {
  EditVehicleProvider,
  useEditVehicleContext,
} from "@/vehicle/contexts/EditVehicleProvider";
import React from "react";

function page() {
  return (
    <EditVehicleProvider>
      <EditVehicleFunctionsProvider>
        <div className="flex flex-row justify-center items-start gap-16 p-4 h-screen">
          <BoitierProvider>
            <BoitierForm />
            <VehicleForm />
          </BoitierProvider>
        </div>
      </EditVehicleFunctionsProvider>
    </EditVehicleProvider>
  );
}

export default page;
