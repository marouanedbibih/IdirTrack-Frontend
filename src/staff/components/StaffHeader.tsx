import * as React from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useStaffContext } from "@/staff/StaffProvider";
import { searchStaffsAPI } from "@/staff/StaffServices";
import { SearchStaff } from "./SearchStaff";
export interface IStaffHeaderProps {}

export default function StaffHeader(props: IStaffHeaderProps) {
  // Basics states
  const { dialog, setDialog } = useStaffContext();

  // Function to handle the open form dialog
  const handleOpenForm = () => {
    setDialog({ ...dialog, form: !dialog.form });
  };

  return (
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
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Total Staffs: 20
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              This is a list of all staffs in the system
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <SearchStaff />
            <Button
              className="flex items-center gap-3"
              size="sm"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              color="green"
              onClick={handleOpenForm}
            >
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Staff
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
