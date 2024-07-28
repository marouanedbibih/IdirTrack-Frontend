"use client";
import { SimForm } from "@/sim/components/SimForm";
import { SimTable } from "@/sim/components/SimTable";
import { useSimContext } from "@/sim/SimProvider";
import React, { useEffect } from "react";

const SimHome: React.FC = () => {
  const { simList, fetchSimList,isCreateSimModalOpen } = useSimContext();

  useEffect(() => {
    fetchSimList(1, 5);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4 ">
      <h1>Sim Home Page</h1>
      <p>This is a simple page to show how to use the device context.</p>
      <SimTable />
      {isCreateSimModalOpen && <SimForm />}
    </div>
  );
};

export default SimHome;
