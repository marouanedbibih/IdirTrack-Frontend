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
  IconButton,
} from "@material-tailwind/react";

import { BasicResponse } from "@/types/Basics";

import { Select, Option } from "@material-tailwind/react";
import { useDeviceContext } from "@/device/contexts/DeviceProvider";
import {
  createDeviceAPI,
  filterDevicesAPI,
  getDeviceByIdAPI,
  updateDeviceAPI,
} from "@/device/services/DeviceService";
import {
  DeviceStatus,
  IDeviceFilter,
  IDeviceRequest,
} from "@/device/types/Device";
import { DefaultInput } from "@/components/inputs/DefaultInput";
import {
  getAllDeviceTypesListAPI,
  getListOfAllDeviceTypesAPI,
} from "@/device/services/DeviceTypeService";
import TextArea from "@/components/inputs/DefaultTextArea";
import DefaultTextArea from "@/components/inputs/DefaultTextArea";
import DefaultSelect from "@/components/inputs/DefaultSelect";
import DateInput from "@/components/inputs/DateInput";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDeviceFunctionsContext } from "@/device/contexts/DeviceFunctionsProvider";

export interface IDeviceFilterProps {}

export default function DeviceFilter(props: IDeviceFilterProps) {
  // Open Filter Form provider state
  const { openFilterForm, handleOpenFilterForm } = useDeviceContext();
  // Loading local state management
  const [loading] = React.useState<boolean>(false as boolean);
  // Device Filter provider state
  const { deviceFilter, setDeviceFilter } = useDeviceContext();
  // Select Loading local state management
  const [selectLoading, setSelectLoading] = React.useState<boolean>(false);
  // Select Device Type provider state
  const { deviceTypes, setDeviceTypes } = useDeviceContext();
  // Devices List provider state
  const { setDevicesList } = useDeviceContext();
  // Table Loading provider state
  const { setTableLoading } = useDeviceContext();
  // Display Status provider state
  const { setDisplayStatus } = useDeviceContext();
  // On Change Display Status provider state
  const { onChangeDisplayStatus } = useDeviceContext();

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

  React.useEffect(() => {
    fetchDeviceTypesList();
  }, []);

  // Handle change function
  const handleChange = (key: string, value: string | number) => {
    // Convert to number if the key is "deviceTypeId"
    if (key === "deviceTypeId") {
      value = Number(value);
    }
    // Update the Device request state
    setDeviceFilter({ ...deviceFilter, [key]: value });
  };

  // Get the Device Status list
  const getDeviceStatusOptions = () => {
    return Object.values(DeviceStatus).map((status, index) => ({
      id: status.toLocaleLowerCase(), // Using index as the id for simplicity
      name: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(), // Capitalize the first letter
    }));
  };

  // Search term provider state
  const { searchTerm, setSearchTerm } = useDeviceContext();
  const onFilter = () => {
    if (searchTerm) {
      setSearchTerm("");
    }
    console.log(deviceFilter);
    onChangeDisplayStatus("filter");
    setDevicesList([]);
    setTableLoading(true);
    handleOpenFilterForm();
  };

  // Reset device filter provider state
  const { resetDeviceFilter } = useDeviceContext();

  // On Filter Reset
  const onFilterReset = () => {
    resetDeviceFilter();
    setDevicesList([]);
    setTableLoading(true);
    setDisplayStatus({
      filter: false,
      search: false,
      normal: true,
    });
    handleOpenFilterForm();
  };

  return (
    <>
      <Dialog
        size="xs"
        open={openFilterForm}
        handler={handleOpenFilterForm}
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
                  Filter Devices
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Filter the Devices by Status, Type, Created From and Created
                  To
                </Typography>
                <IconButton
                  size="sm"
                  variant="text"
                  className="!absolute right-3.5 top-3.5"
                  onClick={handleOpenFilterForm}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
                <DefaultSelect
                  label="Select Version"
                  value={deviceFilter.type.toString()}
                  onChange={(val) => handleChange("type", val)}
                  options={deviceTypes}
                  loading={selectLoading}
                  smallMessage="Select the appropriate version for the device"
                />
                <DefaultSelect
                  label="Select Status"
                  value={deviceFilter.status.toLowerCase()} // Ensure the value is in lowercase
                  onChange={(val) => handleChange("status", val)}
                  options={getDeviceStatusOptions()}
                  loading={selectLoading}
                  smallMessage="Select the appropriate status for the device"
                />
                {/* <DateInput
                //   label="Created From"
                //   value={deviceFilter.createdFrom}
                //   onChange={(val) => handleChange("createdFrom", val)}
                />
                <DateInput
                //   label="Created To"
                //   value={deviceFilter.createdTo}
                //   onChange={(val) => handleChange("createdTo", val)}
                /> */}
              </CardBody>
              <CardFooter
                className="pt-0"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div className="flex flex-row justify-between items-center w-full gap-4">
                  <Button
                    variant="gradient"
                    fullWidth
                    onClick={onFilterReset}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="red"
                  >
                    Reset
                  </Button>
                  <Button
                    variant="gradient"
                    fullWidth
                    onClick={onFilter}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="green"
                  >
                    Filter
                  </Button>
                </div>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
}
