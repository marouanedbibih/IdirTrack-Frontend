import { ComplexNavbar } from "@/components/navbar/ComplexNavbar";
import { SidebarWithContentSeparator } from "@/components/sidebar/SidebarWithContentSeparator";
import { StaffProvider } from "@/context/StaffProvider";
import { VehicleProvider } from "@/vehicle/contexts/VehicleProvider";
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
    <StaffProvider>
      <React.Fragment>
        <div className="flex min-h-screen bg-blue-gray-50 w-full h-screen p-4 gap-4">
          <SidebarWithContentSeparator />
          <div className="flex flex-col w-full gap-8">
            {/* <Navbar /> */}
            <ComplexNavbar />
            <main className="px-16">{children}</main>
          </div>
        </div>
      </React.Fragment>
    </StaffProvider>
  );
}