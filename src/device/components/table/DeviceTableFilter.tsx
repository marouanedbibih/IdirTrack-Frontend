import React, { useEffect } from "react";

// @material-tailwind/react
import {
  Button,
  Typography,
  Chip,
  Radio,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
  Bars4Icon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDeviceContext } from "@/device/contexts/DeviceProvider";

//status: INSTALLED, NON_INSTALLED, LOST, DAMAGED
const status = ["INSTALLED", "NON_INSTALLED", "LOST", "DAMAGED"];

const DeviceTableFilter = () => {
  const {deviceTypes,fetchDeviceTypes} = useDeviceContext();

  useEffect(() => {
    fetchDeviceTypes(1, 20);
  }, []);


  const [filters, setFilters] = useState({
    
    type: "",
    status: "",
  });

  useEffect(() => {
    // onFilter(filters);
  }, [filters]);

  const handleTypeChange = (type) => {
    setFilters((prevFilters) => ({ ...prevFilters, type }));
  };

  const handleStatusChange = (status) => {
    setFilters((prevFilters) => ({ ...prevFilters, status }));
  };
  return (
    <section className="container mx-auto py-20 px-4">
      
      <div className="flex justify-between md:items-center gap-y-4 flex-col md:flex-row">
      </div>
      <div className="!mt-4 border-gray-300 pt-2 border-t grid lg:grid-cols-2 grid-cols-1 items-center gap-y-2">
        <div className="w-full lg:max-w-md">
          <div className="flex flex-wrap gap-x-4">
            <Radio
              defaultChecked
              name="type"
              containerProps={{
                className: "-ml-3",
              }}
              label={
                <Typography
                  color="blue-gray"
                  variant="small"
                  className="font-medium"
                >
                  All
                </Typography>
              }
            />
            <Radio
              name="type"
              label={
                <Typography
                  color="blue-gray"
                  variant="small"
                  className="font-medium text-gray-600"
                >
                  Files
                </Typography>
              }
            />
            <Radio
              name="type"
              containerProps={{
                className: "-ml-3 md:ml-0",
              }}
              label={
                <Typography
                  color="blue-gray"
                  variant="small"
                  className="font-medium text-gray-600"
                >
                  Payments
                </Typography>
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-2 lg:!ml-auto">
          <Menu>
            <MenuHandler>
              <Button
                variant="outlined"
                className="flex items-center gap-2 border-gray-300"
              >
                status
                <ChevronDownIcon strokeWidth={3} className="w-3 h-3" />
              </Button>
            </MenuHandler>
            <MenuList>
              {status.map((status) => (
                <MenuItem key={status} onClick={() => setFilters({...filters,status})}>{status}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuHandler>
              <Button
                variant="outlined"
                className="flex items-center gap-2 border-gray-300"
              >
                Type
                <ChevronDownIcon strokeWidth={3} className="w-3 h-3" />
              </Button>
            </MenuHandler>
            <MenuList>
              {deviceTypes.map((deviceType) => (
                <MenuItem key={deviceType.id}>{deviceType.name }</MenuItem>
              ))}
            </MenuList>
          </Menu>
          <div className="md:flex hidden gap-2">
            <IconButton variant="outlined" className="border-gray-300">
              <Bars4Icon
                strokeWidth={2.5}
                className="w-4 h-4 text-gray-900"
              />
            </IconButton>
            <IconButton variant="outlined" className="border-gray-300">
              <Squares2X2Icon className="w-4 h-4 text-gray-900" />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeviceTableFilter;