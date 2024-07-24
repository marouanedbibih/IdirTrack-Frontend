"use client";
import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
import SelectField from "../form/SelectField";
import { useCreateVehicleContext } from "@/contexts/CreateVehicleProvider";
import { Device } from "@/types/Device";
import { Sim } from "@/types/Sim";
import DeviceSelect from "../device/DeviceSelect";

const BoitierForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    // Submit requestData to your API
    console.log("Request Data:");
  };

  return (
    // <Card
    //   color="white"
    //   shadow={false}
    //   className="w-1/2 rounded-xl p-4 flex flex-col"
    //   placeholder={undefined}
    //   onPointerEnterCapture={undefined}
    //   onPointerLeaveCapture={undefined}
    // >
    //   <form className="w-full" onSubmit={handleSubmit}>
    //     <div className="mb-1 flex flex-col gap-6">
    //       <DeviceSelect />
    //     </div>
    //     <Button
    //       type="submit"
    //       className="mt-6"
    //       fullWidth
    //       color="green"
    //       placeholder={undefined}
    //       onPointerEnterCapture={undefined}
    //       onPointerLeaveCapture={undefined}
    //     >
    //       Submit
    //     </Button>
    //   </form>
    // </Card>
    <form className="w-1/2" onSubmit={handleSubmit}>
      <div className="mb-1 flex flex-col gap-6">
        <DeviceSelect />
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
  );
};

export default BoitierForm;
