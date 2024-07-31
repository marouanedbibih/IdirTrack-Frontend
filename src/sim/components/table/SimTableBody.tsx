"use client";

import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  CardBody,
  Typography,
  Chip,
  IconButton,
} from "@material-tailwind/react";
import { Sim } from "@/sim/SimDTOs";
import { useSimContext } from "@/sim/SimProvider";

interface SimTableBodyProps {
  tableHead: string[];
  tableRows: Sim[];
}

const SimTableBody: React.FC<SimTableBodyProps> = ({ tableHead, tableRows }) => {
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

  const { setSimId, deleteSim, setIsCreateSimModalOpen } = useSimContext();

  const handleDeleteSim = (id: number | null, ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    deleteSim(id);
  };

  const handleEditSim = (id: number | null, ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    setSimId(id);
    setIsCreateSimModalOpen(true);
  };

  return (
    <CardBody className="overflow-scroll px-0">
      {tableRows.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            No Devices Found
          </Typography>
        </div>
      ) : (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
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
              const classesActions = isLast ? "p-4 flex flex-row gap-2" : "p-4 border-b border-blue-gray-50 flex flex-row gap-2";

              return (
                <tr key={row.id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {row.phone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {row.operatorName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {row.ccid}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {row.pin}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {row.puk}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {row.createdAt?.toString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip variant="ghost" value={row.status} color={getStatusColor(row.status?.toUpperCase() ?? "PENDING")} />
                    </div>
                  </td>
                  <td className={classesActions}>
                    <IconButton color="blue" onClick={(ev) => handleEditSim(row.id, ev)}>
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                    <IconButton color="red" onClick={(ev) => handleDeleteSim(row.id, ev)}>
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </CardBody>
  );
};

export default SimTableBody;
