import { useStaffContext } from "@/context/StaffProvider";
import { deleteStaffAPI, getAllStaffsListAPI } from "@/services/StaffServices";
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
import StaffTableFooter from "./StaffTableFooter";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export interface IStaffTableProps {}

const TABLE_HEAD = [
  "Staff Name",
  "Phone",
  "Position",
  "Client Name",
  "Client Company",
  "Actions",
];
export default function StaffTable(props: IStaffTableProps) {
  // Staff list state management
  const { staffList, setStaffList } = useStaffContext();

  // Loading state management
  const { tableLoading, setTableLoading } = useStaffContext();

  // Pagination state management
  const { pagination, setPagination } = useStaffContext();

  // Search state management
  const { search } = useStaffContext();

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);

  // Staff Id local state management
  const [staffId, setStaffId] = useState<number | null>(null);

  // Loading delete local staff state management
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Message state management
  const { setMessage, message } = useStaffContext();

  // Alert state management
  const { setAlertOpen } = useStaffContext();



  // Function to handle the delete staff dialog
  const handelDeleteStaffDialog = (id: number | null) => {
    if (id) {
      setStaffId(id);
    }
    setOpenDialog(!openDialog);
  };

  /**
   * This function is used to delete a staff member by calling the deleteStaffAPI
   * and then updating the staff list state
   */

  const deleteStaff = () => {
    if (staffId) {
      setLoadingDelete(true);
      deleteStaffAPI(staffId)
        .then((data) => {
          fetchStaffList(pagination.currentPage, 5);
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
          handelDeleteStaffDialog(null);
          setLoadingDelete(false);
        });
    }
  };

  /**
   * This function is used to fetch the staff list from the service and update the state
   * of the staff list, the pagination and the loading state
   * @param page
   * @param size
   */
  const fetchStaffList = (page: number, size: number) => {
    setTableLoading(true);
    getAllStaffsListAPI(page, size)
      .then((data) => {
        setStaffList(data.content);
        setPagination({
          currentPage: data.metaData?.currentPage ?? 1,
          totalPages: data.metaData?.totalPages ?? 1,
          size: data.metaData?.size ?? 5,
          totalElements: data.metaData?.totalElements ?? 0,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  // Use effect to fetch the staff list when the page changes
  useEffect(() => {
    if (search === "") {
      fetchStaffList(pagination.currentPage, 5);
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
      ) : staffList && staffList.length > 0 ? (
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
                {staffList.map(
                  (
                    { id, name, phone, position, clientName, clientCompany },
                    index
                  ) => {
                    const isLast = index === staffList.length - 1;
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
                            {phone}
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
                            {position}
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
                            {clientName}
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
                            {clientCompany}
                          </Typography>
                        </td>
                        <td className={`${classes} flex flex-row gap-2`}>
                          <Tooltip content="View Staff">
                            <IconButton
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                              color="blue"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Edit Staff">
                            <IconButton
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                              color="green"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Delete Staff">
                            <IconButton
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                              color="red"
                              onClick={(event) => handelDeleteStaffDialog(id)}
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
          <StaffTableFooter
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
          No Staff Found
        </Typography>
      )}

      <Dialog
        open={openDialog}
        handler={handelDeleteStaffDialog}
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
          Are you sure you want to delete this staff member? This action cannot
          be undone.
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
              onClick={() => handelDeleteStaffDialog(null)}
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
              onClick={() => deleteStaff()}
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
