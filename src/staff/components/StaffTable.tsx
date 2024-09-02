import { useStaffContext } from "@/staff/StaffProvider";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  IconButton,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import { useDeleteStaff, useFetchListOfStaffs } from "../hooks/StaffHooks";
import DeleteConfirmationDialog from "@/components/dialog/DeleteConfirmationDialog";
import { SmallTextTable } from "@/components/text/SmallTextTable";
import Pagination from "@/components/pagination/Pagination";

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
  // Basics states
  const { pagination, setPagination } = useStaffContext();
  const { loading, setLoading } = useStaffContext();
  const { dialog, setDialog } = useStaffContext();
  const { fetching, setFetching } = useStaffContext();
  const { IID, setIID } = useStaffContext();

  // Staff Fetching states
  const { staffList, setStaffList } = useStaffContext();

  // Function to handle the delete staff dialog
  const handelDeleteStaffDialog = (id: number | null) => {
    if (id) {
      setIID({ ...IID, delete: id });
    }
    setDialog({ ...dialog, delete: !dialog.delete });
  };

  // Function to handle the update staff dialog
  const handelUpdateStaffDialog = (id: number) => {
    setIID({ ...IID, update: id });
    setDialog({ ...dialog, form: !dialog.form });
  };

  // Hook Functions to delete staff
  const deleteStaff = useDeleteStaff();



  return (
    <div className="flex flex-col justify-center items-center w-full">
      {loading.table ? (
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
                          <SmallTextTable text={name} />
                        </td>
                        <td className={classes}>
                          <SmallTextTable text={phone} />
                        </td>
                        <td className={classes}>
                          <SmallTextTable text={position} />
                        </td>
                        <td className={classes}>
                          <SmallTextTable text={clientName} />
                        </td>
                        <td className={classes}>
                          <SmallTextTable text={clientCompany} />
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
                              onClick={(event) => {
                                handelUpdateStaffDialog(id);
                              }}
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
          No Staff Found
        </Typography>
      )}
      <DeleteConfirmationDialog
        open={dialog.delete}
        handleClose={() => handelDeleteStaffDialog(null)}
        handleConfirm={() => deleteStaff(IID.delete!)}
        loading={loading.delete}
        message="Are you sure you want to delete this staff?"
      />
    </div>
  );
}
