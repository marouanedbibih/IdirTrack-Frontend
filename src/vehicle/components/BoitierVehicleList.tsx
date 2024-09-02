/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  List,
  ListItem,
  Card,
  Tooltip,
  IconButton,
  Spinner,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { useEditVehicleContext } from "../contexts/EditVehicleProvider";
import { useEditVehicleFunctionsContext } from "../contexts/EditVehicleFunctionsProvider";
import { IFinallyProps } from "@/types";
import { IBoitier } from "@/boitier/types/type";
import { set } from "date-fns";
import DeleteConfirmationDialog from "@/components/dialog/DeleteConfirmationDialog";
import { deleteBoitierApi } from "@/boitier/BoitierService";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";

interface BoitierVehicleListProps {
  reFetchUnassignedBoitiers: boolean;
}

export const BoitierVehicleList: React.FC<BoitierVehicleListProps> = ({
  reFetchUnassignedBoitiers
}) => {
  /**
   * Global context
   */
  const { setAlertOpen, setMessage } = useGlobalContext();

  // Fetch list of boitier unassigned to a vehicle
  const { boitiersUnassigned, fetchBoitierUnassigned } =
    useEditVehicleFunctionsContext();

  const { unassignedLoading } = useEditVehicleContext();

  React.useEffect(() => {
    fetchBoitierUnassigned();
  }, [reFetchUnassignedBoitiers]);

  const { boitierId, setBoitierId } = useEditVehicleContext();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  const [isLostDialogOpen, setIsLostDialogOpen] =
    React.useState<boolean>(false);

  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const openDeleteDialog = (id: number) => {
    setBoitierId(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setBoitierId(null);
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteBoitier = () => {
    setIsDeleteDialogOpen(false);
    setIsLostDialogOpen(true);
  };

  const closeLostDialog = () => {
    setBoitierId(null);
    setIsLostDialogOpen(false);
  };

  const lostBoitier = () => {
    onDeleteBoitier(boitierId, true);
  };

  const notLostBoitier = () => {
    onDeleteBoitier(boitierId, false);
  };

  const onDeleteBoitier = (id: number | null, isLost: boolean) => {
    setDeleteLoading(true);
    deleteBoitierApi(id, isLost)
      .then((res) => {
        fetchBoitierUnassigned();
        setMessage({
          message: res.message,
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        closeLostDialog();
        fetchBoitierUnassigned();
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

  /**
   * Update boitier
   */
  const handleUpdateBoitier = (id: number) => {
    setBoitierId(id);
  };

  return (
    <Card
      className="w-full p-4 min-h-28"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {unassignedLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <Spinner
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      ) : boitiersUnassigned === null ? (
        <div className="flex flex-1 justify-center items-center">
          <small>No Boitier found</small>
        </div>
      ) : (
        <List
          className="space-y-4 max-h-52 overflow-y-auto"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {boitiersUnassigned?.map((boitier: IBoitier) => (
            <ListItem
              key={boitier.id}
              className="flex flex-row gap-2 border p-3 rounded-lg shadow-md justify-between items-start"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              ripple={false}
            >
              <div className="flex flex-col gap-1">
                <div>
                  <p className="font-bold">Device</p>
                  <small className="text-sm text-blue-gray-600">
                    IMEI: {boitier.device.imei}
                  </small>
                  <br />
                  <small className="text-sm text-blue-gray-600">
                    Type Device: {boitier.device.deviceType}
                  </small>
                </div>
                <div>
                  <p className="font-bold">Sim</p>
                  <small className="text-sm text-blue-gray-600">
                    Phone: {boitier.sim.phone}
                  </small>
                  <br />
                  <small className="text-sm text-blue-gray-600">
                    CCID: {boitier.sim.ccid}
                  </small>
                  <br />
                  <small className="text-sm text-blue-gray-600">
                    Operator: {boitier.sim.operatorName}
                  </small>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <ListItemSuffix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="flex gap-2"
                >
                  <Tooltip content="Update Staff">
                    <IconButton
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      color="green"
                      onClick={() => handleUpdateBoitier(boitier.id)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Delete Staff">
                    <IconButton
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      color="red"
                      onClick={() => openDeleteDialog(boitier.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </ListItemSuffix>
              </div>
            </ListItem>
          ))}
        </List>
      )}
      <DeleteConfirmationDialog
        handleClose={closeDeleteDialog}
        handleConfirm={confirmDeleteBoitier}
        open={isDeleteDialogOpen}
        message="Are you sure you want to delete this boitier?"
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
              Lost Boitier
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
                Are you sure you want to mark this boitier as lost?
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
  );
};
