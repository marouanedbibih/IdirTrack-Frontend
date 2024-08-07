"use client";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import exp from "constants";

import { useEffect } from "react";
import { BoitierVehicleList } from "./BoitierVehicleList";
import { SelectClient } from "./SelectClient";
import { useEditVehicleContext } from "../contexts/EditVehicleProvider";

const vehicleTypes = [
  { value: "SUV", label: "SUV" },
  { value: "Sedan", label: "Sedan" },
  { value: "Truck", label: "Truck" },
];
function VehicleForm() {
  // const { vehicleRequest, setVehicleRequest,boitiers,fetchBoitierNotAttachedList,createNewVehicle } = useCreateVehicleContext();

  // Vehicle request provider state
  const { vehicleRequest, setVehicleRequest } = useEditVehicleContext();

  // useEffect(() => {
  //   fetchBoitierNotAttachedList(1,10);
  // }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit requestData to your API
    console.log("Request Vehicle Data:", vehicleRequest);
    // createNewVehicle(vehicleRequest);
  };

  return (
    <Card
      color="white"
      shadow={false}
      className="w-full rounded-xl p-4 flex flex-col h-4/5"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {/* <form className="w-full h-full" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <ClientSelect />
          <SelectClient />
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
          />
          <SelectField
            label="Vehicle Type"
            items={vehicleTypes}
            selectedValue={vehicleRequest.type}
            setSelectedValue={(value) =>
              setVehicleRequest({ ...vehicleRequest, type: value })
            }
          />
        </div>
        <Button
          className="mt-6"
          fullWidth
          color="green"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          type="submit"
        >
          Submit
        </Button>
      </form> */}

      <BoitierVehicleList />
    </Card>
  );
}

export default VehicleForm;
