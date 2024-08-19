import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import * as React from "react";

export interface IDeviceTypeSearchProps {}

export default function DeviceTypeSearch(props: IDeviceTypeSearchProps) {
    // Search local state
    const [search, setSearch] = React.useState<string>("");

    // Device List provider state

    // On search 
  return (
    <div>
      <Input
        label="Search"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        // onChange={onSearch}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
}
