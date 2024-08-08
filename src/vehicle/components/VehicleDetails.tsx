import React, { useEffect } from "react";
import { useVehicleContext } from "../contexts/VehicleProvider";

import VehicleDetailsHeader from "./VehicleDetailsHeader";
import VehicleBoitierDetails from "./VehicleBoitierCard";
import { BoitierInterface, VehicleInterface } from "../VehicleTypes";
import {
  getBoitierNotAssigned,
  getBoitiersAssignedToVehicle,
  getVehicleByIdAPI,
} from "../services/vehicleService";
import { List, Spinner } from "@material-tailwind/react";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

function VehicleDetails() {
  // Vehicle id provider state
  const { vehicleId, setVehicleId } = useVehicleContext();

  // Vehicle boities loading local state
  const [loading, setLoading] = React.useState<boolean>(false);

  // Boiters not assigned to vehicle list local state
  const [boitiersNotAssigned, setBoitiersNotAssigned] = React.useState<
    BoitierInterface[]
  >([]);

  // Open Vehicle Details Dialog provider state
  const { openVehicleDetailsDialog } = useVehicleContext();

  // Handle Open Vehicle Details Dialog provider state
  const { handleOpenVehicleDetailsDialog } = useVehicleContext();

  /**
   * FETCH BOITIERS ASSIGNED TO VEHICLE
   *
   */

  const fetchVehicleById = async () => {
    setLoading(true);
    getBoitiersAssignedToVehicle(vehicleId)
      .then((response) => {
        console.log("Boitiers assigned to vehicle", response);
        setBoitiersNotAssigned(response.content);
      })
      .catch((error) => {
        console.error("Error fetching boitiers assigned to vehicle:", error);
      })
      .finally(() => {
        console.log("Boitiers assigned to vehicle fetched successfully");
        setLoading(false);
      });
  };

  // useEffect to fetch boitiers assigned to vehicle
  useEffect(() => {
    if (vehicleId) {
      fetchVehicleById();
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
                {boitiersNotAssigned.map((boitier) => (
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
