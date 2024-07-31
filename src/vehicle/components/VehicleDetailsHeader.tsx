import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import { VehicleInterface } from "../VehicleTypes";
import { Vehicle } from "@/types/Vehicle";
import { Client } from "@/types/Client";


interface VehicleDetailsHeaderProps {
    vehicleInfos : Vehicle;
    clientInfos : Client;
}

function VehicleDetailsHeader({ vehicleInfos,clientInfos}: VehicleDetailsHeaderProps) {
  return (
    <Card
      className="mt-6 w-96"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
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
          {vehicleInfos?.matricule}
        </Typography>
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {clientInfos?.name}
        </Typography>
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {clientInfos?.company}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default VehicleDetailsHeader;
