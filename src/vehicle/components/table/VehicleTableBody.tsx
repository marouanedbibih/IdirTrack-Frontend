import React, { useEffect } from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { CardBody, Typography, IconButton, Card, Button } from "@material-tailwind/react";
import { Car } from "../Car";
import { useVehicleContext } from "@/vehicle/contexts/VehicleProvider";

const TABLE_HEAD = ["MATRICULE", "CLIENT", "COMPANY", "TYPE", "ACTIONS"];

export function VehicleTableBody({ className }: { className?: string }) {
  const { vehiclesList, fetchVehiclesList, vehiclePagination, setCurrentPage } = useVehicleContext();

  useEffect(() => {
    fetchVehiclesList(vehiclePagination.currentPage, 5); // Fetch 5 vehicles per page
  }, [vehiclePagination.currentPage]);

  const handlePreviousPage = () => {
    if (vehiclePagination.currentPage > 1) {
      setCurrentPage(vehiclePagination.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (vehiclePagination.currentPage < vehiclePagination.totalPages) {
      setCurrentPage(vehiclePagination.currentPage + 1);
    }
  };

  return (
    <Card className="h-full w-1/2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardBody className={`px-0 ${className}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-white p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehiclesList.map(({ vehicle, client }, index) => {
              const isLast = index === vehiclesList.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {vehicle.matricule}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {client.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {client.company}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {vehicle.type}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-2">
                      <IconButton variant="text" className="h-6 w-6 text-science-blue-800"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                      <IconButton variant="text" className="h-6 w-6 text-green-700"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                      <IconButton variant="text" className="h-6 w-6 text-red-700"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
