import { useDeviceFunctionsContext } from "@/device/contexts/DeviceFunctionsProvider";
import { useDeviceContext } from "@/device/contexts/DeviceProvider";
import { searchDevicesAPI } from "@/device/services/DeviceService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import * as React from "react";

export interface IDeviceSearchProps {}

export default function DeviceSearch(props: IDeviceSearchProps) {
  // Loading state management
  const { setTableLoading } = useDeviceContext();
  // Device list state management
  const { setDevicesList } = useDeviceContext();
  // Pagination state management
  const { setPagination, pagination } = useDeviceContext();
  // Search state management
  const { searchTerm, setSearchTerm } = useDeviceContext();
  // Display status state management
  const { setDisplayStatus, displayStatus } = useDeviceContext();
  // Reset Device Filter
  const { resetDeviceFilter } = useDeviceContext();
  // On Change Display Status
  const { onChangeDisplayStatus } = useDeviceContext();

  // OnSearch
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (displayStatus.filter == true) {
      resetDeviceFilter();
    }
    onChangeDisplayStatus("search");
    setDevicesList([]);
    setTableLoading(true);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full md:w-72">
      <Input
        label="Search"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e);
        }}
      />
    </div>
  );
}
