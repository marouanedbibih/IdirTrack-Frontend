/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, CardBody, Spinner, Typography } from "@material-tailwind/react";

import { useVehicleContext } from "../contexts/VehicleProvider";
import { getVehicleByIdAPI } from "../services/VehicleService";
import { IMyResponse } from "@/operators/types";
import { IMyErrResponse } from "@/types";

interface VehicleDetailsHeaderProps {}

function VehicleDetailsHeader({}: VehicleDetailsHeaderProps) {
  const { vehicleDetails, setVehicleDetails } = useVehicleContext();
  const { vehicleId } = useVehicleContext();
  const [loading, setLoading] = React.useState<boolean>(false);

  // Function to fetch vehicle by id
  const fetchVehicleById = async (id: number) => {
    setLoading(true);
    getVehicleByIdAPI(id)
      .then((res: IMyResponse) => {
        setVehicleDetails(res.data);
      })
      .catch((err: IMyErrResponse) => {
        console.error("Error fetching vehicle by id:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (vehicleId) {
      fetchVehicleById(vehicleId);
    }
    console.log("Vehicle Details", vehicleDetails);
  }, [vehicleId]);
  return (
    <Card
      className="w-96 min-h-24"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <Spinner
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      ) : (
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {vehicleDetails?.vehicle.matricule}
          </Typography>
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {vehicleDetails?.vehicle.type}
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {vehicleDetails?.client.name}
          </Typography>
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {vehicleDetails?.client.company}
          </Typography>
        </CardBody>
      )}
    </Card>
  );
}

export default VehicleDetailsHeader;
