"use client";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import DeviceTableHeader from "./table/DeviceTableHeader";
import { useDeviceContext } from "../contexts/DeviceProvider";
import { useEffect } from "react";
import DeviceTableBody from "./table/DeviceTableBody";
import DeviceTableFooter from "./table/DeviceTableFooter";
import DeviceTableFilter from "./table/DeviceTableFilter";
import { searchDeviceApi } from "../DeviceService";

const tableHead = ["IMEI", "Device Type", "Created At", "Status", "Actions"];

export function DeviceTable() {
  const { setSearchTerm,fetchSearchDevice,fetchDeviceList, devicesList, pagination, setCurrentPage } =
    useDeviceContext();

  useEffect(() => {
    fetchDeviceList(pagination.currentPage, 5);
  }, [pagination.currentPage]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DeviceTableHeader
          title="Device List"
          subtitle="Here is a list of all devices"
          onSearch={(event) => {
            setSearchTerm(event.target.value);
            fetchSearchDevice(event.target.value,1,5);
          }
          }
          onDownload={() => console.log("Download")}
        />
        <DeviceTableFilter  />
        <DeviceTableBody tableRows={devicesList} tableHead={tableHead} />
        <DeviceTableFooter
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Card>
    </div>
  );
}
