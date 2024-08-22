import * as React from "react";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";

import { DefaultInput } from "@/components/inputs/DefaultInput";

import DefaultSelect from "@/components/inputs/DefaultSelect";
import { useSimContext } from "@/sim/context/SimProvider";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useSimFunctionsContext } from "@/sim/context/SimFunctionsProvider";
import { createSimAPI, getSimByIdAPI, updateSimAPI } from "@/sim/SimServices";
import { IMyErrorResponse, IMyResponse } from "@/operators/types";
import { ISimRequest } from "@/sim/types/type";
import { getAllOperatorsAPI } from "@/operators/OperatorService";
import { MessageType } from "@/types/Basics";

export interface ISimFormProps {}

export default function SimForm(props: ISimFormProps) {
  // Open Modal Form provider state
  const { openForm, handleOpenForm } = useSimContext();
  // Pagination provider state
  const { pagination, setPagination } = useSimContext();
  // Sim Request provider state
  const { simRequest, setSimRequest } = useSimContext();
  // Errors provider state
  const { fieldErrors, setFieldErrors } = useSimContext();
  // Alert provider state management
  const { setAlertOpen } = useGlobalContext();
  // Message provider state management
  const { setMessage } = useGlobalContext();
  // Device ID provider state management
  const { simId} = useSimContext();
  // List of operators provider state management
  const { operatorList, setOperatorList } = useSimContext();
  // Loading local state
  const [loading, setLoading] = React.useState<boolean>(false);
  // Import the reFetchSimList function from the SimFunctionsProvider
  const { reFetchSimList } = useSimFunctionsContext();

  // Handle change function
  const handleChange = (field: string, value: string | number) => {
    // Convert to number if the field is "deviceTypeId"
    if (field === "operatorId") {
      value = Number(value);
    }
    // Update the Device request state
    setSimRequest({ ...simRequest, [field]: value });
    // Clear the error for this field if any
    setFieldErrors(
      fieldErrors.filter((fieldError) => fieldError.field !== field)
    );
  };

  // Function to get the error message for a specific field
  const getError = (field: string) => {
    const fieldError = fieldErrors.find(
      (fieldError) => fieldError.field === field
    );
    return fieldError ? fieldError.message : "";
  };



  /**
   * Fetch SIM by ID
   * @param {number} id
   * @returns void
   * @throws IMyErrorResponse
   */

  const fetchSimById = (id: number | null) => {
    getSimByIdAPI(id)
      .then((res: IMyResponse) => {
        setSimRequest({
          ccid: res.data.ccid,
          operatorId: res.data.operatorId,
          phone: res.data.phone,
          pin: res.data.pin,
          puk: res.data.puk,
        });
      })
      .catch((err: IMyErrorResponse) => {
        console.error("Error fetching SIM", err);
      });
  };

  /**
   * Get all operators list
   */
  const fetchAllOperators = () => {
    getAllOperatorsAPI()
      .then((res: IMyResponse) => {
        setOperatorList(res.data);
      })
      .catch((err: IMyErrorResponse) => {
        console.error("Error fetching operators list", err);
      })
      .finally(() => {});
  };

  /**
   * Create SIM
   * @param {ISimRequest} req
   * @returns void
   * @throws IMyErrorResponse
   */
  const createSim = (req: ISimRequest) => {
    setLoading(true);
    createSimAPI(req)
      .then((res: IMyResponse) => {
        setMessage({
          message: res.message,
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        handleOpenForm();
        reFetchSimList();
      })
      .catch((err: IMyErrorResponse) => {
        console.error("Error creating SIM", err);
        setFieldErrors(err.fieldErrors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Update Sim function
   * @param {number} id
   * @param {ISimRequest} req
   * @returns void
   * @throws IMyErrorResponse
   */
  const updateSim = (id: number, req: ISimRequest) => {
    setLoading(true);
    updateSimAPI(id, req)
      .then((res: IMyResponse) => {
        setMessage({
          message: res.message,
          messageType: MessageType.INFO,
        });
        setAlertOpen(true);
        handleOpenForm();
        reFetchSimList();
      })
      .catch((err: IMyErrorResponse) => {
        console.error("Error creating SIM", err);
        setFieldErrors(err.fieldErrors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Handle submit form function to create or update Device
   * @returns void
   * @throws BasicResponse
   * @see createDevice
   * @see updateDevice
   */
  const handleSubmit = () => {
    if (simId) {
      updateSim(simId, simRequest);
    } else {
      createSim(simRequest);
    }
    console.log(simRequest);
  };

  // Use effect to fetch the Device by ID
  React.useEffect(() => {
    if (simId) {
      fetchSimById(simId);
    }
  }, [simId]);
  // Use effect to fetch the Device Types list
  React.useEffect(() => {
    fetchAllOperators();
  }, []);

  return (
    <>
      <Dialog
        size="xs"
        open={openForm}
        handler={handleOpenForm}
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
                  {simId ? "Update Device" : "Create Device"}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {simId
                    ? "Update the Device details"
                    : "Fill in the Device details"}
                </Typography>
                <DefaultSelect
                  label="Select Version"
                  value={simRequest.operatorId?.toString()}
                  onChange={(val) => handleChange("operatorId", val)}
                  options={operatorList}
                  loading={false}
                  error={getError("operatorId")}
                  smallMessage="Select the appropriate version for the device"
                />
                <DefaultInput
                  label="Phone"
                  placeholder="Enter the Sim Phone"
                  value={simRequest.phone}
                  error={getError("phone")}
                  smallMessage="Your Phone number will be unique"
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <DefaultInput
                  label="CCID"
                  placeholder="Enter the Sim CCID"
                  value={simRequest.ccid}
                  error={getError("ccid")}
                  smallMessage="Your CCID will be unique"
                  onChange={(e) => handleChange("ccid", e.target.value)}
                />
                <DefaultInput
                  label="PIN"
                  placeholder="Enter the Sim PIN"
                  value={simRequest.pin}
                  error={getError("pin")}
                  smallMessage="Your Sim PIN will be unique"
                  onChange={(e) => handleChange("pin", e.target.value)}
                />
                <DefaultInput
                  label="PUK"
                  placeholder="Enter the Sim PUK"
                  value={simRequest.puk}
                  error={getError("puk")}
                  smallMessage="Your Sim PUK will be unique"
                  onChange={(e) => handleChange("puk", e.target.value)}
                />
              </CardBody>
              <CardFooter
                className="pt-0"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={handleSubmit}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  {simId ? "Update Device" : "Create Device"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
}
