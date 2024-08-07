import {
  getClientForSelect,
  searchClientForSelect,
} from "@/services/ClientService";
import { BasicResponse } from "@/types/Basics";
import { Client } from "@/types/StaffTypes";
import { Spinner, Typography } from "@material-tailwind/react";
import * as React from "react";
import { useEditVehicleContext } from "../contexts/EditVehicleProvider";

export interface ISelectClientProps {
  error?: string | null;
}

export const SelectClient: React.FC<ISelectClientProps> = ({ error }) => {
  // Open dropdown state
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Handel Toggle Dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Client list state
  const [clientsList, setClientsList] = React.useState<Client[]>([]);

  // Search loading local state
  const [searchLoading, setSearchLoading] = React.useState<boolean>(false);

  // Search message local state
  const [searchMessage, setSearchMessage] = React.useState<string | undefined>(
    ""
  );

  // Vehicle request provider state
  const { vehicleRequest, setVehicleRequest } = useEditVehicleContext();

  // Reset the client list
  const resetClientList = () => {
    setClientsList([]);
  };

  /**
   * Fetch the client list
   */
  const fetchClientList = async (page: number, size: number) => {
    getClientForSelect(page, size)
      .then((data) => {
        setClientsList(data.content);
      })
      .catch((data: BasicResponse) => {
        console.log(data);
      });
  };

  // Handle select function
  const handleSelect = (client: Client) => {
    // Set the selected client ID
    setVehicleRequest({
      ...vehicleRequest,
      clientId: client.clientMicroserviceId,
    });
    // Close the dropdown
    setIsOpen(false);
  };

  // Search term state
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  /**
   * HANDLE SEARCH FUNCTION
   *
   * This function is handel the search clien in select input
   * Set the search term
   * Call the fetchSearchedClientList function
   *
   * @param e - The event object of the input field
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetClientList();

    // Idf search message is not empty, clear it
    if (searchMessage) {
      setSearchMessage("");
    }
    // Set the search term
    setSearchTerm(e.target.value);
    // Call the fetchSearchedClientList function
    fetchSearchedClientList(e.target.value, 1, 5);
  };

  /**
   * FETCH SEARCHED CLIENT LIST
   *
   * This function is handel the search clien in select input
   * Call the API to search for clients by name or company
   * Then set loading to true
   * If the search is successful, set the clients list
   * If the search is unsuccessful, set the search message
   * Finally, set the search loading to false
   *
   * @api GET /user-api/list-for-create-vehicle/search/
   * @param term - The search term
   * @param page - The page number
   * @param size - The page size
   * @returns void
   * @throws void
   */
  const fetchSearchedClientList = async (
    term: string,
    page: number,
    size: number
  ) => {
    // Set the search loading to true
    setSearchLoading(true);

    // Call the search client for select API
    searchClientForSelect(term, page, size)
      .then((data) => {
        // Set Clients list
        setClientsList(data.content);
      })
      .catch((data: BasicResponse) => {
        // Set the search message
        setSearchMessage(data.message);
      })
      .finally(() => {
        // Set the search loading to false
        setSearchLoading(false);
      });
  };

  // UseEffect to fetch the client list
  React.useEffect(() => {
    if (searchTerm === "") {
      fetchClientList(1, 5);
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
          {vehicleRequest.clientId === 0
            ? `Select a Client`
            : clientsList.find(
                (option) =>
                  option.clientMicroserviceId === vehicleRequest.clientId
              )?.name}
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
                {clientsList.map((client) => (
                  <li
                    key={client.clientMicroserviceId}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      handleSelect(client);
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
          className="flex justify-center font-bold text-red-500 "
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
