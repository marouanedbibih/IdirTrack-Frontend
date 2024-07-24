"use client";
import React from "react";
import { PencilIcon,TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
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
import { DeviceInterface } from "@/device/DeviceTypeScript";
import { useDeviceContext } from "@/device/contexts/DeviceProvider";

interface DeviceTableBodyProps {
  tableHead: string[];
  tableRows: DeviceInterface[];
}

const DeviceTableBody: React.FC<DeviceTableBodyProps> = ({
  tableHead,
  tableRows,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "INSTALLED":
        return "green";
      case "NON_INSTALLED":
        return "amber";
      case "LOST":
        return "red";
      case "DAMAGED":
        return "red";
      default:
        return "gray";
    }
  };

  const { deleteDevice } = useDeviceContext();

  const handleDeleteDevice = (id: number, ev) => {
    ev.preventDefault();
    deleteDevice(id);
  };

  return (
    <CardBody
      className="overflow-scroll px-0"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row: DeviceInterface, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const classesActions = isLast ? "p-4 flex flex-row gap-2" : "p-4 border-b border-blue-gray-50 flex flex-row gap-2";

            return (
              <tr key={row.id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {row.imei}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {row.deviceType}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row.createAt}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      value={row.status}
                      color={getStatusColor(row.status)}
                    />
                  </div>
                </td>

                <td className={classesActions}>
                  <IconButton
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="blue"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="red"
                    onClick={(ev) => handleDeleteDevice(row.id, ev)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </CardBody>
  );
};

export default DeviceTableBody;
