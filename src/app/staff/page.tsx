"use client";
import React from "react";

import { Typography } from "@material-tailwind/react";
import StaffTable from "@/components/Staff/StaffTable";

const StaffPage: React.FC = () => {
  return (
    <div>
      <Typography
        color="gray"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Liste des Staff
        <StaffTable />
      </Typography>
    </div>
  );
};

export default StaffPage;
