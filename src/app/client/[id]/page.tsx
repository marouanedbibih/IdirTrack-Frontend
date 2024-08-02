"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import ClientCard from "@/components/Client/ClientCard";

export interface IClientByIdProps {}

const ClientById: React.FC<IClientByIdProps> = (props) => {
  const params = useParams();
  const id: number = parseInt(params.id as string);

  return (
    <div>
      <ClientCard />
    </div>
  );
};

export default ClientById;
