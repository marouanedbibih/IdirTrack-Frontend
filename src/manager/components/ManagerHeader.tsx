import * as React from "react";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Button,
} from "@material-tailwind/react";
import { useManagerContext } from "../ManagerProvider";
export interface IManagerHeaderProps {}

export default function ManagerHeader(props: IManagerHeaderProps) {
  // Importing necessary states from ManagerProvider
  const { dialog, setDialog } = useManagerContext();

  // Function to open the form
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
        <div className="mb-4 flex flex-col justify-end gap-8 md:flex-row md:items-center">
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
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Manager
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
