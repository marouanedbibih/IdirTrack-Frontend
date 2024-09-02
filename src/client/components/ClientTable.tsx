"use client";

import React from "react";
import {
  CardBody,
  Spinner,
  Typography,
  Chip,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { IClientTableDTO } from "../types/type";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; // Example import, adjust as necessary
import { SmallTextTable } from "@/components/text/SmallTextTable";
import Pagination from "@/components/pagination/Pagination";
import DeleteConfirmationDialog from "@/components/dialog/DeleteConfirmationDialog";
import { useClientContext } from "../contexts/ClientProvider";
import { useDeleteClient } from "../hooks/ClientHooks";

interface ClientTableProps {}

const TABLE_HEAD = [
  "Infos",
  "Contact",
  "CNE",
  "Company",
  "Category",
  "Total Devices",
  "Account",
  "Actions",
];

export const ClientTable: React.FC<ClientTableProps> = () => {
  // Basics states
  const { data } = useClientContext();
  const { loading } = useClientContext();
  const { pagination, setPagination } = useClientContext();
  const { IIDs, setIIDs } = useClientContext();
  const { dialog, setDialog } = useClientContext();

  // Hook to delete client
  const { deleteClient } = useDeleteClient();

  // Handle update client
  const handleUpdateClient = (id: number) => {
    setIIDs({ ...IIDs, update: id });
    setDialog({ ...dialog, form: true });
  };

  // Handle delete dialog
  const handleDeleteDialog = (id: number) => {
    setIIDs({ ...IIDs, delete: id });
    setDialog({ ...dialog, delete: true });
  };

  return (
    <CardBody
      className="px-0"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
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
          {loading.table ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <div className="w-full flex flex-1 justify-center items-center">
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            // @ts-ignore
            data.map((client: IClientTableDTO) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={client.clientId}>
                  <td className={classes}>
                    <div className="">
                      <SmallTextTable text={client.name} />
                      <SmallTextTable text={client.username} />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="">
                      <SmallTextTable text={client.email} />
                      <SmallTextTable text={client.phone} />
                    </div>
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.cne} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.company} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.categoryName} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.totalVehicles.toString()} />
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        value={client.isDisabled ? "Disabled" : "Active"}
                        color={client.isDisabled ? "red" : "green"}
                      />
                    </div>
                  </td>
                  <td className={`${classes} flex flex-row gap-2`}>
                    <Tooltip content="Edit Client">
                      <IconButton
                        color="green"
                        onClick={() => handleUpdateClient(client.clientId)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Client">
                      <IconButton
                        color="red"
                        onClick={() => handleDeleteDialog(client.clientId)}
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
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onPageChange={(page) => {
          // Handle page change logic
          setPagination({ ...pagination, currentPage: page });
        }}
      />
      <DeleteConfirmationDialog
        open={dialog.delete}
        handleClose={() => setDialog({ ...dialog, delete: false })}
        handleConfirm={() => {
          deleteClient(IIDs.delete!);
        }}
        loading={loading.delete}
        message="Are you sure you want to delete this client?"
      />
    </CardBody>
  );
};
