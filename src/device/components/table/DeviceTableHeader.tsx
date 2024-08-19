import * as React from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useDeviceContext } from "@/device/contexts/DeviceProvider";
import DeviceSearch from "../form/DeviceSearch";
import DeviceFilter from "../form/DeviceFilter";
import DefaultSelect from "@/components/inputs/DefaultSelect";

export interface IDeviceTableHeaderProps {}



export default function DeviceTableHeader(props: IDeviceTableHeaderProps) {


  // Device list state management
  const { setDevicesList } = useDeviceContext();
  // Pagination state management
  const { setPagination, pagination } = useDeviceContext();
  // Search state management
  const { searchTerm, setSearchTerm } = useDeviceContext();
  // Loading state management
  const { tableLoading, setTableLoading } = useDeviceContext();
  // Handel open form
  const { handleOpenForm } = useDeviceContext();
  // Open Filter Form provider state
  const { openFilterForm, handleOpenFilterForm } = useDeviceContext();


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
            <DeviceSearch />
            <Button
              className="flex items-center gap-2"
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={handleOpenFilterForm}
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
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Device
            </Button>
          </div>
        </div>
        <DeviceFilter />
      </CardHeader>
    </Card>
  );
}
