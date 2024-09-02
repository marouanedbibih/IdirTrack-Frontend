import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  IconButton,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
// import ManagerTableFooter from "./ManagerTableFooter";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useManagerContext } from "../ManagerProvider";
import { deleteManagerAPI } from "../ManagerServices";
import ManagerTableFooter from "./ManagerTableFooter";
import {
  useDeleteManager,
  useFetchListOfManagers,
} from "../hooks/ManagerHooks";
import { IManager } from "../ManagerTypes";
import { SmallTextTable } from "@/components/text/SmallTextTable";
import DeleteConfirmationDialog from "@/components/dialog/DeleteConfirmationDialog";

export interface IManagerTableProps {}

const TABLE_HEAD = ["Name", "Username", "Email", "Phone", "Actions"];
export default function ManagerTable(props: IManagerTableProps) {
  // Basics States
  const { loading, setLoading } = useManagerContext();
  const { dialog, setDialog } = useManagerContext();
  const { IID, setIID } = useManagerContext();
  const { pagination, setPagination } = useManagerContext();

  // Manager Fetching state
  const { ManagerList, setManagerList } = useManagerContext();

  // Fetch list of Managers Hook
  const { fetchListOfManagers } = useFetchListOfManagers();

  // Delete Manager Hook Function
  const { deleteManager } = useDeleteManager();

  // Function to handle the delete Manager dialog
  const handelDeleteManagerDialog = (id: number | null) => {
    if (id) {
      setIID({ ...IID, delete: id });
    }
    setDialog({ ...dialog, delete: !dialog.delete });
  };

  // Function to handle the update Manager dialog
  const handelUpdateManagerDialog = (id: number) => {
    setIID({ ...IID, update: id });
    setDialog({ ...dialog, form: !dialog.form });
  };

  // On Delete Manager
  const onDelete = () => {
    if (IID.delete) {
      deleteManager(IID.delete);
    }
  };

  // UseEffect to fetch list of Managers
  React.useEffect(() => {
    fetchListOfManagers(pagination.currentPage, pagination.size);
  }, [pagination.currentPage, pagination.size]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {loading.table ? (
        <Spinner
          className="h-8 w-8"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : ManagerList && ManagerList.length > 0 ? (
        <Card
          className="h-full w-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
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
                {ManagerList.map((manager: IManager, index) => {
                  const isLast = index === ManagerList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={manager.managerId}>
                      <td className={classes}>
                        <SmallTextTable text={manager.name} />
                      </td>
                      <td className={classes}>
                        <SmallTextTable text={manager.username} />
                      </td>
                      <td className={classes}>
                        <SmallTextTable text={manager.email} />
                      </td>
                      <td className={classes}>
                        <SmallTextTable text={manager.phone} />
                      </td>
                      <td className={`${classes} flex flex-row gap-2`}>
                        <Tooltip content="View Manager">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="blue"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit Manager">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="green"
                            onClick={(event) => {
                              handelUpdateManagerDialog(manager.managerId);
                            }}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Manager">
                          <IconButton
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            color="red"
                            onClick={(event) =>
                              handelDeleteManagerDialog(manager.managerId)
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
          <ManagerTableFooter
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
          No Manager Found
        </Typography>
      )}

      <DeleteConfirmationDialog
        handleClose={() => handelDeleteManagerDialog(null)}
        open={dialog.delete}
        handleConfirm={onDelete}
        loading={loading.delete}
        message="Are you sure you want to delete this Manager?"
      />
    </div>
  );
}
