import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  IconButton,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
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

export interface IManagerTableProps {}

const TABLE_HEAD = ["Name", "Username", "Email", "Phone", "Actions"];
export default function ManagerTable(props: IManagerTableProps) {
  // Manager list state management
  const { ManagerList, setManagerList } = useManagerContext();

  // Loading state management
  const { tableLoading, setTableLoading } = useManagerContext();

  // Pagination state management
  const { pagination, setPagination } = useManagerContext();

  // Search state management
  const { search } = useManagerContext();

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);

  // Manager Id local state management
  // const [ManagerId, setManagerId] = useState<number | null>(null);

  // Loading delete local Manager state management
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Message state management
  const { setMessage, message } = useManagerContext();

  // Alert state management
  const { setAlertOpen } = useManagerContext();

  // Stafe ID provider state management
  const { setManagerId, ManagerId } = useManagerContext();

  // Open Modal provider state management
  const { setOpenForm } = useManagerContext();

  // Fetch Manager list provider state management
  const { fetchManagerList } = useManagerContext();

  // Function to handle the delete Manager dialog
  const handelDeleteManagerDialog = (id: number | null) => {
    if (id) {
      setManagerId(id);
    }
    setOpenDialog(!openDialog);
  };

  /**
   * Handel the update Manager dialog
   * @param id
   * @returns void
   */
  const handelUpdateManagerDialog = (id: number) => {
    setManagerId(id);
    setOpenForm(true);
  };

  // -------------- APIs functions --------------

  /**
   * This function is used to delete a Manager member by calling the deleteManagerAPI
   * and then updating the Manager list state
   */
  const deleteManager = () => {
    if (ManagerId) {
      setLoadingDelete(true);
      deleteManagerAPI(ManagerId)
        .then((data) => {
          setMessage({
            message: data.message,
            messageType: data.messageType,
          });

          setAlertOpen(true);
          fetchManagerList(pagination.currentPage, 5);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          handelDeleteManagerDialog(null);
          setLoadingDelete(false);
        });
    }
  };

  // Use effect to fetch the Manager list when the page changes
  useEffect(() => {
    if (search === "") {
      fetchManagerList(pagination.currentPage, 5);
    }
  }, [pagination.currentPage]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {tableLoading ? (
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
                {ManagerList.map(({ id, user }, index) => {
                  const isLast = index === ManagerList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={user.id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          {user.name}
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
                          {user.username}
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
                          {user.email}
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
                          {user.phone}
                        </Typography>
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
                              handelUpdateManagerDialog(user.id);
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
                              handelDeleteManagerDialog(user.id)
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

      <Dialog
        open={openDialog}
        handler={handelDeleteManagerDialog}
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
          Are you sure you want to delete this Manager member? This action
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
              onClick={() => handelDeleteManagerDialog(null)}
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
              onClick={() => deleteManager()}
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
