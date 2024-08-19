"use client";
import DevicesStatistiques from "@/device/components/DevicesStatistiques";
import DeviceTypeTable from "@/device/components/DeviceTypeTable";
import DeviceForm from "@/device/components/form/DeviceForm";
import DeviceTypeForm from "@/device/components/form/DeviceTypeForm";
import { DeviceTable } from "@/device/components/table/DeviceTable";
import { DeviceFunctionsProvider } from "@/device/contexts/DeviceFunctionsProvider";
import {
  DeviceProvider,
  useDeviceContext,
} from "@/device/contexts/DeviceProvider";
import { DeviceTypeProvider } from "@/device/contexts/DeviceTypeProvider";
import React from "react";

const DeviceHome: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4 gap-4 ">
      <div className="flex flex-row justify-between items-start w-full">
        <DeviceTypeProvider>
          <DeviceTypeTable />
          <DevicesStatistiques />
          <DeviceTypeForm />
        </DeviceTypeProvider>
      </div>
      <DeviceProvider>
        <DeviceFunctionsProvider>
          <DeviceTable />
          <DeviceForm />
        </DeviceFunctionsProvider>
      </DeviceProvider>
    </div>
  );
};

export default DeviceHome;
