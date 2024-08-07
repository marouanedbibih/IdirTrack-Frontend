import React, { useEffect } from "react";
import {
  List,
  ListItem,
  Card,
  Tooltip,
  IconButton,
  Spinner,
  ListItemSuffix,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { useEditVehicleContext } from "../contexts/EditVehicleProvider";

interface BoitierVehicleListProps {}

export const BoitierVehicleList: React.FC<BoitierVehicleListProps> = ({}) => {
  // Fetch Boitier Not Attached List provider state
  const {
    fetchBoitierNotAttachedList,
    boitiersList,
    fetchBoitierNotAttachedLoading,
  } = useEditVehicleContext();

  // Delete Boitier Dialog provider state
  const {
    setDeleteBoitierDialogOpen,
    setSelectedBoitierId,
  } = useEditVehicleContext();

  // Handle Delete Boitier Dialog
  const handleDeleteBoitierDialog = (id: number) => {
    setSelectedBoitierId(id);
    setDeleteBoitierDialogOpen(true);
  };

  useEffect(() => {
    fetchBoitierNotAttachedList(1, 10);
  }, []);

  return (
    <Card
      className="w-full p-4 min-h-28"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {fetchBoitierNotAttachedLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <Spinner
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      ) : (
        <List
          className="space-y-4 max-h-40 overflow-y-auto"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {boitiersList.map((boitier: any) => (
            <ListItem
              key={boitier.id}
              className="flex flex-row gap-2 border p-3 rounded-lg shadow-md justify-between items-start"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              ripple={false}
            >
              <div className="flex flex-col gap-1">
                <small className="text-sm text-blue-gray-600">
                  IMEI: {boitier.device.imei}
                </small>
                <small className="text-sm text-blue-gray-600">
                  Type Device: {boitier.device.type}
                </small>
                <small className="text-sm text-blue-gray-600">
                  Phone Number: {boitier.sim.phoneNumber}
                </small>
                <small className="text-sm text-blue-gray-600">
                  CCID: {boitier.sim.ccid}
                </small>
                <small className="text-sm text-blue-gray-600">
                  Type SIM: {boitier.sim.type}
                </small>
              </div>
              <div className="flex gap-2 items-center">
                <ListItemSuffix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Tooltip content="Delete Staff">
                    <IconButton
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      color="red"
                      onClick={() => handleDeleteBoitierDialog(boitier.id)}
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
    </Card>
  );
};
