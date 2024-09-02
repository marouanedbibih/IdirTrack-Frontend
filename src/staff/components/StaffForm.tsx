/* eslint-disable react-hooks/exhaustive-deps */
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
import { useStaffContext } from "@/staff/StaffProvider";
import {
  createStaffAPI,
  getStaffByIdAPI,
  updateStaffAPI,
} from "@/staff/StaffServices";
import { BasicResponse } from "@/types/Basics";
import { getClientForSelect } from "@/services/ClientService";

import { Select, Option } from "@material-tailwind/react";
import { Client, StaffRequest } from "@/staff/type";
import { SelectClient } from "./SelectClient";
import { SelectableItem } from "@/components/form/SelectWithSearch";
import { DefaultInput } from "@/components/inputs/DefaultInput";
import { useCreateStaff, useFetchStaffById, useUpdateStaff } from "../hooks/StaffHooks";

export interface ClientItem extends SelectableItem {
  id: number;
  name: string;
  company: string;
}
export interface IStaffFormProps {}

export default function StaffForm(props: IStaffFormProps) {
  // Basics states
  const { dialog, setDialog } = useStaffContext();
  const { loading, setLoading } = useStaffContext();
  const { IID, setIID } = useStaffContext();

  // Staff Editing states
  const { staffRequest, setStaffRequest,resetStaffRequest } = useStaffContext();
  const { fieldErrors, setFieldErrors } = useStaffContext();

  // Handel change function
  const handleChange = (field: string, value: string | number) => {
    // Update the staff request state
    setStaffRequest({ ...staffRequest, [field]: value });

    // Clear the error for this field if any
    setFieldErrors(fieldErrors.filter((fieldError) => fieldError.field !== field));
  };

  // Handle Open Dialog
  const handleOpenFormDialog = () => {
    setDialog({ ...dialog, form: !dialog.form });
    resetStaffRequest();
    setFieldErrors([]);
    if (IID.update) {
      setIID({ ...IID, update: null });
    }
  };

  // Function to get the error message for a specific field
  const getError = (field: string) => {
    const fieldError = fieldErrors.find((fieldError) => fieldError.field === field);
    return fieldError ? fieldError.message : "";
  };

  // Hook Function to create a new staff
  const createStaff = useCreateStaff();

  // Hook Functions to get staff by id
  const fetchStaffById = useFetchStaffById();

  // Hook Function to update a staff
  const updateStaff = useUpdateStaff();

  // On Submit function
  const onSubmit = () => {
    if (IID.update) {
      updateStaff(IID.update, staffRequest);
    } else {
      createStaff(staffRequest);
    }
  };



  React.useEffect(() => {
    if (IID.update) {
      fetchStaffById(IID.update);
    }
  }, [IID.update]);

  return (
    <>
      <Dialog
        size="xs"
        open={dialog.form}
        handler={handleOpenFormDialog}
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
          {loading.form ? (
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
                 {IID.update ? "Edit Staff" : "Add Staff"}
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

                <SelectClient error={getError("clientId")} />
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
                  onClick={onSubmit}
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  {IID.update ? "Update" : "Save"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
}
