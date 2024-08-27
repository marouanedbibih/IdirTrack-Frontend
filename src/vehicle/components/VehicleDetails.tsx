/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useVehicleContext } from "../contexts/VehicleProvider";

import VehicleDetailsHeader from "./VehicleDetailsHeader";
import VehicleBoitierDetails from "./VehicleBoitierCard";
import { getVehicleBoitiersAPI } from "../services/VehicleService";
import { List, Spinner } from "@material-tailwind/react";
import { IMyResponse } from "@/operators/types";
import { IBoitier } from "@/boitier/types/type";
import { IMyErrResponse } from "@/types";



function VehicleDetails() {
  const { vehicleId} = useVehicleContext();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [boitiers,setBoitiers] = React.useState<IBoitier[]>([]);

  // Function to fetch boitiers assigned to vehicle
  const fetchVehicleBoitiers = async () => {
    setLoading(true);
    getVehicleBoitiersAPI(vehicleId)
      .then((res:IMyResponse) => {
        res.data 
        ? setBoitiers(res.data)
        : setBoitiers([]);
      })
      .catch((err:IMyErrResponse) => {
        console.error("Error fetching boitiers assigned to vehicle:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (vehicleId) {
      fetchVehicleBoitiers();
    }
  }, [vehicleId]);

  return (
    <React.Fragment>
      {vehicleId ? (
        <div className="flex flex-col justify-center items-center">
          <VehicleDetailsHeader />
          {loading ? (
            <div className="flex flex-1 justify-center items-center">
              <Spinner
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          ) : (
              <List
                className="space-y-4 max-h-[400px] overflow-y-auto"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {boitiers.map((boitier) => (
                  <VehicleBoitierDetails key={boitier.id} boitier={boitier} />
                ))}
              </List>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-1/3">
          <h1 className="text-2xl font-bold">No vehicle selected</h1>
        </div>
      )}
    </React.Fragment>
  );
}

export default VehicleDetails;
