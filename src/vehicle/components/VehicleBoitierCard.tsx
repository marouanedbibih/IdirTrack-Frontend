import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { IBoitier } from "@/boitier/types/type";
interface VehicleBoitierDetailsProps {
  boitier: IBoitier;
}
function VehicleBoitierCard({ boitier }: VehicleBoitierDetailsProps) {
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
          {boitier?.device.deviceType}
        </Typography>
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {boitier?.device.imei}
        </Typography>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {boitier?.sim.operatorName}
        </Typography>
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {boitier?.sim.phone}
        </Typography>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Subscription
        </Typography>
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Start Date: {boitier?.subscription.startDate}
        </Typography>
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          End Date: {boitier?.subscription.endDate}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default VehicleBoitierCard;
