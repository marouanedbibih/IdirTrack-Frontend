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
import { useDeviceTypeContext } from "../contexts/DeviceTypeProvider";
import Pagination from "@/components/pagination/Pagination";
import { deleteDeviceTypeAPI } from "../services/DeviceTypeService";

export interface IDeviceTypeTableProps {}

const TABLE_HEAD = ["Type", "Total Devices", "Actions"];
export default function DeviceTypeTable(props: IDeviceTypeTableProps) {
  // DeviceType list state management
  const { DeviceTypeList, setDeviceTypeList } = useDeviceTypeContext();

  // Loading state management
  const { tableLoading, setTableLoading } = useDeviceTypeContext();

  // Pagination state management
  const { pagination, setPagination } = useDeviceTypeContext();

  // Search state management
  const { search } = useDeviceTypeContext();

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);

  // Size provider state management
  const { size, setSize } = useDeviceTypeContext();

  // Loading delete local DeviceType state management
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Message state management
  const { setMessage, message } = useDeviceTypeContext();

  // Alert state management
  const { setAlertOpen } = useDeviceTypeContext();

  // Stafe ID provider state management
  const { setDeviceTypeId, DeviceTypeId } = useDeviceTypeContext();

  // Open Modal provider state management
  const { setOpenForm } = useDeviceTypeContext();

  // Fetch DeviceType list provider state management
  const { fetchDeviceTypeList } = useDeviceTypeContext();

  // Handle open form provider state management
  const { handleOpenForm } = useDeviceTypeContext();

  // Function to handle the delete DeviceType dialog
  const handelDeleteDeviceTypeDialog = (id: number | null) => {
    if (id) {
      setDeviceTypeId(id);
    }
    setOpenDialog(!openDialog);
  };

  /**
   * Handel the update DeviceType dialog
   * @param id
   * @returns void
   */
  const handelUpdateDeviceTypeDialog = (id: number) => {
    setDeviceTypeId(id);
    setOpenForm(true);
  };

  // -------------- APIs functions --------------

  /**
   * This function is used to delete a DeviceType member by calling the deleteDeviceTypeAPI
   * and then updating the DeviceType list state
   */
  const deleteDeviceType = () => {
    if (DeviceTypeId) {
      setLoadingDelete(true);
      deleteDeviceTypeAPI(DeviceTypeId)
        .then((data) => {
          fetchDeviceTypeList(pagination.currentPage, size);
          setMessage({
            message: data.message,
            messageType: data.messageType,
          });
          setAlertOpen(true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          handelDeleteDeviceTypeDialog(null);
          setLoadingDelete(false);
        });
    }
  };

  // Use effect to fetch the DeviceType list when the page changes
  useEffect(() => {
    if (search === "") {
      fetchDeviceTypeList(pagination.currentPage, size);
    }
  }, [pagination.currentPage]);

  // Total Devices count state management
  const { totalDevicesCount, fetchTotalDevicesCount } = useDeviceTypeContext();

  // Use effect to fetch the total devices count
  React.useEffect(() => {
    fetchTotalDevicesCount();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-2/5">
      {tableLoading ? (
        <Spinner
          className="h-8 w-8"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : DeviceTypeList && DeviceTypeList.length > 0 ? (
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
                  Total Devices: {totalDevicesCount}
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
                {DeviceTypeList.map(({ id, name, totalDevices }, index) => {
                  const isLast = index === DeviceTypeList.length - 1;
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
                          {totalDevices} Devices
                        </Typography>
                      </td>
                      <td className={`${classes} flex flex-row gap-2`}>
                        <Tooltip content="Edit DeviceType">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="green"
                            onClick={(event) => {
                              handelUpdateDeviceTypeDialog(id);
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete DeviceType">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="red"
                            onClick={(event) =>
                              handelDeleteDeviceTypeDialog(id)
                            }
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
          No DeviceType Found
        </Typography>
      )}

      <Dialog
        open={openDialog}
        handler={handelDeleteDeviceTypeDialog}
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
          Are you sure you want to delete this DeviceType member? This action
          cannot be undone.
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
              onClick={() => handelDeleteDeviceTypeDialog(null)}
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
              onClick={() => deleteDeviceType()}
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
