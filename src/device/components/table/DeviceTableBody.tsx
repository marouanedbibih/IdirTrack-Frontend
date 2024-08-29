/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { DeviceInterface } from "@/device/DeviceTypeScript";
import { useDeviceContext } from "@/device/contexts/DeviceProvider";
import { EyeIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/pagination/Pagination";
import { deleteDeviceAPI } from "@/device/services/DeviceService";
import DefaultSelect from "@/components/inputs/DefaultSelect";

interface DeviceTableBodyProps {}
const TABLE_HEAD = [
  "IMEI",
  "Type",
  "Created At",
  "Status",
  "Remarque",
  "Actions",
];

const sizes = [
  { id: 5, name: "5" },
  { id: 10, name: "10" },
  { id: 20, name: "25" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

const DeviceTableBody: React.FC<DeviceTableBodyProps> = ({}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "INSTALLED":
        return "green";
      case "NON_INSTALLED":
        return "amber";
      case "LOST":
        return "red";
      case "PENDING":
        return "blue-gray";
      default:
        return "blue-gray";
    }
  };

  // Table loading provider state
  const { tableLoading, setTableLoading } = useDeviceContext();

  // Pagination provider state
  const { pagination, setPagination } = useDeviceContext();

  // Fetch Device list provider function
  const { devicesList, setDevicesList } = useDeviceContext();

  // Display status provider state
  const { setDisplayStatus, displayStatus } = useDeviceContext();

  // // OnFetch Device list
  // const onFetch = () => {
  //   setDevicesList([]);
  //   setDisplayStatus({
  //     filter: false,
  //     search: false,
  //     normal: true,
  //   });
  //   setTableLoading(true);
  // };

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);

  // Loading delete local Device state management
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Message state management
  const { setMessage, message } = useDeviceContext();

  // Alert state management
  const { setAlertOpen } = useDeviceContext();

  // Stafe ID provider state management
  const { setDeviceId, deviceId } = useDeviceContext();

  // Open Modal provider state management
  const { setOpenForm } = useDeviceContext();
  // Function to handle the delete Device dialog
  const handelDeleteDeviceDialog = (id: number | null) => {
    if (id) {
      setDeviceId(id);
    }
    setOpenDialog(!openDialog);
  };

  /**
   * Handel the update Device dialog
   * @param id
   * @returns void
   */
  const handelUpdateDeviceDialog = (id: number) => {
    setDeviceId(id);
    setOpenForm(true);
  };

  // -------------- APIs functions --------------

  /**
   * This function is used to delete a Device member by calling the deleteDeviceAPI
   * and then updating the Device list state
   */
  const deleteDevice = () => {
    if (deviceId) {
      setLoadingDelete(true);
      deleteDeviceAPI(deviceId)
        .then((data) => {
          // Update the Display status
          setDisplayStatus({
            filter: false,
            search: false,
            normal: true,
          });
          // Update the pagination
          setPagination({ ...pagination, currentPage: 1 });
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
          handelDeleteDeviceDialog(null);
          setLoadingDelete(false);
        });
    }
  };

  // Select Loading local state management
  const [selectLoading, setSelectLoading] = React.useState<boolean>(false);

  // Handle change function
  const handleChange = (key: string, value: string | number) => {
    // Convert to number if the key is "deviceTypeId"
    if (key === "size") {
      value = Number(value);
    }
    // Update the Device request state
    setPagination({ ...pagination, [key]: value });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {tableLoading ? (
        <Spinner
          className="h-8 w-8"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : devicesList && devicesList.length > 0 ? (
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
              onChange={(val) => handleChange("size", val)}
              options={sizes}
              loading={selectLoading}
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
                {devicesList.map(
                  (
                    { id, imei, deviceType, createAt, status, remarque },
                    index
                  ) => {
                    const isLast = index === devicesList.length - 1;
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
                            {imei}
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
                            {deviceType}
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
                            {createAt}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              value={status}
                              color={getStatusColor(status)}
                            />
                          </div>
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
                            {remarque}
                          </Typography>
                        </td>
                        <td className={`${classes} flex flex-row gap-2`}>
                          <Tooltip content="Edit Device">
                            <IconButton
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                              color="green"
                              onClick={(event) => {
                                handelUpdateDeviceDialog(id);
                              }}
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
                              onClick={(event) => handelDeleteDeviceDialog(id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
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
          No Device Found
        </Typography>
      )}

      <Dialog
        open={openDialog}
        handler={handelDeleteDeviceDialog}
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
          Are you sure you want to delete this Device ? This action cannot be
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
              onClick={() => handelDeleteDeviceDialog(null)}
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
              onClick={() => deleteDevice()}
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
};

export default DeviceTableBody;
