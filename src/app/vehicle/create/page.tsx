import { BoitierProvider } from "@/boitier/BoitierProvider";
import BoitierForm from "@/boitier/components/BoitierForm";
import VehicleForm from "@/components/vehicle/VehicleForm";
// import { CreateVehicleProvider } from "@/contexts/CreateVehicleProvider";
import React from "react";

function page() {
  return (
    <div className="flex flex-row justify-center items-start gap-16 p-4">
      {/* <CreateVehicleProvider>
        <BoitierForm />
        <VehicleForm />
      </CreateVehicleProvider> */}

      <BoitierProvider>
        <BoitierForm />
      </BoitierProvider>
    </div>
  );
}

export default page;
