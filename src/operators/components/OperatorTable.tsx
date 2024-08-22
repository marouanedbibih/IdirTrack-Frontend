/* eslint-disable react-hooks/exhaustive-deps */
import {
  EyeIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Pagination from "@/components/pagination/Pagination";
import { useOperatorContext } from "../context/OperatorProvider";
import { deleteOperatorAPI } from "../OperatorService";
import { getTotalDevicesCountAPI } from "@/device/services/DeviceService";
import { getTotalSimCountAPI } from "@/sim/SimServices";

export interface IOperatorTableProps {}

const TABLE_HEAD = ["Operator", "Total Sims", "Actions"];
export default function OperatorTable(props: IOperatorTableProps) {
  // Operator list state management
  const { operatorsList, setOperatorsList } = useOperatorContext();

  // Loading state management
  const { tableLoading, setTableLoading } = useOperatorContext();

  // Pagination state management
  const { pagination, setPagination } = useOperatorContext();

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);

  // Loading delete local Operator state management
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Message state management
  const { setMessage, message } = useOperatorContext();

  // Alert state management
  const { setAlertOpen } = useOperatorContext();

  // Stafe ID provider state management
  const { setOperatorId, operatorId } = useOperatorContext();

  // Open Modal provider state management
  const { setOpenForm } = useOperatorContext();

  // Fetch Operator list provider state management
  const { fetchOperatorsList } = useOperatorContext();
  // Total Sims state
  const [totalSimsCount, setTotalSimsCount] = useState<number>(0);

  // Handle open form provider state management
  const { handleOpenForm } = useOperatorContext();

  // Function to handle the delete Operator dialog
  const handelDeleteOperatorDialog = (id: number | null) => {
    if (id) {
      setOperatorId(id);
    }
    setOpenDialog(!openDialog);
  };

  /**
   * Handel the update Operator dialog
   * @param id
   * @returns void
   */
  const handelUpdateOperatorDialog = (id: number) => {
    setOperatorId(id);
    setOpenForm(true);
  };

  // -------------- APIs functions --------------

  /**
   * This function is used to delete a Operator member by calling the deleteOperatorAPI
   * and then updating the Operator list state
   */
  const deleteOperator = () => {
    if (operatorId) {
      setLoadingDelete(true);
      deleteOperatorAPI(operatorId)
        .then((response) => {
          fetchOperatorsList(pagination.currentPage, pagination.size);
          setMessage({
            message: response.message,
            messageType: response.messageType,
          });
          setAlertOpen(true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          handelDeleteOperatorDialog(null);
          setLoadingDelete(false);
        });
    }
  };

  // Get Total Sims count
  const fetchTotalSimsCount = () => {
    getTotalSimCountAPI()
      .then((res) => {
        setTotalSimsCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Use Effect for fetch total Sims count
  useEffect(() => {
    fetchTotalSimsCount();
  }, []);

  // Use Effect for display operators list
  React.useEffect(() => {
    fetchOperatorsList(pagination.currentPage, pagination.size);
  }, [pagination.currentPage, pagination.size]);

  return (
    <div className="flex flex-col justify-center items-center w-2/5">
      {tableLoading ? (
        <Spinner
          className="h-8 w-8"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : operatorsList ? (
        <Card
          className="h-full w-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Total Sim {totalSimsCount}
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                  onClick={handleOpenForm}
                >
                  <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New
                </Button>
              </div>
            </div>
          </CardHeader>
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
                {operatorsList.map(({ id, name, totalSims }, index) => {
                  const isLast = index === operatorsList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {name}
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
                          {totalSims} Sims
                        </Typography>
                      </td>
                      <td className={`${classes} flex flex-row gap-2`}>
                        <Tooltip content="Edit Operator">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="green"
                            onClick={(event) => {
                              handelUpdateOperatorDialog(id);
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Operator">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="red"
                            onClick={(event) => handelDeleteOperatorDialog(id)}
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
            onPageChange={(page) =>
              setPagination({ ...pagination, currentPage: page })
            }
          />
        </Card>
      ) : (
        <Typography
          color="gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          No Operator Found
        </Typography>
      )}

      <Dialog
        open={openDialog}
        handler={handelDeleteOperatorDialog}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Confirm Deletion
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Are you sure you want to delete this Operator? This action cannot be
          undone.
        </DialogBody>
        {loadingDelete ? (
          <div className="flex flex-1 justify-center items-center p-4">
            <Spinner
              className="h-8 w-8"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
        ) : (
          <DialogFooter
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              variant="text"
              color="red"
              onClick={() => handelDeleteOperatorDialog(null)}
              className="mr-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => deleteOperator()}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        )}
      </Dialog>
    </div>
  );
}
