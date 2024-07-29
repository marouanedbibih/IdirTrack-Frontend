"use client";
import React, { useEffect, useState } from "react";
import { Card, Button } from "@material-tailwind/react";
// import { useCreateVehicleContext } from "@/contexts/CreateVehicleProvider";
// import DeviceSelect from "../device/DeviceSelect";
// import SimSelect from "../sim/SimSelect";
// import DateField from "../field/DateFiled";
import { create } from "domain";
import SimSelect from "./select/SimSelect";
import DeviceSelect from "./select/DeviceSelect";

const BoitierForm: React.FC = () => {
//   const { boitierRequest, setBoitierRequest,createNewBoitier,boitierErrors } = useCreateVehicleContext();

  // Alert state
//   const {} = useCreateVehicleContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit requestData to your API
    // console.log("Request Boitier Data:", boitierRequest);
    // createNewBoitier(boitierRequest);
    
  };

  const handleStartDateChange = (startDate: string) => {
    // setBoitierRequest({
    //   ...boitierRequest,
    //   startDate,
    // });
  };

  const handleEndDateChange = (endDate: string) => {
    // setBoitierRequest({
    //   ...boitierRequest,
    //   endDate,
    // });
  };

  const [errorStartDate, setErrorStartDate] = useState<string | null>(null);
  const [errorEndDate, setErrorEndDate] = useState<string | null>(null);

//   useEffect(() => {
//     if (boitierErrors.startDate != null) {
//       setErrorStartDate(boitierErrors.startDate);
//     } else {
//       setErrorStartDate(null);
//     }
//   }, [boitierErrors.startDate]);

//   useEffect(() => {
//     if (boitierErrors.endDate != null) {
//       setErrorEndDate(boitierErrors.endDate);
//     } else {
//       setErrorEndDate(null);
//     }
//   }, [boitierErrors.endDate]);

  return (
    <Card
      color="white"
      shadow={false}
      className="w-full rounded-xl p-4 flex flex-col"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <DeviceSelect />
          <SimSelect />
          {/* <DateField
            label="Select Start Date"
            // date={boitierRequest.startDate}
            onChange={handleStartDateChange}
            error={errorStartDate}
          />
          <DateField
            label="Select End Date"
            // date={boitierRequest.endDate}
            onChange={handleEndDateChange}
            error={errorEndDate}
          /> */}
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
    </Card>
  );
};

export default BoitierForm;
