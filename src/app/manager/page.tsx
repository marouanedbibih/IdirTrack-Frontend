"use client";
import React from "react";

import ManagerTable from "@/manager/components/ManagerTable";
import ManagerForm from "@/manager/components/ManagerForm";
import ManagerHeader from "@/manager/components/ManagerHeader";

const StaffPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <ManagerHeader />
      <ManagerTable />
      <ManagerForm />
    </div>
  );
};

export default StaffPage;
