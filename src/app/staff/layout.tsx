"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Adjust the import path as needed
import { StaffProvider } from "@/staff/StaffProvider";
import { Spinner } from "@material-tailwind/react";
import { SideBar } from "@/components/sidebar/SideBar";
import { DefaultNavbar } from "@/components/navbar/DefaultNavbar";

export default function StaffLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { getRoleFromLocalStorage, getTokenFromLocalStorage } =
    useGlobalContext(); // Access context
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
    const isAuthorized =
      fetchedToken && (fetchedRole === "ADMIN" || fetchedRole === "MANAGER");

    if (!isAuthorized) {
      router.push("/login"); // Redirect to login page or another appropriate page
    } else {
      setLoading(false); // Stop loading once the authorization check is complete
    }
  }, [getRoleFromLocalStorage, getTokenFromLocalStorage, router]);

  // Show a loading state while checking authorization
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen min-w-full">
        <Spinner
          className="w-16 h-16"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen py-4 pl-4 bg-blue-gray-50 w-full">
      <SideBar />
      <main className="flex-1 ml-[20rem] px-16 gap-8">
        <div className="mb-8 w-full">
          <DefaultNavbar />
        </div>
        <StaffProvider>{children}</StaffProvider>
      </main>
    </div>
  );
}
