import { useEditVehicleContext } from "@/vehicle/contexts/EditVehicleProvider";
import { Spinner, Typography } from "@material-tailwind/react";
import * as React from "react";
import { ISelectDevice } from "@/device/types/DeviceType";
import { IMyResponse } from "@/operators/types";
import {
  getNonInstalledDevices,
  searchNonInstalledDevices,
} from "@/device/services/DeviceService";
import { useBoitierContext } from "@/boitier/BoitierProvider";

export interface ISelectDeviceProps {
  error?: string | null;
  device?: ISelectDevice | null;
}

export const SelectDevice: React.FC<ISelectDeviceProps> = ({ error,device }) => {
  // Boitier Request provider state
  const { boitierRequest, setBoitierRequest } = useBoitierContext();
  // Open dropdown state
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // Field error provider state
  const { removeFieldError } = useBoitierContext();
  // Handle Toggle Dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  // Device list state
  const [devicesList, setDevicesList] = React.useState<ISelectDevice[]>([]);
  // Loading local state
  const [loading, setLoading] = React.useState<boolean>(false);
  // Search message local state
  const [message, setMessage] = React.useState<string | undefined>("");

  // Fetch list of devices non installed
  const fetchDeviceList = async (page: number, size: number) => {
    setDevicesList([]);
    setLoading(true);
    getNonInstalledDevices(page, size)
      .then((res: IMyResponse) => {
        res.data === null
          ? setMessage("No device found")
          : setDevicesList(res.data);
      })
      .catch((err) => {
        console.log("Error fetching devices", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle select function
  const handleSelect = (deviceId: number) => {
    removeFieldError("deviceId");
    // Set the selected device ID
    setBoitierRequest({
      ...boitierRequest,
      deviceId: deviceId,
    });
    // Close the dropdown
    setIsOpen(false);
  };

  // Search term state
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  /**
   * Handle Search Function
   * Set the search term and call the fetchSearchedDeviceList function
   * @param e The event object of the input field
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If search message is not empty, clear it
    if (message) {
      setMessage("");
    }
    // Set the search term
    setSearchTerm(e.target.value);
    // Call the fetchSearchDeviceList function
    searchedDeviceList(e.target.value, 1, 10);
  };

  // Search non installed devices
  const searchedDeviceList = async (
    term: string,
    page: number,
    size: number
  ) => {
    setDevicesList([]);
    setLoading(true);
    searchNonInstalledDevices(term, page, size)
      .then((res: IMyResponse) => {
        res.data === null
          ? setMessage("No device found")
          : setDevicesList(res.data);
      })
      .catch((err: any) => {
        console.log("Error fetching devices", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // UseEffect to fetch the device list
  React.useEffect(() => {
    searchTerm === ""
      ? fetchDeviceList(1, 10)
      : searchedDeviceList(searchTerm, 1, 10);
  }, [searchTerm]);

  // Update device list
  React.useEffect(() => {
    if (device) {
      // Check if the device already exists in the list
      const exists = devicesList.some((d) => d.id === device.id);

      if (!exists) {
        // Add the device to the list if it doesn't exist
        setDevicesList((prevList) => [...prevList, device]);
      }
    }
  }, [device, devicesList]);

  return (
    <div className="mb-1 flex flex-col gap-2 ">
      <div className="w-full relative ">
        <button
          onClick={toggleDropdown}
          className={`w-full h-full bg-transparent font-sans font-normal text-left outline-none transition-all border-2 text-sm px-3 py-3 rounded-[7px] ${
            error
              ? "border-red-500 text-red-500"
              : "border-gray-900 text-blue-gray-700"
          }`}
        >
          {boitierRequest.deviceId === null
            ? `Select a Device`
            : devicesList.find(
                (option: ISelectDevice) => option.id === boitierRequest.deviceId
              )?.imei}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full  bg-white border border-gray-300 rounded-md shadow-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className={`w-full px-3 py-2 border-b ${
                error
                  ? "border-red-500 placeholder-red-500"
                  : "border-gray-300 placeholder-gray-500"
              }`}
            />
            {loading ? (
              <div className="w-full h-10 flex flex-1 justify-center items-center">
                <Spinner
                  className="h-8 w-8"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
            ) : message ? (
              <Typography
                variant="small"
                className="flex justify-start font-bold text-red-500 "
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {message}
              </Typography>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {devicesList.map((device: ISelectDevice) => (
                  <li
                    key={device.id}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      handleSelect(device.id);
                    }}
                  >
                    <p className="text-base font-semibold">{device.imei}</p>
                    <small className="block text-sm text-gray-500">
                      {device.deviceType}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {error ? (
        <div className="flex flex-1 justify-start items-center">
          <Typography
            variant="small"
            className="flex justify-center font-bold text-red-500 "
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {error}
          </Typography>
        </div>
      ) : (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-blue-gray-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Select a device from the list required
        </Typography>
      )}
    </div>
  );
};
