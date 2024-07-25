import FormField from "@/components/form/FormField";
import SelectField from "@/components/form/SelectField";
import {
  Button,
  Card,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { FormEvent, useEffect } from "react";
import { useDeviceContext } from "../contexts/DeviceProvider";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { error } from "console";

export const DeviceForm: React.FC = () => {
  const {
    deviceFormData,
    setDeviceFormData,
    deviceTypes,
    fetchDeviceTypes,
    createDevice,
    setIsCreateDeviceModalOpen,
    message,
    resetMessage,
    fetchDeviceById,
    deviceId,
    updateDevice,
    setDeviceId,
  } = useDeviceContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Device Form Data Details", deviceFormData);
    if (message) {
      console.log("Device Errors", message.messagesObject);
    }

    if (deviceId != 0) {
      console.log("Update device");
      updateDevice(deviceId, deviceFormData);
    } else {
      createDevice(deviceFormData);
    }
  };

  const handleModalClose = () => {
    setIsCreateDeviceModalOpen(false);
    resetMessage();
    setDeviceId(0);
  };

  useEffect(() => {
    if (deviceId != 0) {
      fetchDeviceById(deviceId);
    }
    fetchDeviceTypes(1, 10);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full h-full"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Card
        className="w-2/5 max-w-md p-4  "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          variant="text"
          color="white"
          className="absolute top-2 right-2 "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={handleModalClose}
        >
          <XMarkIcon className="h-6 w-6" color="red" />
        </Button>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full gap-4 flex flex-col mt-4"
        >
          <div className="w-full">
            <FormField
              label="IMEI"
              placeholder="Enter IMEI"
              type="text"
              value={deviceFormData.imei as string}
              onChange={(e) => {
                setDeviceFormData({ ...deviceFormData, imei: e.target.value });
                if (message?.messagesObject?.imei) {
                  message.messagesObject.imei = null;
                }
              }}
              error={message?.messagesObject?.imei}
            />
          </div>

          <div className="w-72">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Select Device Type
            </Typography>
            <Select
              size="lg"
              label="Select Device"
              onChange={(val) =>
                setDeviceFormData({
                  ...deviceFormData,
                  deviceTypeId: parseInt(val as string),
                })
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              error={message.messagesObject?.deviceTypeId ? true : false}
            >
              <Option value={""} disabled>
                Select Device Type
              </Option>
              {deviceTypes.map(({ id, name }) => (
                <Option
                  key={id}
                  value={id.toString()}
                  className="flex items-center gap-2"
                >
                  {name}
                </Option>
              ))}
            </Select>
            <small className="text-red-500">
              {message?.messagesObject?.deviceTypeId}
            </small>
          </div>
          <FormField
            label="Remarque"
            placeholder="Enter IMEI"
            type="text"
            value={deviceFormData.remarque as string}
            onChange={(e) => {
              setDeviceFormData({
                ...deviceFormData,
                remarque: e.target.value,
              });
            }}
          />
          <Button
            className="flex items-center gap-3"
            type="submit"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="green"
          >
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
};
