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
import { useDeviceContext } from "@/device/contexts/DeviceProvider";
import {
  createDeviceAPI,
  getDeviceByIdAPI,
  updateDeviceAPI,
} from "@/device/services/DeviceService";
import { IDeviceRequest } from "@/device/types/Device";
import { DefaultInput } from "@/components/inputs/DefaultInput";
import {
  getAllDeviceTypesListAPI,
  getListOfAllDeviceTypesAPI,
} from "@/device/services/DeviceTypeService";
import TextArea from "@/components/inputs/DefaultTextArea";
import DefaultTextArea from "@/components/inputs/DefaultTextArea";
import DefaultSelect from "@/components/inputs/DefaultSelect";

export interface IDeviceFormProps {}

export default function DeviceForm(props: IDeviceFormProps) {
  // Open Modal Form provider state
  const { openForm, handleOpenForm } = useDeviceContext();

  // Pagination provider state
  const { pagination, setPagination } = useDeviceContext();

  // Device Request provider state
  const { deviceRequest, setDeviceRequest } = useDeviceContext();

  // Errors provider state
  const { errors, setErrors } = useDeviceContext();

  // Loading local state management
  const [loading, setLoading] = React.useState<boolean>(false as boolean);

  // Alert provider state management
  const { alertOpen, setAlertOpen } = useDeviceContext();

  // Message provider state management
  const { message, setMessage } = useDeviceContext();

  // Reset the Device request
  const { resetDeviceRequest } = useDeviceContext();

  // Device ID provider state management
  const { deviceId, setDeviceId } = useDeviceContext();

  // Display status provider state management
  const { displayStatus, setDisplayStatus } = useDeviceContext();

  // Handle change function
  const handleChange = (key: string, value: string | number) => {
    // Convert to number if the key is "deviceTypeId"
    if (key === "deviceTypeId") {
      value = Number(value);
    }
    // Update the Device request state
    setDeviceRequest({ ...deviceRequest, [key]: value });
    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.key !== key));
  };

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const error = errors.find((error) => error.key === key);
    return error ? error.message : "";
  };

  /**
   * Create a new Device
   * @returns void
   */
  const createDevice = (payload: IDeviceRequest) => {
    // Set the loading to true
    setLoading(true);
    console.log(deviceRequest);
    createDeviceAPI(payload)
      .then((data) => {
        console.log(data);
        // Reset the Device request
        resetDeviceRequest();
        // Close the form
        handleOpenForm();
        // Set the message
        setMessage({
          message: data.message,
          messageType: data.messageType,
        });
        // Set the alert open
        setAlertOpen(true);
        // Update the Display status
        setDisplayStatus({
          filter: false,
          search: false,
          normal: true,
        });
        // Update the pagination
        setPagination({ ...pagination, currentPage: 1 });
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errors ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * GET Device BY ID
   *
   * This function handle the get Device by id
   *
   * @param {number} id The id of the Device to get
   */
  const getDeviceById = (id: number) => {
    setLoading(true);
    getDeviceByIdAPI(id)
      .then((data) => {
        console.log(data);
        // Set data to the Device request
        setDeviceRequest({
          imei: data.content.imei,
          deviceTypeId: data.content.deviceTypeId,
          remarque: data.content.remarque,
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
   * UPDATE Device
   *
   * This function handle the update Device
   * @param {number} id The id of the Device to update
   * @param {DeviceRequest} Device The Device request object
   * @returns void
   * @throws BasicResponse
   */

  const updateDevice = (id: number, payload: IDeviceRequest) => {
    setLoading(true);
    updateDeviceAPI(id, payload)
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
        // Update the Display status
        setDisplayStatus({
          filter: false,
          search: false,
          normal: true,
        });
        // Update the pagination
        setPagination({ ...pagination, currentPage: 1 });
      })
      .catch((data: BasicResponse) => {
        setErrors(data.errors ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Handle submit form function to create or update Device
   * @returns void
   * @throws BasicResponse
   * @see createDevice
   * @see updateDevice
   */

  const handleSubmit = () => {
    if (deviceId) {
      updateDevice(deviceId, deviceRequest);
    } else {
      createDevice(deviceRequest);
    }
    console.log(deviceRequest);
  };

  React.useEffect(() => {
    console.log("Error list", errors);
  }, [errors]);

  React.useEffect(() => {
    if (deviceId) {
      getDeviceById(deviceId);
    }
  }, [deviceId]);

  // Select Device Type provider state
  const { deviceTypes, setDeviceTypes } = useDeviceContext();

  // Select loading local state management
  const [selectLoading, setSelectLoading] = React.useState<boolean>(false);

  // Get list of Device Types for the select input
  const fetchDeviceTypesList = () => {
    setSelectLoading(true);
    getListOfAllDeviceTypesAPI()
      .then((data) => {
        console.log(data);
        setDeviceTypes(data.content);
      })
      .catch((data: BasicResponse) => {
        console.log(data);
      })
      .finally(() => {
        setSelectLoading(false);
      });
  };

  // Use effect to fetch the Device Types list
  React.useEffect(() => {
    fetchDeviceTypesList();
  }, []);

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
                  {deviceId ? "Update Device" : "Create Device"}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {deviceId
                    ? "Update the Device details"
                    : "Fill in the Device details"}
                </Typography>
                <DefaultInput
                  label="IMEI"
                  placeholder="Enter the Device IMEI"
                  value={deviceRequest.imei}
                  error={getError("imei")}
                  smallMessage="Your Device IMEI will be unique"
                  onChange={(e) => handleChange("imei", e.target.value)}
                />
                <DefaultSelect
                  label="Select Version"
                  value={deviceRequest.deviceTypeId?.toString()}
                  onChange={(val) => handleChange("deviceTypeId", val)}
                  options={deviceTypes}
                  loading={selectLoading}
                  error={getError("deviceTypeId")}
                  smallMessage="Select the appropriate version for the device"
                />
                <DefaultTextArea
                  value={deviceRequest.remarque}
                  onChange={(value) => handleChange("remarque", value)}
                  label="Message"
                  error={getError("remarque")}
                  smallMessage="Your message will be recorded"
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
                  fullWidth
                  onClick={handleSubmit}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  {deviceId ? "Update Device" : "Create Device"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
}
