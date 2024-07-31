import React, { useEffect } from "react";
import { useVehicleContext } from "../contexts/VehicleProvider";

import VehicleDetailsHeader from "./VehicleDetailsHeader";
import VehicleBoitierDetails from "./VehicleBoitierDetails";

function VehicleDetails() {
  const { vehicleDetails } = useVehicleContext();


  return (
    <React.Fragment>
      <div className="flex flex-col ">
        <VehicleDetailsHeader
          vehicleInfos={vehicleDetails.vehicle}
          clientInfos={vehicleDetails.client}
        />
        {vehicleDetails.boitiersList?.map((boitier) => (
          <VehicleBoitierDetails key={boitier.id} boitier={boitier} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default VehicleDetails;
