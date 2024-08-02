"use client";
import React from "react";

import { Typography } from "@material-tailwind/react";
import StaffTable from "@/components/Staff/StaffTable";
import { DefaultPagination } from "@/components/pagination/DefaultPagination";
import StaffHeader from "@/components/Staff/StaffHeader";

const StaffPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <StaffHeader />
      <StaffTable />
    </div>
  );
};

export default StaffPage;
