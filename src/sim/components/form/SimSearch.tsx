import { useSimContext } from "@/sim/context/SimProvider";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import * as React from "react";

export interface ISimSearchProps {}

export default function SimSearch(props: ISimSearchProps) {
  // Loading state management
  const { setTableLoading } = useSimContext();
  // Device list state management
  const { setSimList } = useSimContext();
  // Pagination state management
  const { setPagination, pagination } = useSimContext();
  // Search state management
  const { searchTerm, setSearchTerm } = useSimContext();
  // Display status state management
  const { setDisplayStatus, displayStatus } = useSimContext();
  // Reset Device Filter
//   const { resetDeviceFilter } = useSimContext();
  // On Change Display Status
  const { onChangeDisplayStatus } = useSimContext();

  // OnSearch
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (displayStatus.filter == true) {
    //   resetDeviceFilter();
    }
    onChangeDisplayStatus("search");
    setSimList(null);
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
        onChange={(e) => onSearch(e)}
      />
    </div>
  );
}
