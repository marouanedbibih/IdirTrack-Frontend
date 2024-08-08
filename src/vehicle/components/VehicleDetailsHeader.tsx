import React from "react";
import { Card, CardBody, Spinner, Typography } from "@material-tailwind/react";

import { useVehicleContext } from "../contexts/VehicleProvider";
import { getVehicleByIdAPI } from "../services/vehicleService";

interface VehicleDetailsHeaderProps {}

function VehicleDetailsHeader({}: VehicleDetailsHeaderProps) {
  // Vehicle details provider list
  const { vehicleDetails, setVehicleDetails } = useVehicleContext();

  // Vehicle ID provider state
  const { vehicleId, setVehicleId } = useVehicleContext();

  // Loading vehicle details local state
  const [loading, setLoading] = React.useState<boolean>(false);

  /**
   * FETCH VEHICLE BY ID
   *
   * @param id
   */
  const fetchVehicleById = async (id: number) => {
    setLoading(true);
    getVehicleByIdAPI(id)
      .then((response) => {
        setVehicleDetails(response.content);
        console.log("Vehicle Details Response", response.content);
      })
      .catch((error) => {
        console.error("Error fetching vehicle by id:", error);
      })
      .finally(() => {
        console.log("Vehicle fetched successfully");
        setLoading(false);
      });
  };

  // useEffect to fetch vehicle by id
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
