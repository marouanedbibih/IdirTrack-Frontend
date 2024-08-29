"use client";

import { Card } from "@material-tailwind/react";

import SimTableBody from "./table/SimTableBody";
import SimTableHeader from "./table/SimTableHeader";


export function SimTable() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <SimTableHeader />
        <SimTableBody />
      </Card>
    </div>
  );
}
