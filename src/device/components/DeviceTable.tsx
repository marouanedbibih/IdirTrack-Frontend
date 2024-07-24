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
import { DeviceForm } from "./DeviceForm";

const tableHead = ["IMEI", "Device Type", "Created At", "Status", "Actions"];

export function DeviceTable() {
  const { fetchDeviceList, devicesList, pagination, setCurrentPage } =
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
          onSearch={(event) => console.log(event.target.value)}
          onDownload={() => console.log("Download")}
        />
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
