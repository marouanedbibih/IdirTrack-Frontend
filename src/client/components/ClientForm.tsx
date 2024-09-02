/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useClientContext } from "../contexts/ClientProvider";
import DefaultSelect from "@/components/inputs/DefaultSelect";
import { DefaultInput } from "@/components/inputs/DefaultInput";
import DefaultTextArea from "@/components/inputs/DefaultTextArea";
import { useFetchClientCategoriesDropdown } from "@/client-category/hooks/useFetchClientCategories";
import { useCreateClient } from "../hooks/useClientActions";
import { useFetchClientById, useUpdateClient } from "../hooks/ClientHooks";
interface ClientFormProps {}
export const ClientForm: React.FC<ClientFormProps> = ({}) => {
  // Basics States
  const { dialog, setDialog } = useClientContext();
  const { loading } = useClientContext();
  const { IIDs } = useClientContext();
  // Client Editing States
  const { clientRequest, setClientRequest } = useClientContext();
  const { fieldErrors, setFieldErrors } = useClientContext();
  // Client Category Dropdown List
  const { clientCategoryDropdown } = useFetchClientCategoriesDropdown();

  // Hook to fetch client by ID
  const { fetchClientById } = useFetchClientById();
  // Hook to update client
  const { updateClient } = useUpdateClient();
  // Hook to create client
  const { createClient } = useCreateClient();

  // Dialog Handler
  const handler = () => {
    setDialog({ ...dialog, form: false });
  };

  // Handle change function
  const handleChange = (
    field: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Convert to number if the field is "ClientTypeId"
    if (field === "categoryId") {
      value = Number(value);
    }
    // Convert to boolean if the field is "isDisabled"
    if (field === "isDisabled") {
      value = value === "1"; // If "Disabled" is selected, set to true, otherwise false
    }
    // Update the Client request state
    setClientRequest({ ...clientRequest, [field]: value });
    // Clear the error for this field if any
    setFieldErrors(
      fieldErrors.filter((fieldError) => fieldError.field !== field)
    );
  };

  // Function to get the error message for a specific field
  const getError = (field: string) => {
    const input = fieldErrors.find((fieldError) => fieldError.field === field);
    return input ? input.message : "";
  };

  // Handle Submit function
  const handleSubmit = async () => {
    console.log("Client Request", clientRequest);
    if (IIDs.update) {
      // Update the client
      updateClient(IIDs.update, clientRequest);
    } else {
      // Create the client
      createClient(clientRequest);
    }
  };

  // UseEffect to fetch the client by ID
  React.useEffect(() => {
    if (IIDs.update) {
      fetchClientById(IIDs.update);
    }
  }, [IIDs.update]);

  return (
    <>
      <Dialog
        size="lg"
        open={dialog.form}
        handler={handler}
        className="bg-transparent shadow-none "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Card
          className="mx-auto w-full max-w-[46rem] h-auto min-h-[200px]"
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
                  {IIDs.update ? "Update Client" : "Create Client"}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {IIDs.update
                    ? "Update the Client details"
                    : "Fill in the Client details"}
                </Typography>

                <div className="flex flex-row justify-between items-start gap-8">
                  <div className="w-1/2">
                    <DefaultInput
                      label="Username"
                      placeholder="Enter the Username"
                      value={clientRequest.username}
                      error={getError("username")}
                      smallMessage="Your Username will be unique"
                      onChange={(e) => handleChange("username", e.target.value)}
                    />
                    <DefaultInput
                      label="Name"
                      placeholder="Enter the Name"
                      value={clientRequest.name}
                      error={getError("name")}
                      smallMessage="Your name will be unique"
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <DefaultInput
                      label="Email"
                      placeholder="Enter the Email"
                      value={clientRequest.email}
                      error={getError("email")}
                      smallMessage="Your Email will be unique"
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <DefaultInput
                      label="Phone"
                      placeholder="Enter the Phone"
                      value={clientRequest.phone}
                      error={getError("phone")}
                      smallMessage="Your Phone will be unique"
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    <DefaultInput
                      label="CNE"
                      placeholder="Enter the CNE"
                      value={clientRequest.cne}
                      error={getError("cne")}
                      smallMessage="Your CNE will be unique"
                      onChange={(e) => handleChange("cne", e.target.value)}
                    />
                    <DefaultInput
                      label="Password"
                      placeholder="Enter the Password"
                      value={clientRequest.password}
                      error={getError("password")}
                      smallMessage="Your Password will be unique"
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-[15px]">
                    <DefaultInput
                      label="Company"
                      placeholder="Enter the Company"
                      value={clientRequest.company}
                      error={getError("company")}
                      smallMessage="Enter the Company name"
                      onChange={(e) => handleChange("company", e.target.value)}
                    />
                    <DefaultSelect
                      label="Select Disibility"
                      value={clientRequest.isDisabled ? "1" : "0"} // Convert boolean to string
                      onChange={(val) => handleChange("isDisabled", val)}
                      options={[
                        { id: 0, name: "Enabled" },
                        { id: 1, name: "Disabled" },
                      ]}
                      loading={false}
                      error={getError("isDisabled")}
                      smallMessage="Select the appropriate version for the Client"
                    />
                    <DefaultSelect
                      label="Select Client Category"
                      value={clientRequest.categoryId?.toString()}
                      onChange={(val) => handleChange("categoryId", val)}
                      options={clientCategoryDropdown}
                      loading={false}
                      error={getError("categoryId")}
                      smallMessage="Select the client category"
                    />
                    <DefaultTextArea
                      label="Remarque"
                      placeholder=""
                      value={clientRequest.remarque}
                      error={getError("remarque")}
                      smallMessage="Add any remarks or notes here"
                      onChange={(val) => handleChange("remarque", val)}
                    />
                  </div>
                </div>
              </CardBody>
              <CardFooter
                className="pt-0"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={handleSubmit}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  {IIDs.update ? "Update Client" : "Create Client"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
