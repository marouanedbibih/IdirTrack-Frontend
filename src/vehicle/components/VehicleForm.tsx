// @ts-nocheck
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
import { createVehicleAPI } from "../services/VehicleService";
import { IMyErrResponse } from "@/types";
import { useEditVehicleFunctionsContext } from "../contexts/EditVehicleFunctionsProvider";

const vehicleTypes = [
  { value: "SUV", label: "SUV" },
  { value: "Sedan", label: "Sedan" },
  { value: "Truck", label: "Truck" },
];
function VehicleForm() {
  const { vehicleRequest, setVehicleRequest } = useEditVehicleContext();

  const [loading, setLoading] = React.useState<boolean>(false);

  const { setMessage } = useEditVehicleContext();

  const { setAlertOpen } = useEditVehicleContext();

  const { resetVehicleRequest } = useEditVehicleContext();

  const { errors, setErrors, resetErrors } = useEditVehicleContext();
  // Refetch unassigned boitiers
  const [reFetchUnassignedBoitiers, setReFetchUnassignedBoitiers] =
    React.useState<boolean>(false);

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const error = errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  // Create new a vehicle
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
        setAlertOpen(true);
        resetVehicleRequest();
        setReFetchUnassignedBoitiers(!reFetchUnassignedBoitiers);
      })
      .catch((err: IMyErrResponse) => {
        console.log(err);
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
          <BoitierVehicleList
            reFetchUnassignedBoitiers={reFetchUnassignedBoitiers}
          />
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
