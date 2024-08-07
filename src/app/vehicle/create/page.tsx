import { BoitierProvider } from "@/boitier/BoitierProvider";
import BoitierForm from "@/boitier/components/BoitierForm";
import VehicleForm from "@/vehicle/components/VehicleForm";
import { EditVehicleProvider, useEditVehicleContext } from "@/vehicle/contexts/EditVehicleProvider";
import React from "react";

function page() {
  return (
    <EditVehicleProvider>
      <div className="flex flex-row justify-center items-start gap-16 p-4 h-screen">
        {/* <CreateVehicleProvider>
        <BoitierForm />
        
      </CreateVehicleProvider> */}

        <BoitierProvider>
          <BoitierForm />
          <VehicleForm />
        </BoitierProvider>

      </div>
    </EditVehicleProvider>
  );
}

export default page;
