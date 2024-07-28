"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import {
  Typography,
  CardBody,
  IconButton,
} from "@material-tailwind/react";

import { Vehicle } from "@/vehicle/types/VehicleDto";
// import { DeviceInterface } from "@/device/DeviceTypeScript";
// import { Sim } from "@/sim/SimDTOs";
// import { useSimContext } from "@/sim/SimProvider";

interface VehicleTableBodyProps {
  tableHead: string[];
  tableRows: Vehicle[];
}

const VehicleTableBody: React.FC<VehicleTableBodyProps> = ({
  tableHead,
  tableRows,
}) => {
  // const { simId, setSimId, deleteSim, setIsCreateSimModalOpen } =
  //   useSimContext();

  const handleDeleteVehicle = (
    id: number | null,
    ev: React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault();
    // deleteSim(id);
    console.log("Delete vehicle", id);
  };

  const handleEditVehicle = (
    id: number | null,
    ev: React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault();
    console.log("Edit vehicle", id);
    // setSimId(id);
    // setIsCreateSimModalOpen(true);
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
          {tableRows.map((row: Vehicle, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const classesActions = isLast
              ? "p-4 flex flex-row gap-2"
              : "p-4 border-b border-blue-gray-50 flex flex-row gap-2";

            return (
              <tr key={row.id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {row.matricule}
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
                    {row.client?.name}
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
                    {row.type}
                  </Typography>
                </td>
                <td className={classesActions}>
                  <IconButton
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="blue"
                    onClick={(ev) => handleEditVehicle(row.id, ev)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="red"
                    onClick={(ev) => handleDeleteVehicle(row.id, ev)}
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

export default VehicleTableBody;
