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

import { BasicResponse } from "@/types/Basics";

import { useManagerContext } from "../ManagerProvider";
import {
  createManagerAPI,
  getManagerByIdAPI,
  updateManagerAPI,
} from "../ManagerServices";
import { IManagerRequest } from "../ManagerTypes";
import { DefaultInput } from "@/components/inputs/DefaultInput";

export interface IManagerFormProps {}

export default function ManagerForm(props: IManagerFormProps) {
  // Open Modal Form provider state
  const { openForm, handleOpenForm } = useManagerContext();

  // Manager Request provider state
  const { ManagerRequest, setManagerRequest } = useManagerContext();

  // Errors provider state
  const { errors, setErrors } = useManagerContext();

  // Loading local state management
  const [loading, setLoading] = React.useState<boolean>(false as boolean);

  // Alert provider state management
  const { alertOpen, setAlertOpen } = useManagerContext();

  // Message provider state management
  const { message, setMessage } = useManagerContext();

  // Reset the Manager request
  const { resetManagerRequest } = useManagerContext();

  // Manager ID provider state management
  const { ManagerId, setManagerId } = useManagerContext();

  // Fetch the fetch Manager list provider state
  const { fetchManagerList } = useManagerContext();

  // Handel change function
  const handleChange = (key: string, value: string | number) => {
    // Update the Manager request state
    setManagerRequest({ ...ManagerRequest, [key]: value });

    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.key !== key));
  };

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const error = errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  /**
   * Create a new Manager
   * @returns void
   */
  const createManager = () => {
    // Set the loading to true
    setLoading(true);
    console.log(ManagerRequest);
    createManagerAPI(ManagerRequest)
      .then((data) => {
        console.log(data);
        // Reset the Manager request
        resetManagerRequest();
        // Close the form
        handleOpenForm();
        // Set the message
        setMessage({
          message: data.message,
          messageType: data.messageType,
        });
        // Set the alert open
        setAlertOpen(true);
        // Fetch the Manager list
        fetchManagerList(1, 5);
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errorsList ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * GET Manager BY ID
   *
   * This function handel the get Manager by id
   *
   * @param {number} id The id of the Manager to get
   */
  const getManagerById = (id: number) => {
    setLoading(true);
    getManagerByIdAPI(id)
      .then((data) => {
        console.log(data);
        setManagerRequest({
          username: data.content.user.username,
          email: data.content.user.email,
          name: data.content.user.name,
          phone: data.content.user.phone,
          password: "",
        });
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errorsList ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * UPDATE Manager
   *
   * This function handel the update Manager
   * @param {number} id The id of the Manager to update
   * @param {ManagerRequest} Manager The Manager request object
   * @returns void
   * @throws BasicResponse
   */

  const updateManager = (id: number, Manager: IManagerRequest) => {
    setLoading(true);
    updateManagerAPI(id, Manager)
      .then((data) => {
        console.log(data);
        // Set message
        setMessage({
          message: data.message,
          messageType: data.messageType,
        });
        // Set alert open
        setAlertOpen(true);
        // Close the form
        handleOpenForm();
        // Fetch the Manager list
        fetchManagerList(1, 5);
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errorsList ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Handel submit form function to create or update Manager
   * @returns void
   * @throws BasicResponse
   * @see createManager
   * @see updateManager
   */

  const handleSubmit = () => {
    if (ManagerId) {
      updateManager(ManagerId, ManagerRequest);
    } else {
      createManager();
    }
  };

  React.useEffect(() => {
    console.log("Error list", errors);
  }, [errors]);

  React.useEffect(() => {
    if (ManagerId) {
      getManagerById(ManagerId);
    }
  }, [ManagerId]);

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
                  Add new Manager
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Enter your Manager details to save in the database
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
                  onClick={handleSubmit}
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
