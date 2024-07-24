import { Card } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useCreateVehicleContext } from "@/contexts/CreateVehicleProvider";
import { SelectOption } from "@/types/SelectOption";

function DeviceSelect() {
  const [value, setValue] = useState<string>("default");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { devices, fetchDevices } = useCreateVehicleContext();

  useEffect(() => {
    fetchDevices();
  }, []);

  const options: SelectOption[] = devices.map((device) => ({
    id: device.deviceMicroserviceId?.toString(),
    name: device.imei,
  }));

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (val: string) => {
    setValue(val);
    setIsOpen(false);
    console.log("Select device value:", val);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();  // Prevent the default action
    setIsOpen(!isOpen);
  };
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <Card
      color="white"
      shadow={false}
      className="w-full rounded-xl p-4 flex flex-col"
    >
      <div className="w-full relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline-none transition-all border-2 text-sm px-3 py-3 rounded-[7px] border-gray-900"
          >
            {value === "default" ? "Select a Device" : options.find(option => option.id === value)?.name}
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 border-b border-gray-300"
            />
            <ul className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(option.id)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}

export default DeviceSelect;
