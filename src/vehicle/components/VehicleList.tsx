"use client";

import { IDisplayStatus, IMyErrResponse, IPagination } from "@/types";
import { VehicleTable } from "@/vehicle/components/VehicleTable";
import useVehicle from "@/vehicle/hooks/useVehicle";
import { Card } from "@material-tailwind/react";
import React from "react";
import { VehicleTableHeader } from "./VehicleTableHeader";
import Pagination from "@/components/pagination/Pagination";
import { deleteVehicleAPI } from "../services/VehicleService";
import { IMyResponse } from "@/operators/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";
import { DeleteVehicle } from "./DeleteVehicle";

const VehicleList: React.FC = () => {
  // Message global state
  const { setMessage: setGlobalMessage, message: globalMessage } =
    useGlobalContext();
  // Satates
  const [search, setSearch] = React.useState<string>("");
  const [pagination, setPagination] = React.useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    size: 5,
  });
  const [displayStatus, setDisplayStatus] = React.useState<IDisplayStatus>({
    normal: true,
    filter: false,
    search: false,
  });

  // useVehicle hook
  const { data, loading, error, message } = useVehicle({
    displayStatus,
    search,
    pagination,
  });

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      setDisplayStatus({
        normal: true,
        filter: false,
        search: false,
      });
    } else {
      setDisplayStatus({
        normal: false,
        filter: false,
        search: true,
      });
    }
  };

  // Delete Vehicle
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const handleDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const onDelete = (isLost: boolean) => {
    setDeleteLoading(true);
    if (deleteId) {
      deleteVehicleAPI(deleteId, isLost)
        .then((res: IMyResponse) => {
          setDeleteLoading(false);
          setIsDeleteDialogOpen(false);
          setGlobalMessage({
            message: res.message,
            messageType: MessageType.INFO,
          });
          setDisplayStatus({
            normal: true,
            filter: false,
            search: false,
          });
          setPagination({ ...pagination, currentPage: 1 });
          setIsDeleteDialogOpen(false);
        })
        .catch((err: IMyErrResponse) => {
          setDeleteLoading(false);
          setIsDeleteDialogOpen(false);
          setGlobalMessage({
            message: err.message,
            messageType: MessageType.ERROR,
          });
        })
        .finally(() => {
          setDeleteId(null);
          setDeleteLoading(false);
        });
    }
  };

  return (
    <div>
      <Card
        className="h-full w-full p-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <VehicleTableHeader
          onSearch={onSearch}
          searchTerm={search}
          total={100}
        />
        <VehicleTable
          data={data}
          loading={loading}
          error={error}
          message={message}
          onDelete={handleDeleteDialog}
          onUpdate={() => {}}
          onView={() => {}}
        />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) =>
            setPagination({ ...pagination, currentPage: page })
          }
        />
      </Card>

      <DeleteVehicle
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        loading={deleteLoading}
        onDelete={onDelete}
      />
    </div>
  );
};

export default VehicleList;
