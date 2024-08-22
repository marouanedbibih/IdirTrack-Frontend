"use client";

import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  CardBody,
  Typography,
  Chip,
  IconButton,
  Spinner,
  Card,
  Tooltip,
} from "@material-tailwind/react";
import { useSimContext } from "@/sim/context/SimProvider";
import DefaultSelect from "@/components/inputs/DefaultSelect";
import { ISim } from "@/sim/types/type";
import Pagination from "@/components/pagination/Pagination";
import DeleteConfirmationDialog from "@/components/dialog/DeleteConfirmationDialog";
import { useSimFunctionsContext } from "@/sim/context/SimFunctionsProvider";
import { deleteSimApi } from "@/sim/SimServices";
import { IMyErrorResponse, IMyResponse } from "@/operators/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";

interface SimTableBodyProps {}

// Table Head
const TABLE_HEAD = [
  "Phone",
  "CCID",
  "Operator",
  "PIN",
  "PUK",
  "Created At",
  "Status",
  "Actions",
];

// Table Sizes
const sizes = [
  { id: 5, name: "5" },
  { id: 10, name: "10" },
  { id: 20, name: "25" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];
const SimTableBody: React.FC<SimTableBodyProps> = ({}) => {
  // Function to get the status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "INSTALLED":
        return "green";
      case "NON_INSTALLED":
        return "amber";
      case "LOST":
        return "red";
      case "PENDING":
        return "gray";
      default:
        return "gray";
    }
  };

  // Import the Sim List form the SimProvider
  const { simList } = useSimContext();
  // Import Table Loading from the SimProvider
  const { tableLoading } = useSimContext();
  // Import the Pagination form the SimProvider
  const { pagination, setPagination } = useSimContext();
  // Import Sim ID from the SimProvider
  const { setSimId } = useSimContext();
  // Import Open Dialog from the SimProvider
  const { openDialog, setOpenDialog } = useSimContext();
  // Loading local state
  const [loading, setLoading] = React.useState<boolean>(false);
  // Import the Open Form from the SimProvider
  const { handleOpenForm } = useSimContext();
  // Import message from the GlobalProvider
  const { setMessage } = useGlobalContext();
  // Import the Alert Open from the GlobalProvider
  const { setAlertOpen } = useGlobalContext();
  // Import Sim ID from the SimProvider
  const { simId } = useSimContext();
  // Import the reFetchSimList function from the SimFunctionsProvider
  const { reFetchSimList } = useSimFunctionsContext();

  // Handle change function
  const onChangeSize = (key: string, value: string | number) => {
    // Convert to number if the key is "deviceTypeId"
    if (key === "size") {
      value = Number(value);
    }
    // Update the Device request state
    setPagination({ ...pagination, [key]: value });
  };

  // Handle Delete Sim
  const handleUpdateSim = (id: number) => {
    setSimId(id);
    handleOpenForm();
  };

  // Handle Open Dialog
  const handleOpenDialog = (id: number) => {
    setOpenDialog(true);
    setSimId(id);
  };
  // Handle Close Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSimId(null);
  };

  /**
   *
   * Function to delete the SIM
   * @returns Promise<void>
   */

  const onDeleteSim = async () => {
    setLoading(true);
    deleteSimApi(simId)
      .then((res: IMyResponse) => {
        setMessage({
          message: res.message,
          messageType: MessageType.INFO,
        });
        setOpenDialog(false);
        setSimId(null);
        setAlertOpen(true);
        reFetchSimList();
      })
      .catch((err: IMyErrorResponse) => {
        console.error("Error deleting SIM", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {tableLoading ? (
        <Spinner
          className="h-8 w-8"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : simList && simList !== null ? (
        <Card
          className="h-full w-full rounded-t-none"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="px-4 w-60">
            <DefaultSelect
              label="Select Size"
              value={pagination.size.toString()}
              onChange={(val) => onChangeSize("size", val)}
              options={sizes}
              loading={false}
              smallMessage="Select the Size of the table"
              className="w-60"
            />
          </div>
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
                {simList.map((sim: ISim, index) => {
                  const isLast = index === simList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={sim.id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {sim.phone}
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
                          {sim.ccid}
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
                          {sim.operatorName}
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
                          {sim.pin}
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
                          {sim.puk}
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
                          {sim.createdAt}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            value={sim.status}
                            color={getStatusColor(sim.status)}
                          />
                        </div>
                      </td>
                      <td className={`${classes} flex flex-row gap-2`}>
                        <Tooltip content="Edit Device">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="green"
                            onClick={(event) => handleUpdateSim(sim.id)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Device">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="red"
                            onClick={(event) => handleOpenDialog(sim.id)}
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
          </CardBody>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => {
              setPagination({ ...pagination, currentPage: page });
            }}
          />
        </Card>
      ) : (
        <Typography
          color="gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          No Sim Found
        </Typography>
      )}
      <DeleteConfirmationDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleConfirm={onDeleteSim}
        message="Are you sure you want to delete this Sim?"
        loading={loading}
      />
    </div>
  );
};

export default SimTableBody;
