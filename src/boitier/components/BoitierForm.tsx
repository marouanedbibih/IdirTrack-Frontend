"use client";
import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "@material-tailwind/react";

import DateField from "@/components/form/DateFiled";
import { SelectSim } from "./SelectSim";
import { SelectDevice } from "./SelectDevice";
import { useEditVehicleContext } from "@/vehicle/contexts/EditVehicleProvider";
import { createBoitierApi, deleteBoitierApi } from "../BoitierService";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const BoitierForm: React.FC = () => {
  // Boitier Request provider state
  const { boitierRequest, setBoitierRequest, resetBoitierRequest } =
    useEditVehicleContext();

  // Errors provider state
  const { errors, setErrors, resetErrors } = useEditVehicleContext();

  // Loading local state
  const [loading, setLoading] = useState<boolean>(false);

  // Alert provider state
  const { setAlertOpen } = useEditVehicleContext();

  // Message provider state
  const { setMessage } = useEditVehicleContext();

  // Fetch Boitier Not Attached List provider state
  const { fetchBoitierNotAttachedList } = useEditVehicleContext();

  // Delete Boitier Dialog provider state
  const { deleteBoitierDialogOpen, setDeleteBoitierDialogOpen } =
    useEditVehicleContext();

  // Handel Delete Boitier Dialog provider state
  const { handelBoitierDeleteDialog } = useEditVehicleContext();

  // Loading Delete local state
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  // Lost Dialog provider state
  const [lostDialogOpen, setLostDialogOpen] = useState<boolean>(false);


  // Select deleted Boitier ID provider state
  const { selectedBoitierId } = useEditVehicleContext();

  // Handel Start Date Change
  const handleStartDateChange = (startDate: string) => {
    setBoitierRequest({
      ...boitierRequest,
      startDate,
    });
  };

  // Handel End Date Change
  const handleEndDateChange = (endDate: string) => {
    setBoitierRequest({
      ...boitierRequest,
      endDate,
    });
  };

  // Handel Lost Dialog Close
  const handleConfirmClick = () => {
    setDeleteBoitierDialogOpen(!deleteBoitierDialogOpen);
    setLostDialogOpen(true);
  };

  /**
   * CREATE BOITIER
   * @description

   * @param boitierRequest
   * @returns void
   */

  const handleCreateNewBoitier = async (ev: React.FormEvent) => {
    // Prevent the default form submission
    ev.preventDefault();
    // Set the loading state
    setLoading(true);
    // Reset the errors
    resetErrors();
    // Create the new boitier
    createBoitierApi(boitierRequest)
      .then((response) => {
        console.log("Response from createNewBoitier", response);
        // Set the message
        setMessage({
          messageType: response.messageType,
          message: response.message,
        });
        // Set the alert open
        setAlertOpen(true);
        // Reset the form
        resetBoitierRequest();
        // Fetch the boitier not attached list
        fetchBoitierNotAttachedList(1, 10);
      })
      .catch((error) => {
        console.error("Error from createNewBoitier", error);
        setErrors(error.errorsList);
      })
      .finally(() => {
        console.log("Finally from createNewBoitier");
        setLoading(false);
      });
  };

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const error = errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  useEffect(() => {
    console.log("Errors list", errors);
  }, [errors]);

  const handleLostDialogClose = () => {
    setLostDialogOpen(false);
  };

  /**
   * HANDLE DELETE BOITIER
   * @description
   */

  const handleDeleteBoitier = async (isLost:boolean) => {
    // Set the loading state
    setLoadingDelete(true);
    deleteBoitierApi(selectedBoitierId, isLost)
      .then((response) => {
        console.log("Response from deleteBoitier", response);
        // Set the message
        setMessage({
          messageType: response.messageType,
          message: response.message,
        });
        // Set the alert open
        setAlertOpen(true);
        // Fetch the boitier not attached list
        fetchBoitierNotAttachedList(1, 10);
      })
      .catch((error) => {
        console.error("Error from deleteBoitier", error);
        setErrors(error.errorsList);
      })
      .finally(() => {
        console.log("Finally from deleteBoitier");
        setLoadingDelete(false);
        setLostDialogOpen(false);
      });
  };

  return (
    <Card
      color="white"
      shadow={false}
      className="w-full rounded-xl p-4 flex flex-col min-h-24"
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
        <form className="w-full" onSubmit={handleCreateNewBoitier}>
          <div className="mb-1 flex flex-col gap-6">
            <SelectDevice error={getError("device")} />
            <SelectSim error={getError("sim")} />
            <DateField
              label="Select Start Date"
              date={boitierRequest.startDate}
              onChange={handleStartDateChange}
              error={getError("dateStart")}
            />
            <DateField
              label="Select End Date"
              date={boitierRequest.endDate}
              onChange={handleEndDateChange}
              error={getError("dateEnd")}
            />
          </div>
          <Button
            type="submit"
            className="mt-6"
            fullWidth
            color="green"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Submit
          </Button>
        </form>
      )}

      <Dialog
        open={deleteBoitierDialogOpen}
        handler={handelBoitierDeleteDialog}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Confirm Deletion
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Are you sure you want to delete this Boitier? This action cannot be
          undone.
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={() => handelBoitierDeleteDialog(null)}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleConfirmClick}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={lostDialogOpen}
        handler={setLostDialogOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Is the Boitier Lost?
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Please choose if the boitier is lost or not.
        </DialogBody>
        {loadingDelete ? (
          <div className="flex flex-1 justify-center items-center p-4">
            <Spinner
              className="h-8 w-8"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
        ) : (
          <DialogFooter
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              variant="text"
              color="red"
              onClick={() => {
                handleDeleteBoitier(false);
              }}
              className="mr-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Not Lost</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                handleDeleteBoitier(true);
              }}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Lost</span>
            </Button>
          </DialogFooter>
        )}
      </Dialog>
    </Card>
  );
};

export default BoitierForm;
