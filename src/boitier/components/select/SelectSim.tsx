
import { useEditVehicleContext } from "@/vehicle/contexts/EditVehicleProvider";
import { Spinner, Typography } from "@material-tailwind/react";
import * as React from "react";
import { ISelectSim } from "@/sim/types/type";
import { getNonInstalledSimsAPI, searchNonInstalledSimsAPI } from "@/sim/SimServices";
import { IMyResponse } from "@/operators/types";
import { useBoitierContext } from "@/boitier/BoitierProvider";

export interface ISelectSimProps {
  error?: string | null;
  sim?: ISelectSim | null;
}

export const SelectSim: React.FC<ISelectSimProps> = ({ error ,sim}) => {
  // Boitier Request provider state
  const { boitierRequest, setBoitierRequest } = useBoitierContext();
  // Open dropdown state
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // Field error provider state
  const { removeFieldError } = useBoitierContext();
  // Handel Toggle Dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  // Select Sim local state
  const [simsList, setSimsList] = React.useState<ISelectSim[]>([]);
  // Search loading local state
  const [loading, setLoading] = React.useState<boolean>(false);
  // Search message local state
  const [message, setMessage] = React.useState<string | undefined>("");

  // Handle select function
  const handleSelect = (simId: number) => {
    removeFieldError("simId");
    setBoitierRequest({
      ...boitierRequest,
      simId: simId,
    });
    setIsOpen(false);
  };

  // Search term state
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // On search function
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (message) {
      setMessage("");
    }
    setSearchTerm(e.target.value);
    searchedSimList(e.target.value, 1, 10);
  };


  /**
   * Function to search SIM in non-installed sims
   * @param term 
   * @param page 
   * @param size 
   */
  const searchedSimList = async (
    term: string,
    page: number,
    size: number
  ) => {
    setSimsList([]);
    setLoading(true);
    // Call the API to search SIM in non-installed sims
    searchNonInstalledSimsAPI(term, page, size)
      .then((res: IMyResponse) => {
        // If the response data is null, set the message to No SIM found
        // This API not return null, but he retrun error 404 when not sim found
        res.data === null ? setMessage("No SIM found") : setSimsList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching SIM list", err);
        setMessage("No SIM found");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Fetch SIM list non-installed
   * @param {number} page
   * @param {number} size
   * @returns {void}
   */

  const fetchSimList = async (page: number, size: number) => {
    setSimsList([]);
    setLoading(true);
    getNonInstalledSimsAPI(page, size)
      .then((res: IMyResponse) => {
        res.data === null ? setMessage("No SIM found") : setSimsList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching SIM list", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // UseEffect to fetch the client list
  React.useEffect(() => {
    searchTerm === ""
      ? fetchSimList(1, 10)
      : searchedSimList(searchTerm, 1, 10);
  }, [searchTerm]);

  React.useEffect(() => {
    if (sim) {
      // Check if the device already exists in the list
      const exists = simsList.some((s) => s.id === sim.id);

      if (!exists) {
        // Add the device to the list if it doesn't exist
        setSimsList((prevList) => [...prevList, sim]);
      }
    }
  }, [sim, simsList]);

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
          {boitierRequest.simId === null
            ? `Select a Sim`
            : simsList.find(
                (option: ISelectSim) => option.id === boitierRequest.simId
              )?.phone}
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
                {simsList.map((sim: ISelectSim) => (
                  <li
                    key={sim.id}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      handleSelect(sim.id);
                    }}
                  >
                    <p className="text-base font-semibold">{sim.phone}</p>
                    <small className="block text-sm text-gray-500">
                      {sim.ccid}
                    </small>
                    <small className="block text-sm text-gray-500">
                      {sim.operatorName}
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
          Select a client from the list required
        </Typography>
      )}
    </div>
  );
};
