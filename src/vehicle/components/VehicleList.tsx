// @ts-nocheck
import { DefaultTable } from "@/components/table/DefaultTable";
import React, { use, useEffect, useState } from "react";
import { useVehicleContext } from "../contexts/VehicleProvider";
import Pagination from "@/components/pagination/Pagination";
import { TableData } from "@/components/table/TableData";

const TABLE_HEAD = ["Matricule", "Client", "Type"];

function VehicleList() {
  const { vehiclesList, fetchVehiclesList, vehiclePagination, setCurrentPage,fetchVehicleById,vehicleDetails } =
    useVehicleContext();

  const handleEdit = (id: number) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete", id);
  };

  const handleView = (id: number) => {
    fetchVehicleById(id);

    console.log("View Vehicle", id);
    console.log("Selected Vehicle", vehicleDetails);
  };

  useEffect(() => {

    fetchVehiclesList(vehiclePagination.currentPage, 5);
  }, []);


  return (
    <div className="p-4 ">
      <DefaultTable
        headers={TABLE_HEAD}
        rows={vehiclesList.map((vehicleDetails) => ({
          id: vehicleDetails.vehicle.id || 0,
          Matricule: vehicleDetails.vehicle.matricule,
          Client: vehicleDetails.client.name,
          Type: vehicleDetails.vehicle.type,
        }))}
        actions={{
          onEdit: handleEdit,
          onDelete: handleDelete,
          onView: handleView,
        }}
      />
      <Pagination
        currentPage={vehiclePagination.currentPage}
        totalPages={vehiclePagination.totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default VehicleList;
