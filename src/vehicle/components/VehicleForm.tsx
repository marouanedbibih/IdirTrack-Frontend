"use client";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import exp from "constants";

import { Select, Option } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { BoitierVehicleList } from "./BoitierVehicleList";
import { SelectClient } from "./SelectClient";
import { useEditVehicleContext } from "../contexts/EditVehicleProvider";
import FormField from "@/components/form/FormField";
import SelectField from "@/components/form/SelectField";
import { createVehicleAPI } from "../services/vehicleService";

const vehicleTypes = [
  { value: "SUV", label: "SUV" },
  { value: "Sedan", label: "Sedan" },
  { value: "Truck", label: "Truck" },
];
function VehicleForm() {
  // Vehicle request provider state
  const { vehicleRequest, setVehicleRequest } = useEditVehicleContext();

  // Loading local state
  const [loading, setLoading] = React.useState<boolean>(false);

  // Message provider state
  const { setMessage } = useEditVehicleContext();

  // Alert provider state
  const { setAlertOpen } = useEditVehicleContext();

  // Fetch Boitier Not Attached List
  const { fetchBoitierNotAttachedList } = useEditVehicleContext();

  // Reset the vehicle request provider state
  const { resetVehicleRequest } = useEditVehicleContext();

  // Errors provider state
  const { errors, setErrors, resetErrors } = useEditVehicleContext();

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const error = errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  /**
   * HANDLE CREATE VEHICLE
   * @param vehicleRequest
   */

  const handleCreateVehicle = () => {
    console.log("Request Vehicle Data:", vehicleRequest);
    setLoading(true);
    createVehicleAPI(vehicleRequest)
      .then((data) => {
        console.log(data);
        // Set the message
        setMessage({
          message: data.message,
          messageType: data.messageType,
        });
        // Set the alert open
        setAlertOpen(true);
        // Fetch Boitier Not Attached List
        fetchBoitierNotAttachedList(1, 10);
        // Reset the vehicle request
        resetVehicleRequest();
      })
      .catch((error) => {
        console.log(error);
        // Set the errors
        setErrors(error.errorsList);
      })
      .finally(() => {
        setLoading(false);
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
        <form className="w-full h-full">
          <div className="mb-1 flex flex-col gap-6">
            <SelectClient error={getError("clientMicroserviceId")} />
            <FormField
              label="Matricule"
              placeholder="Enter matricule"
              type="text"
              value={vehicleRequest.matricule}
              onChange={(e) =>
                setVehicleRequest({
                  ...vehicleRequest,
                  matricule: e.target.value,
                })
              }
              error={getError("matricule")}
              smallMessage="Enter the vehicle matricule"
            />

            <div className="w-full">
              <Select
                label="Select Version"
                value={vehicleRequest.type}
                onChange={(val) => {
                  setVehicleRequest({ ...vehicleRequest, type: val });
                }}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                size="lg"
              >
                {vehicleTypes.map((type) => (
                  <Option value={type.value} key={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
              {getError("type") ? (
                <Typography
                  variant="small"
                  className="flex justify-start font-bold text-red-500 "
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {getError("type")}
                </Typography>
              ) : (
                <Typography
                  variant="small"
                  className="flex justify-start font-bold text-blue-gray-500"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Select a client from the list required
                </Typography>
              )}
            </div>
          </div>
          <BoitierVehicleList />
          <Button
            className="mt-6"
            fullWidth
            color="green"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            type="button"
            onClick={handleCreateVehicle}
          >
            Submit
          </Button>
        </form>
      )}
    </Card>
  );
}

export default VehicleForm;
