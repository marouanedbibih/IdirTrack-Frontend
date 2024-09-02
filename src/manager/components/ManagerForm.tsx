/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";

import { useManagerContext } from "../ManagerProvider";

import { DefaultInput } from "@/components/inputs/DefaultInput";
import {
  useCreateManager,
  useFetchManagerByID,
  useUpdateManager,
} from "../hooks/ManagerHooks";

export interface IManagerFormProps {}

export default function ManagerForm(props: IManagerFormProps) {
  // Basic States
  const { loading, setLoading } = useManagerContext();
  const { dialog, setDialog } = useManagerContext();
  const { IID, setIID } = useManagerContext();

  // Manager Editing state
  const { ManagerRequest, setManagerRequest } = useManagerContext();
  const { resetManagerRequest } = useManagerContext();
  const { fieldsErrors, setFieldsErrors } = useManagerContext();

  // Handel change function
  const handleChange = (field: string, value: string | number) => {
    // Update the Manager request state
    setManagerRequest({ ...ManagerRequest, [field]: value });

    // Clear the error for this field if any
    setFieldsErrors(
      fieldsErrors.filter((fieldError) => fieldError.field !== field)
    );
  };

  // Handle Open Form
  const handleOpenForm = () => {
    setDialog({ ...dialog, form: !dialog.form });
    setIID({ ...IID, update: null });
  };

  // Function to get the error message for a specific field
  const getError = (field: string) => {
    const fieldError = fieldsErrors.find(
      (fieldError) => fieldError.field === field
    );
    return fieldError ? fieldError.message : "";
  };

  // Hook to create a new manager
  const { createManager } = useCreateManager();
  // Hook to update a manager
  const { updateManager } = useUpdateManager();
  // Hook to get a manager by id
  const { fetchManagerByID } = useFetchManagerByID();

  // Function to submit the form
  const onSubmit = () => {
    if (IID.update) {
      updateManager(IID.update, ManagerRequest);
    } else {
      createManager(ManagerRequest);
    }
  };

  // UseEffect to fetch the client by id
  React.useEffect(() => {
    if (IID.update) {
      fetchManagerByID(IID.update);
    }
  }, [IID.update]);

  return (
    <>
      <Dialog
        size="xs"
        open={dialog.form}
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
                  {IID.update ? "Update Manager" : "Create Manager  "}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {IID.update
                    ? "Update the Manager information"
                    : "Enter the Manager information"}
                </Typography>

                <DefaultInput
                  label="Username"
                  placeholder="Enter the Manager username"
                  value={ManagerRequest.username}
                  error={getError("username")}
                  smallMessage="Your Manager username will be unique"
                  onChange={(e) => handleChange("username", e.target.value)}
                />
                <DefaultInput
                  label="Name"
                  placeholder="Enter the Manager name"
                  value={ManagerRequest.name}
                  error={getError("name")}
                  smallMessage="Your Manager username will be unique"
                  onChange={(e) => handleChange("name", e.target.value)}
                />

                <DefaultInput
                  label="Email"
                  placeholder="Enter the email"
                  value={ManagerRequest.email}
                  error={getError("email")}
                  smallMessage="Enter a valid phone number"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <DefaultInput
                  label="Phone"
                  placeholder="Enter the phone number"
                  value={ManagerRequest.phone}
                  error={getError("phone")}
                  smallMessage="Enter a valid phone number"
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <DefaultInput
                  label="Password"
                  placeholder="Enter the password"
                  value={ManagerRequest.password}
                  error={getError("password")}
                  smallMessage="Enter a valid Password"
                  onChange={(e) => handleChange("password", e.target.value)}
                  type="password"
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
                  {IID.update ? "Update" : "Create"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
}
