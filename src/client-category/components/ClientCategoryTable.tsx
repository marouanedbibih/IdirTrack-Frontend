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
import { useClientCategoryContext } from "../contexts/ClientCategoryProvider";
import { useClientCategoryFunctionsContext } from "../contexts/ClientCategoryFunctionsProvider";
import { SmallTextTable } from "@/components/text/SmallTextTable";

export interface IClientCategoryTableProps {}

const TABLE_HEAD = ["Category Name", "Total Clients", "Actions"];

export default function ClientCategoryTable(props: IClientCategoryTableProps) {
  // Client Category state management
  const { data, tableLoading, pagination, setPagination } =
    useClientCategoryContext();
  // Fetch client category functions from context
  const { fetchClientCategories, deleteClientCategory } =
    useClientCategoryFunctionsContext();
  // Dialog state management
  const { isDeleteDialogOpen, setOpenDeleteDialog } =
    useClientCategoryContext();
  // Category id state management prvider
  const { categoryId, setCategoryId } = useClientCategoryContext();
  // Loading state for deletion
  const { deleteLoading } = useClientCategoryContext();
  // Open Modal state management
  const { setOpenForm } = useClientCategoryContext();

  // Handle open form
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  // Function to handle opening the delete dialog
  const handleDeleteDialog = (id: number | null) => {
    if (id) setCategoryId(id);
    setOpenDeleteDialog(!isDeleteDialogOpen);
  };

  // Function to handle opening the update category dialog
  const handleUpdateCategoryDialog = (id: number) => {
    setCategoryId(id);
    setOpenForm(true);
  };

  // Function to delete a category
  const deleteCategory = () => {
    categoryId && deleteClientCategory(categoryId);
  };

  // Fetch client categories on component load or pagination change
  useEffect(() => {
    fetchClientCategories(pagination.currentPage, pagination.size);
  }, [pagination.currentPage, pagination.size]);

  return (
    <div className="flex flex-col justify-center items-center w-2/5">
      {tableLoading ? (
        <Spinner
          className="h-8 w-8"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : data ? (
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
              <Typography
                variant="h5"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Client Categories
              </Typography>
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="green"
                onClick={handleOpenForm}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New
              </Button>
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
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        placeholder={undefined}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map(({ id, name, totalClients }, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <SmallTextTable text={name} />
                      </td>
                      <td className={classes}>
                        <SmallTextTable text={totalClients.toString()} />
                      </td>
                      <td className={`${classes} flex flex-row gap-2`}>
                        <Tooltip content="Edit Category">
                          <IconButton
                            color="green"
                            onClick={() => handleUpdateCategoryDialog(id)}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            placeholder={undefined}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Category">
                          <IconButton
                            color="red"
                            onClick={() => handleDeleteDialog(id)}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            placeholder={undefined}
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
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
        >
          No Categories Found
        </Typography>
      )}

      <Dialog
        open={isDeleteDialogOpen}
        handler={handleDeleteDialog}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={undefined}
      >
        <DialogHeader
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
        >
          Confirm Deletion
        </DialogHeader>
        <DialogBody
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
        >
          Are you sure you want to delete this category? This action cannot be
          undone.
        </DialogBody>
        {deleteLoading ? (
          <div className="flex flex-1 justify-center items-center p-4">
            <Spinner
              className="h-8 w-8"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </div>
        ) : (
          <DialogFooter
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <Button
              variant="text"
              color="red"
              onClick={() => handleDeleteDialog(null)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={deleteCategory}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={undefined}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        )}
      </Dialog>
    </div>
  );
}
