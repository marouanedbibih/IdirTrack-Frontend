import React from "react";
import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  CardHeader,
  Typography,
  Button,
  Input,
  Card,
} from "@material-tailwind/react";
import { useSimContext } from "@/sim/context/SimProvider";
import SimSearch from "../form/SimSearch";

interface SimTableHeaderProps {
 
}

const SimTableHeader: React.FC<SimTableHeaderProps> = ({

}) => {

  // Import the handleOpenForm from the SimProvider
  const { handleOpenForm } = useSimContext();

  return (
    <Card
      className="h-full w-full rounded-b-none "
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
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
            {/* Sim Search */}
            <SimSearch />
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
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Sim
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SimTableHeader;