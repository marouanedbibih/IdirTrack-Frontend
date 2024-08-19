import { useStaffContext } from "@/context/StaffProvider";
import {
  getClientForSelect,
  searchClientForSelect,
} from "@/services/ClientService";
import { BasicResponse } from "@/types/Basics";
import { Client } from "@/types/StaffTypes";
import { useEditVehicleContext } from "@/vehicle/contexts/EditVehicleProvider";
import { Spinner, Typography } from "@material-tailwind/react";
import * as React from "react";
import { DeviceBoitier } from "../BoitierDTO";
import {
  getNotInstalledDevices,
  searchNotInstalledDevices,
} from "../BoitierService";
import { getDeviceByIdApi } from "@/device/DeviceService";

export interface ISelectDeviceProps {
  error?: string | null;
  simId?: number;
}

export const SelectDevice: React.FC<ISelectDeviceProps> = ({ error }) => {
  // Boitier Request provider state
  const { boitierRequest, setBoitierRequest } = useEditVehicleContext();

  // Open dropdown state
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Handle Toggle Dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Device list state
  const [devicesList, setDevicesList] = React.useState<DeviceBoitier[]>([]);

  // Search loading local state
  const [searchLoading, setSearchLoading] = React.useState<boolean>(false);

  // Search message local state
  const [searchMessage, setSearchMessage] = React.useState<string | undefined>(
    ""
  );

  // Device Boitiert local state
  const [deviceBoitier, setDeviceBoitier] = React.useState<DeviceBoitier>({
    deviceMicroserviceId: 0,
    imei: "",
    type: "",
  });

  // Selected Updated Boitier ID provider state
  const { setSelectedUpdatedBoitierId, selectedUpdatedBoitierId } =
    useEditVehicleContext();

  // Device Microservice ID
  const { deviceMicroserviceId } = boitierRequest;

  /**
   * Fetch Device list with status pending
   * @param page Page number
   * @param size Page size
   */
  const fetchDeviceList = async (page: number, size: number) => {
    setSearchLoading(true);
    getNotInstalledDevices(page, size)
      .then((data) => {
        setDevicesList(data.content);
      })
      .catch((data: BasicResponse) => {
        console.log(data);
        setSearchMessage(data.message);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  // Handle select function
  const handleSelect = (device: DeviceBoitier) => {
    // Set the selected device ID
    setBoitierRequest({
      ...boitierRequest,
      deviceMicroserviceId: device.deviceMicroserviceId,
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
    if (searchMessage) {
      setSearchMessage("");
    }
    // Set the search term
    setSearchTerm(e.target.value);
    // Call the fetchSearchDeviceList function
    fetchSearchedDeviceList(e.target.value, 1, 10);
  };

  /**
   * Fetch Searched Device List
   * Call the API to search for devices by IMEI or type
   * @param term The search term
   * @param page The page number
   * @param size The page size
   */
  const fetchSearchedDeviceList = async (
    term: string,
    page: number,
    size: number
  ) => {
    // Set the search loading to true
    setSearchLoading(true);

    searchNotInstalledDevices(term, page, size)
      .then((data) => {
        setDevicesList(data.content);
      })
      .catch((data: BasicResponse) => {
        setSearchMessage(data.message);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  // UseEffect to fetch the device list
  React.useEffect(() => {
    if (searchTerm === "") {
      fetchDeviceList(1, 10);
    }
  }, [searchTerm]);

  /**
   * RETRIEVE DEVICE BY ID
   */

  const retrieveDeviceById = async (id: number) => {
    getDeviceByIdApi(id)
      .then((data) => {
        // Set the fetched device
        const fetchedDevice: DeviceBoitier = {
          deviceMicroserviceId: data.content.id,
          imei: data.content.imei,
          type: data.content.deviceType,
        };
        setDeviceBoitier(fetchedDevice);
        // add the device to the device list
        setDevicesList((prev) => [...prev, fetchedDevice]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Device retrieved successfully");
      });
  };

  /**
   * HANDLE DEVICE IN UPDATE
   */
  const handleDeviceInUpdate = async () => {
    if (deviceMicroserviceId) {
      retrieveDeviceById(deviceMicroserviceId);
    }
  };

  // UseEffect to handle device in update
  React.useEffect(() => {
    if (selectedUpdatedBoitierId) {
      handleDeviceInUpdate();
    }
  }, [selectedUpdatedBoitierId]);

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
          {boitierRequest.deviceMicroserviceId === null
            ? `Select a Device`
            : devicesList.find(
                (option) =>
                  option.deviceMicroserviceId ===
                  boitierRequest.deviceMicroserviceId
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
            {searchLoading ? (
              <div className="w-full h-10 flex flex-1 justify-center items-center">
                <Spinner
                  className="h-8 w-8"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
            ) : searchMessage ? (
              <Typography
                variant="small"
                className="flex justify-start font-bold text-red-500 "
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {searchMessage}
              </Typography>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {devicesList.map((device: DeviceBoitier) => (
                  <li
                    key={device.deviceMicroserviceId}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      handleSelect(device);
                    }}
                  >
                    <p className="text-base font-semibold">{device.imei}</p>
                    <small className="block text-sm text-gray-500">
                      {device.type}
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
