"use client";
import {
  Card,

} from "@material-tailwind/react";

import DeviceTableBody from "./DeviceTableBody";

import DeviceTableHeader from "./DeviceTableHeader";

export function DeviceTable() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DeviceTableHeader />
        <DeviceTableBody />
      </Card>
    </div>
  );
}
