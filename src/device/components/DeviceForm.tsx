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

export const DeviceForm: React.FC = () => {
  const {
    deviceFormData,
    setDeviceFormData,
    deviceTypes,
    fetchDeviceTypes,
    createDevice,
    setIsCreateDeviceModalOpen
  } = useDeviceContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Device Form Data Details", deviceFormData);
    createDevice(deviceFormData);
  };

  const handleModalClose = () => {
    setIsCreateDeviceModalOpen(false);
  }

  useEffect(() => {
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
          <FormField
            label="IMEI"
            placeholder="Enter IMEI"
            type="text"
            value={deviceFormData.imei}
            onChange={(e) => {
              setDeviceFormData({ ...deviceFormData, imei: e.target.value });
            }}
          />
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
              label="Select Country"
              // selected={(element) =>
              //   element &&
              //   React.cloneElement(element, {
              //     disabled: true,
              //     className:
              //       "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
              //   })
              // }
              onChange={(val) =>
                setDeviceFormData({
                  ...deviceFormData,
                  deviceTypeId: parseInt(val),
                })
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
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
          </div>
          <FormField
            label="Remarque"
            placeholder="Enter IMEI"
            type="text"
            value={deviceFormData.remarque}
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
