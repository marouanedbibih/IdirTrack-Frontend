/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "@material-tailwind/react";

import DateField from "@/components/form/DateFiled";

import { useEditVehicleContext } from "@/vehicle/contexts/EditVehicleProvider";
import {
  createBoitierApi,
  getBoitierByIdAPI,
  updateBoitierAPI,
} from "../BoitierService";

import { BoitierRequest } from "../BoitierDTO";
import { SelectDevice } from "./select/SelectDevice";
import { SelectSim } from "./select/SelectSim";
import { IMyResponse } from "@/operators/types";
import { IFieldErrors, IMyErrResponse } from "@/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";
import { useBoitierContext } from "../BoitierProvider";
import { ISelectDevice } from "@/device/types/DeviceType";
import { ISelectSim } from "@/sim/types/type";
import { useEditVehicleFunctionsContext } from "@/vehicle/contexts/EditVehicleFunctionsProvider";

const BoitierForm: React.FC = () => {
  // Boitier Request provider state
  const { boitierRequest, setBoitierRequest, resetBoitierRequest } =
    useBoitierContext();
  // Loading local state
  const [loading, setLoading] = useState<boolean>(false);
  // Alert Open Global provider state
  const { setAlertOpen } = useGlobalContext();
  // Message provider state
  const { setMessage } = useGlobalContext();
  // Field Errors provider state
  const { fieldErrors, setFieldErrors, removeFieldError, resetFieldErrors } =
    useBoitierContext();
  // Get unasigned boitiers list
  const { fetchBoitierUnassigned } = useEditVehicleFunctionsContext();
  // Boitier ID provider state
  const { boitierId, setBoitierId } = useEditVehicleContext();
  // Device and Sim local state
  const [device, setDevice] = useState<ISelectDevice | null>(null);
  const [sim, setSim] = useState<ISelectSim | null>(null);

  // Handle Start Date Change
  const handleStartDateChange = (startDate: string) => {
    removeFieldError("startDate");
    setBoitierRequest({
      ...boitierRequest,
      startDate,
    });
  };
  // Handel End Date Change
  const handleEndDateChange = (endDate: string) => {
    removeFieldError("endDate");
    setBoitierRequest({
      ...boitierRequest,
      endDate,
    });
  };

  // Function to get the error message for a specific field
  const getError = (field: string) => {
    const fieldError = fieldErrors.find((error) => error.field === field);
    return fieldError ? fieldError.message : "";
  };


  // Function to create a new boitier
  const onCreateBoitier = async (request: BoitierRequest) => {
    setLoading(true);
    resetFieldErrors();
    createBoitierApi(request)
      .then((res: IMyResponse) => {
        setMessage({
          messageType: MessageType.INFO,
          message: res.message,
        });
        setAlertOpen(true);
        resetBoitierRequest();
        fetchBoitierUnassigned();
      })
      .catch((err: IMyErrResponse) => {
        if (err.message) {
          setMessage({
            messageType: MessageType.ERROR,
            message: err.message,
          });
          setAlertOpen(true);
        }
        err.fieldErrors ? setFieldErrors(err.fieldErrors) : setFieldErrors([]);
      })
      .finally(() => {
        console.log("Finally from createNewBoitier");
        setLoading(false);
      });
  };

  // Fetch boitier by ID
  const fetchBoitierById = async () => {
    setLoading(true);
    resetFieldErrors();
    getBoitierByIdAPI(boitierId)
      .then((res: IMyResponse) => {
        setBoitierRequest({
          deviceId: res.data.device.id,
          simId: res.data.sim.id,
          startDate: res.data.subscription.startDate,
          endDate: res.data.subscription.endDate,
        });
        setDevice(res.data.device);
        setSim(res.data.sim);
      })
      .catch((error) => {
        console.error("Error from retrieveBoitierById", error);
        // setErrors(error.errorsList);
      })
      .finally(() => {
        console.log("Finally from retrieveBoitierById");
        setLoading(false);
      });
  };
  React.useEffect(() => {
    if (boitierId) {
      fetchBoitierById();
    }
  }, [boitierId]);

  // Function to update a boitier
  const onUpdateBoitier = async (
    id: number,
    boitierRequest: BoitierRequest
  ) => {
    setLoading(true);
    resetFieldErrors();
    updateBoitierAPI(id, boitierRequest)
      .then((res: IMyResponse) => {
        setMessage({
          messageType: MessageType.INFO,
          message: res.message,
        });
        setAlertOpen(true);
        resetBoitierRequest();
        fetchBoitierUnassigned();
      })
      .catch((err: IMyErrResponse) => {
        if (err.message) {
          setMessage({
            messageType: MessageType.ERROR,
            message: err.message,
          });
          setAlertOpen(true);
        }
        err.fieldErrors ? setFieldErrors(err.fieldErrors) : setFieldErrors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle the form submission
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (boitierId) {
      onUpdateBoitier(boitierId, boitierRequest);
    } else {
      onCreateBoitier(boitierRequest);
    }
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
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <SelectDevice error={getError("deviceId")} device={device} />
            <SelectSim error={getError("simId")} sim={sim} />
            <DateField
              label="Select Start Date"
              date={boitierRequest.startDate}
              onChange={handleStartDateChange}
              error={getError("startDate")}
              small="Please select the start subscription date of the boitier"
            />
            <DateField
              label="Select End Date"
              date={boitierRequest.endDate}
              onChange={handleEndDateChange}
              error={getError("endDate")}
              small="Please select the end subscription date of the boitier"
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
    </Card>
  );
};

export default BoitierForm;
