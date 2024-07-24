"use client";
import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
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

                <td className={classes}>
                  <Tooltip title="Edit User">
                    <IconButton
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
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
