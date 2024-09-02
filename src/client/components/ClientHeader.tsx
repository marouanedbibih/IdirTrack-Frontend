import React from "react";
import {
  AdjustmentsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { CardHeader, Typography, Button, Card } from "@material-tailwind/react";
import { SearchClient } from "./SearchClient";
import { useClientContext } from "../contexts/ClientProvider";
import { useClientFunctionsContext } from "../contexts/ClientFunctionsProvider";

interface ClientHeaderProps {}

const ClientHeader: React.FC<ClientHeaderProps> = () => {
  // Form dialog state
  const { dialog, setDialog } = useClientContext();
  // Init Client Request
  const { initClientRequest } = useClientContext();

  // Handle open form function
  const handleOpenForm = () => {
    initClientRequest();
    setDialog({ ...dialog, form: true });
  };
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="rounded-none"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div className="flex w-full shrink-0 gap-2 md:w-max justify-end flex-1">
          <SearchClient />
          <Button
            className="flex items-center gap-2"
            color="black"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            // onClick={handleOpenFilterForm}
          >
            Filter
            <AdjustmentsVerticalIcon strokeWidth={3} className="w-3 h-3" />
          </Button>
          <Button
            className="flex items-center gap-3"
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="green"
            onClick={handleOpenForm}
          >
            <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Client
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ClientHeader;
