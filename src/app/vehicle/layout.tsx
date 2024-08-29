"use client";
import { ComplexNavbar } from "@/components/navbar/ComplexNavbar";
import { SidebarWithContentSeparator } from "@/components/sidebar/SidebarWithContentSeparator";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Metadata } from "next";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Adjust the import path as needed
import { VehicleProvider } from "@/vehicle/contexts/VehicleProvider";

export default function VehicleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { getRoleFromLocalStorage, getTokenFromLocalStorage } = useGlobalContext(); // Access context
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter(); // Hook for navigation

  useEffect(() => {
    // Fetch token and role from localStorage on the client side
    const fetchedToken = getTokenFromLocalStorage();
    const fetchedRole = getRoleFromLocalStorage();
    
    setToken(fetchedToken);
    setRole(fetchedRole);

    // Check if the user is authorized
    const isAuthorized = fetchedToken && (fetchedRole === "ADMIN" || fetchedRole === "MANAGER");

    if (!isAuthorized) {
      router.push("/login"); // Redirect to login page or another appropriate page
    } else {
      setLoading(false); // Stop loading once the authorization check is complete
    }
  }, [getRoleFromLocalStorage, getTokenFromLocalStorage, router]);

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
            <VehicleProvider>{children}</VehicleProvider>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}
