"use client";
import OperatorForm from "@/operators/components/OperatorForm";
import OperatorTable from "@/operators/components/OperatorTable";
import { OperatorProvider } from "@/operators/context/OperatorProvider";
import SimForm from "@/sim/components/form/SimForm";
import SimStatistiques from "@/sim/components/SimStatistiques";
import { SimTable } from "@/sim/components/SimTable";
import { SimFunctionsProvider } from "@/sim/context/SimFunctionsProvider";
import { SimProvider, useSimContext } from "@/sim/context/SimProvider";
import React, { useEffect } from "react";

const SimHome: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto  gap-4 ">
      <OperatorProvider>
        <div className="flex flex-row justify-between items-start w-full">
          <OperatorTable />
          <SimStatistiques />
          <OperatorForm />
        </div>
        <SimProvider>
          <SimFunctionsProvider>
            <SimTable />
            <SimForm />
          </SimFunctionsProvider>
        </SimProvider>
      </OperatorProvider>
    </div>
  );
};

export default SimHome;
