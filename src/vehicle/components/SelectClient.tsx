import {
  getClientForSelect,
  searchClientForSelect,
} from "@/services/ClientService";
import { BasicResponse } from "@/types/Basics";
import { Client } from "@/staff/type";
import { Spinner, Typography } from "@material-tailwind/react";
import * as React from "react";
import { useEditVehicleContext } from "../contexts/EditVehicleProvider";
import { ICLientDropdown } from "../types/type";
import { getClientsForDropdown } from "@/client/ClientService";
import { IMyResponse } from "@/operators/types";
import { IMyErrResponse } from "@/types";

export interface ISelectClientProps {
  error?: string | null;
}

export const SelectClient: React.FC<ISelectClientProps> = ({ error }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [clientsList, setClientsList] = React.useState<ICLientDropdown[]>([]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [message, setMessage] = React.useState<string | undefined>("");

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const { vehicleRequest, setVehicleRequest } = useEditVehicleContext();

  const resetClientList = () => {
    setClientsList([]);
  };

  // Fetch list of clients for select dropdown
  const fetchClientsList = async () => {
    setLoading(true);
    getClientsForDropdown()
      .then((res: IMyResponse) => {
        setClientsList(res.data);
      })
      .catch((err: IMyErrResponse) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle select function
  const handleSelect = (clientId: number) => {
    setVehicleRequest({
      ...vehicleRequest,
      clientId: clientId,
    });
    setIsOpen(false);
  };

  // Search term state
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // Search client for dropdown list
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetClientList();
    if (message) {
      setMessage("");
    }
    setSearchTerm(e.target.value);
    // fetchSearchedClientList(e.target.value, 1, 5);
  };

  // UseEffect to fetch the client list
  React.useEffect(() => {
    if (searchTerm === "") {
      fetchClientsList();
    }
  }, [searchTerm]);

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
          {vehicleRequest.clientId === null
            ? `Select a Client`
            : clientsList.find(
                (option) => option.id === vehicleRequest.clientId
              )?.name}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full  bg-white border border-gray-300 rounded-md shadow-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={onSearch}
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
                {clientsList.map((client) => (
                  <li
                    key={client.id}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      handleSelect(client.id);
                    }}
                  >
                    <p className="text-base font-semibold">{client.name}</p>
                    <small className="block text-sm text-gray-500">
                      {client.company}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {error ? (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-red-500 "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {error}
        </Typography>
      ) : (
        <Typography
          variant="small"
          className="flex justify-start font-bold text-blue-gray-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Select a client from the list required
        </Typography>
      )}
    </div>
  );
};
