"use client";
import StaffForm from "@/staff/components/StaffForm";
import StaffHeader from "@/staff/components/StaffHeader";
import StaffTable from "@/staff/components/StaffTable";
import React from "react";


const StaffPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pt-8">
      <StaffHeader />
      <StaffTable />
      <StaffForm />
    </div>
  );
};

export default StaffPage;
