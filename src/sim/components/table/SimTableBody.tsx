"use client";
import React, { use } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import { Sim } from "@/sim/SimDTOs";
import { useSimContext } from "@/sim/SimProvider";

interface SimTableBodyProps {
  tableHead: string[];
  tableRows: Sim[];
}

const SimTableBody: React.FC<SimTableBodyProps> = ({
  tableHead,
  tableRows,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
        return "green";
      case "OFFLINE":
        return "amber";
      case "LOST":
        return "red";
      case "PENDING":
        return "gray";
      default:
        return "gray";
    }
  };

  const { simId, setSimId, deleteSim, setIsCreateSimModalOpen } =
    useSimContext();

  const handleDeleteSim = (
    id: number | null,
    ev: React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault();
    deleteSim(id);
  };

  const handleEditSim = (
    id: number | null,
    ev: React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault();
    console.log("Edit device", id);
    setSimId(id);
    setIsCreateSimModalOpen(true);
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
          {tableRows.map((row: Sim, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const classesActions = isLast
              ? "p-4 flex flex-row gap-2"
              : "p-4 border-b border-blue-gray-50 flex flex-row gap-2";

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
                      <div>
                        <p>Phone: {row.phone}</p>
                        <p>CCID: {row.ccid}</p>
                      </div>
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
                    {row.operatorName}
                  </Typography>
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
                    {row.createdAt?.toString()}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      value={row.status}
                      color={getStatusColor(
                        row.status?.toUpperCase() ?? "PENDING"
                      )}
                    />
                  </div>
                </td>

                <td className={classesActions}>
                  <IconButton
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="blue"
                    onClick={(ev) => handleEditSim(row.id, ev)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="red"
                    onClick={(ev) => handleDeleteSim(row.id, ev)}
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

export default SimTableBody;
