import React, { useEffect } from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  CardBody,
  Typography,
  IconButton,
  Card,
  Button,
  Tooltip,
  CardFooter,
  Spinner,
} from "@material-tailwind/react";
import { Car } from "../Car";
import { useVehicleContext } from "@/vehicle/contexts/VehicleProvider";
import DefaultPagination from "@/components/pagination/DefaultPagination";
import { getVehicleListApi } from "@/vehicle/services/vehicleService";

const TABLE_HEAD = ["MATRICULE", "CLIENT", "COMPANY", "TYPE", "ACTIONS"];

export function VehicleTable({ className }: { className?: string }) {
  // Vehicle List provider state
  const { vehiclesList, setVehiclesList } = useVehicleContext();

  // Vehicle Pagination provider state
  const { vehiclePagination, setVehiclePagination } = useVehicleContext();

  // Vehicle ID provider state
  const { vehicleId, setVehicleId } = useVehicleContext();

  // Table loading local state
  const [loading, setLoading] = React.useState(false);

  // Handle Open Vehicle Details Dialog provider state
  const { handleOpenVehicleDetailsDialog } = useVehicleContext();

  /**
   * FETCH VEHICLE LIST
   *
   * @param {number} page - Current page
   * @param {number} size - Number of items per page
   *
   */
  const fetchVehiclesList = async (page: number, size: number) => {
    setLoading(true);
    getVehicleListApi(page, size)
      .then((data) => {
        setVehiclesList(data.content);
        setVehiclePagination({
          currentPage: data.metadata?.currentPage || 1,
          totalPages: data.metadata?.totalPages || 1,
        });
      })
      .catch((error) => {
        console.error("Error fetching vehicles list:", error);
      })
      .finally(() => {
        console.log("Fetching vehicles list is done.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVehiclesList(vehiclePagination.currentPage, 5); // Fetch 5 vehicles per page
  }, [vehiclePagination.currentPage]);

  const handleViewVehicleDetails = (id: number | null) => {
    if (id === null) {
      return;
    }
    setVehicleId(id);
    handleOpenVehicleDetailsDialog();
  };

  return (
    <div className="flex flex-col justify-center items-start w-2/3">
      {loading ? (
        <div className="flex flex-1 w-full justify-center items-center">
          <Spinner
            className="h-8 w-8"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      ) : vehiclesList && vehiclesList.length > 0 ? (
        <Card
          className="h-full w-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            className={`px-0 ${className}`}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehiclesList.map(({ vehicle, client }, index) => {
                  const isLast = index === vehiclesList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {vehicle.matricule}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {client.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {client.company}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {vehicle.type}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-2">
                          <Tooltip content="View Vehicle">
                            <IconButton
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                              color="blue"
                              onClick={() =>
                                handleViewVehicleDetails(vehicle.id)
                              }
                            >
                              <EyeIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Edit Vehicle">
                            <IconButton
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                              color="green"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete Vehicle">
                            <IconButton
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                              color="red"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <DefaultPagination
              currentPage={vehiclePagination.currentPage}
              totalPages={vehiclePagination.totalPages}
              onPageChange={(page) => {
                setVehiclePagination({
                  ...vehiclePagination,
                  currentPage: page,
                });
              }}
            />
          </CardFooter>
        </Card>
      ) : (
        <div className="flex flex-1 w-full justify-center items-center">
          <Typography
            color="gray"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            No Vehicles Found
          </Typography>
        </div>
      )}
    </div>
  );
}
