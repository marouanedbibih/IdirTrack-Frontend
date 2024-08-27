/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  CardBody,
  Typography,
  IconButton,
  Card,
  Tooltip,
  CardFooter,
  Spinner,
} from "@material-tailwind/react";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useVehicleContext } from "@/vehicle/contexts/VehicleProvider";
import DefaultPagination from "@/components/pagination/DefaultPagination";
import {
  deleteVehicleAPI,
  getVehicleListAPI,
} from "@/vehicle/services/VehicleService";
import { IMyResponse } from "@/operators/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";
import DeleteConfirmationDialog from "@/components/dialog/DeleteConfirmationDialog";

const TABLE_HEAD = ["MATRICULE", "CLIENT", "COMPANY", "TYPE", "ACTIONS"];

export function VehicleTable({ className }: { className?: string }) {
  const { vehiclesList, setVehiclesList } = useVehicleContext();
  const { vehiclePagination, setVehiclePagination } = useVehicleContext();
  const { vehicleId, setVehicleId } = useVehicleContext();
  const [loading, setLoading] = React.useState(false);

  // Fetch list of vehicles
  const fetchVehiclesList = async (page: number, size: number) => {
    setLoading(true);
    getVehicleListAPI(page, size)
      .then((res: IMyResponse) => {
        setVehiclesList(res.data);
        setVehiclePagination({
          currentPage: res.metadata?.currentPage || 1,
          totalPages: res.metadata?.totalPages || 1,
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
    fetchVehiclesList(vehiclePagination.currentPage, 5);
  }, [vehiclePagination.currentPage]);

  const OnViewVehicle = (id: number | null) => {
    if (id === null) {
      return;
    }
    setVehicleId(id);
  };

  /**
   * Delete vehicle
   */

  const { setAlertOpen, setMessage } = useGlobalContext();

  const { vehicleDeleteId, setVehicleDeleteId } = useVehicleContext();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  const [isLostDialogOpen, setIsLostDialogOpen] =
    React.useState<boolean>(false);

  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const openDeleteDialog = (id: number) => {
    setVehicleDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setVehicleDeleteId(null);
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteBoitier = () => {
    setIsDeleteDialogOpen(false);
    setIsLostDialogOpen(true);
  };

  const closeLostDialog = () => {
    setVehicleDeleteId(null);
    setIsLostDialogOpen(false);
  };

  const lostBoitier = () => {
    onDeleteVehicle(vehicleDeleteId, true);
  };

  const notLostBoitier = () => {
    onDeleteVehicle(vehicleDeleteId, false);
  };

  const onDeleteVehicle = (id: number | null, isLost: boolean) => {
    setDeleteLoading(true);
    deleteVehicleAPI(id, isLost)
      .then((res) => {
        fetchVehiclesList(vehiclePagination.currentPage, 5);
        setMessage({
          message: res.message,
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        closeLostDialog();
      })
      .catch((err) => {
        setMessage({
          message: err.message,
          messageType: MessageType.ERROR,
        });
        setAlertOpen(true);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
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

                  const rowClass =
                    vehicleId === vehicle.id ? "bg-blue-gray-50/50" : "";

                  return (
                    <tr key={index} className={rowClass}>
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
                                OnViewVehicle(vehicle.id ? vehicle.id : null)
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
                              onClick={() => vehicle.id && openDeleteDialog(vehicle.id)}
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

          <DeleteConfirmationDialog
            handleClose={closeDeleteDialog}
            handleConfirm={confirmDeleteBoitier}
            open={isDeleteDialogOpen}
            message="Are you sure you want to delete this Vehicle?"
            loading={deleteLoading}
          />
          {/* Is Lost Dialog */}
          <Dialog
            open={isLostDialogOpen}
            handler={closeLostDialog}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="min-h-20"
          >
            {deleteLoading ? (
              <div className="flex justify-center items-center p-4 ">
                <Spinner
                  className="h-8 w-8"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
            ) : (
              <div>
                <DialogHeader
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Lost Vehicle
                </DialogHeader>
                <DialogBody
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Typography
                    color="gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Are you sure you want to mark this vehicle as lost?
                  </Typography>
                </DialogBody>
                <DialogFooter
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Button
                    variant="text"
                    color="red"
                    onClick={closeLostDialog}
                    className="mr-1"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <span>Cancel</span>
                  </Button>
                  <div className="flex flex-row gap-4">
                    <Button
                      variant="gradient"
                      color="blue-gray"
                      onClick={notLostBoitier}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <span>Not Lost</span>
                    </Button>
                    <Button
                      variant="gradient"
                      color="red"
                      onClick={lostBoitier}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <span>Lost</span>
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            )}
          </Dialog>
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
