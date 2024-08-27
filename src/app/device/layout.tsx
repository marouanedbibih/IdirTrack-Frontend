"use client";
import { ComplexNavbar } from "@/components/navbar/ComplexNavbar";
import { SidebarWithContentSeparator } from "@/components/sidebar/SidebarWithContentSeparator";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Metadata } from "next";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Adjust the import path as needed
import { VehicleProvider } from "@/vehicle/contexts/VehicleProvider";
import { DeviceProvider } from "@/device/contexts/DeviceProvider";

export default function VehicleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { getRoleFromLocalStorage,getTokenFromLocalStorage } = useGlobalContext(); // Access context
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Hook for navigation
  const token = getTokenFromLocalStorage(); // Get token from context
  const role = getRoleFromLocalStorage(); // Get role from context

  useEffect(() => {
    console.log("Token:", token); // Debug log
    console.log("Role:", role); // Debug log
    // Check if the user is authorized
    const isAuthorized = token && (role === "ADMIN" || role === "MANAGER");

    if (!isAuthorized) {
      router.push("/login"); // Redirect to login page or another appropriate page
    } else {
      setLoading(false); // Stop loading once the authorization check is complete
    }
  }, [token, role, router]);

  // Show a loading state while checking authorization
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="flex min-h-screen bg-blue-gray-50 w-full h-auto p-4 gap-4">
        <SidebarWithContentSeparator />
        <div className="flex-1 ml-64 p-4">
          <ComplexNavbar />
          <main className="px-16">
            <DeviceProvider>{children}</DeviceProvider>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}
