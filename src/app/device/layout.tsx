import { ComplexNavbar } from "@/components/navbar/ComplexNavbar";
import { SidebarWithContentSeparator } from "@/components/sidebar/SidebarWithContentSeparator";
import { DeviceProvider } from "@/device/contexts/DeviceProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vehicle",
  description: "Generated by create next app",
};

export default function VehicleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <DeviceProvider>
      <React.Fragment>
        <div className="flex min-h-screen bg-blue-gray-50 w-full h-screen p-4 gap-4">
          <SidebarWithContentSeparator />
          <div className="flex-1 w-full">
            <ComplexNavbar />
            <main className="px-16">{children}</main>
          </div>
        </div>
      </React.Fragment>
    </DeviceProvider>
  );
}
