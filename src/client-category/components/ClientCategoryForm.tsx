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

import { DefaultInput } from "@/components/inputs/DefaultInput";
import { useClientCategoryContext } from "../contexts/ClientCategoryProvider";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useClientCategoryFunctionsContext } from "../contexts/ClientCategoryFunctionsProvider";

export interface IClientCategoryFormProps {}

export default function ClientCategoryForm(props: IClientCategoryFormProps) {
  // Open Modal Form provider state
  const { setOpenForm, isFormOpen } = useClientCategoryContext();
  // Client Category Request provider state
  const { categoryRequest, setCategoryRequest, initClientCategoryRequest } =
    useClientCategoryContext();
  // Errors provider state
  const { fieldErrors, setFieldErrors } = useClientCategoryContext();
  // Loading provider state
  const { formLoading, setFormLoading } = useClientCategoryContext();
  // Alert provider state management
  const { setAlertOpen } = useGlobalContext();
  // Message provider state management
  const { setMessage } = useGlobalContext();
  // Client Category id provider state
  const { categoryId, setCategoryId } = useClientCategoryContext();

  // Handel change function
  const handleChange = (field: string, value: string | number) => {
    // Update the Operator request state
    setCategoryRequest({ ...categoryRequest, [field]: value });
    // Clear the error for this field if any
    setFieldErrors(fieldErrors.filter((error) => error.field !== field));
  };

  // Function to get the error message for a specific field
  const getError = (field: string) => {
    const error = fieldErrors.find((error) => error.field === field);
    return error ? error.message : "";
  };

  // Create client category function from provider
  const { createClientCategory } = useClientCategoryFunctionsContext();
  // Update client category function from provider
  const { updateClientCategory } = useClientCategoryFunctionsContext();
  // Get client category by id function from provider
  const { fetchClientCategoryById } = useClientCategoryFunctionsContext();

  // Handle submit function
  const handleSubmit = () => {
    if (categoryId) {
      updateClientCategory(categoryId, categoryRequest);
    } else {
      createClientCategory(categoryRequest);
    }
  };

  React.useEffect(() => {
    console.log("Error list", fieldErrors);
  }, [fieldErrors]);

  React.useEffect(() => {
    if (categoryId) {
      fetchClientCategoryById(categoryId);
    }
  }, [categoryId]);

  return (
    <>
      <Dialog
        size="xs"
        open={isFormOpen}
        handler={() => setOpenForm(false)}
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
          {formLoading ? (
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
                  {categoryId ? "Edit Operator" : "Create Operator"}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {categoryId ? "Edit the Operator" : "Create a new Operator"}
                </Typography>
                <DefaultInput
                  label="Name"
                  placeholder="Enter the Category name"
                  value={categoryRequest.name}
                  error={getError("name")}
                  smallMessage="Your Category will be unique"
                  onChange={(e) => handleChange("name", e.target.value)}
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
                  onClick={handleSubmit}
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  {categoryId ? "Update" : "Create "}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
}
