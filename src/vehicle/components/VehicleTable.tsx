"use client";

import {
  CardBody,
  IconButton,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IVehicle, OBJVehicle } from "../VehicleTypes";

interface IVehicleTableProps {
  data: OBJVehicle[] | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
  onView: (id: number) => void;
}

const TABLE_HEAD = ["Matricule", "Client", "Company", "Type", "Actions"];

export const VehicleTable: React.FC<IVehicleTableProps> = ({
  data,
  loading,
  error,
  message,
  onDelete,
  onUpdate,
}: IVehicleTableProps) => {
  return (
    <CardBody
      className="px-0"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {loading && (
        <div className="flex justify-center items-center p-4">
          <Spinner
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center p-4">
          <Typography
            variant="small"
            color="red"
            className="font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {error}
          </Typography>
        </div>
      )}
      {data === null ? (
        <div className="flex justify-center items-center p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {message}
          </Typography>
        </div>
      ) : (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
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
            {data.map(({ client,vehicle }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={vehicle.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {vehicle.matricule}
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
                      {vehicle.type}
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
                      {client.name}
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
                      {client.company}
                    </Typography>
                  </td>
                  <td className={`${classes} flex flex-row gap-2`}>
                    <Tooltip content="Edit Vehicle">
                      <IconButton
                        color="green"
                        onClick={() => onUpdate(vehicle.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Vehicle">
                      <IconButton
                        color="red"
                        onClick={() => onDelete(vehicle.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
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
