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

import { BasicResponse } from "@/types/Basics";

import { Select, Option } from "@material-tailwind/react";
import { useDeviceTypeContext } from "@/device/contexts/DeviceTypeProvider";
import {
  createDeviceTypeAPI,
  getDeviceTypeByIdAPI,
  updateDeviceTypeAPI,
} from "@/device/services/DeviceTypeService";
import { IDeviceTypeRequest } from "@/device/types/DeviceType";
import { DefaultInput } from "@/components/inputs/DefaultInput";

export interface IDeviceTypeFormProps {}

export default function DeviceTypeForm(props: IDeviceTypeFormProps) {
  // Open Modal Form provider state
  const { openForm, handleOpenForm } = useDeviceTypeContext();

  // Size provider state
  const { size, setSize } = useDeviceTypeContext();

  // DeviceType Request provider state
  const { DeviceTypeRequest, setDeviceTypeRequest } = useDeviceTypeContext();

  // Errors provider state
  const { errors, setErrors } = useDeviceTypeContext();

  // Loading local state management
  const [loading, setLoading] = React.useState<boolean>(false as boolean);

  // Alert provider state management
  const { alertOpen, setAlertOpen } = useDeviceTypeContext();

  // Message provider state management
  const { message, setMessage } = useDeviceTypeContext();

  // Reset the DeviceType request
  const { resetDeviceTypeRequest } = useDeviceTypeContext();

  // DeviceType ID provider state management
  const { DeviceTypeId, setDeviceTypeId } = useDeviceTypeContext();

  // Fetch the fetch DeviceType list provider state
  const { fetchDeviceTypeList } = useDeviceTypeContext();

  // Handel change function
  const handleChange = (key: string, value: string | number) => {
    // Update the DeviceType request state
    setDeviceTypeRequest({ ...DeviceTypeRequest, [key]: value });

    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.key !== key));
  };

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const error = errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  /**
   * Create a new DeviceType
   * @returns void
   */
  const createDeviceType = (payload: IDeviceTypeRequest) => {
    // Set the loading to true
    setLoading(true);
    console.log(DeviceTypeRequest);
    createDeviceTypeAPI(payload)
      .then((data) => {
        console.log(data);
        // Reset the DeviceType request
        resetDeviceTypeRequest();
        // Close the form
        handleOpenForm();
        // Set the message
        setMessage({
          message: data.message,
          messageType: data.messageType,
        });
        // Set the alert open
        setAlertOpen(true);
        // Fetch the DeviceType list
        fetchDeviceTypeList(1, size);
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errors ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * GET DeviceType BY ID
   *
   * This function handel the get DeviceType by id
   *
   * @param {number} id The id of the DeviceType to get
   */
  const getDeviceTypeById = (id: number) => {
    setLoading(true);
    getDeviceTypeByIdAPI(id)
      .then((data) => {
        console.log(data);
        setDeviceTypeRequest({
          name: data.content.name,
        });
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errors ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * UPDATE DeviceType
   *
   * This function handel the update DeviceType
   * @param {number} id The id of the DeviceType to update
   * @param {DeviceTypeRequest} DeviceType The DeviceType request object
   * @returns void
   * @throws BasicResponse
   */

  const updateDeviceType = (id: number, payload: IDeviceTypeRequest) => {
    setLoading(true);
    updateDeviceTypeAPI(id, payload)
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
        // Fetch the DeviceType list
        fetchDeviceTypeList(1, size);
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errors ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Handel submit form function to create or update DeviceType
   * @returns void
   * @throws BasicResponse
   * @see createDeviceType
   * @see updateDeviceType
   */

  const handleSubmit = () => {
    if (DeviceTypeId) {
      updateDeviceType(DeviceTypeId, DeviceTypeRequest);
    } else {
      createDeviceType(DeviceTypeRequest);
    }
  };

  React.useEffect(() => {
    console.log("Error list", errors);
  }, [errors]);

  React.useEffect(() => {
    if (DeviceTypeId) {
      getDeviceTypeById(DeviceTypeId);
    }
  }, [DeviceTypeId]);

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
                  Add new DeviceType
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Enter your DeviceType details to save in the database
                </Typography>
                <DefaultInput
                  label="Name"
                  placeholder="Enter the DeviceType name"
                  value={DeviceTypeRequest.name}
                  error={getError("name")}
                  smallMessage="Your DeviceType will be unique"
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
