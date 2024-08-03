import * as React from "react";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import { useStaffContext } from "@/context/StaffProvider";
import { DefaultInput } from "../inputs/DefaultInput";
import { createStaffAPI } from "@/services/StaffServices";
import { BasicResponse } from "@/types/Basics";

export interface IStaffFormProps {}

export default function StaffForm(props: IStaffFormProps) {
  // Open Modal Form provider state
  const { openForm, setOpenForm, handleOpenForm } = useStaffContext();

  // Staff Request provider state
  const { staffRequest, setStaffRequest } = useStaffContext();

  // Errors provider state
  const { errors, setErrors } = useStaffContext();

  // Loading local state management
  const [loading, setLoading] = React.useState<boolean>(false as boolean);

  // Handel change function
  const handleChange = (key: string, value: string) => {
    // Update the staff request state
    setStaffRequest({ ...staffRequest, [key]: value });

    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.key !== key));
  };

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const error = errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  // Function to crate new staff
  const createStaff = () => {
    // Set the loading to true
    setLoading(true);
    createStaffAPI(staffRequest)
      .then((data) => {
        console.log(data);
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errorsList ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog
        size="xs"
        open={openForm}
        handler={handleOpenForm}
        className="bg-transparent shadow-none"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Card
          className="mx-auto w-full max-w-[24rem] h-auto min-h-[200px]"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {loading ? (
            <div className="w-full h-60 flex flex-1 justify-center items-center">
              <Spinner
                className="h-8 w-8"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          ) : (
            <div>
              <CardBody
                className="flex flex-col gap-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Typography
                  variant="h4"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Add new Staff
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Enter your staff details to save in the database
                </Typography>
                <DefaultInput
                  label="Name"
                  placeholder="Enter the staff name"
                  value={staffRequest.name}
                  error={getError("name")}
                  smallMessage="Your staff will be unique"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <DefaultInput
                  label="Phone"
                  placeholder="Enter the phone number"
                  value={staffRequest.phone}
                  error={getError("phone")}
                  smallMessage="Enter a valid phone number"
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <DefaultInput
                  label="Position"
                  placeholder="Enter the position"
                  value={staffRequest.position}
                  error={getError("position")}
                  smallMessage="Specify the position of the staff"
                  onChange={(e) => handleChange("position", e.target.value)}
                />
              </CardBody>
              <CardFooter
                className="pt-0"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Button
                  variant="gradient"
                  onClick={createStaff}
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  Save
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
}