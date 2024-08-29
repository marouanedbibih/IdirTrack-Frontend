/* eslint-disable react-hooks/exhaustive-deps */
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
import { useOperatorContext } from "../context/OperatorProvider";
import { IOperatorRequest } from "../types/type";
import {
  createOperatorAPI,
  getOperatorByIdAPI,
  updateOperatorAPI,
} from "../OperatorService";
import { IMyErrorResponse, IMyResponse } from "../types";

export interface IOperatorFormProps {}

export default function OperatorForm(props: IOperatorFormProps) {
  // Open Modal Form provider state
  const { openForm, handleOpenForm } = useOperatorContext();

  // Size provider state
  //   const { size, setSize } = useOperatorContext();

  // Operator Request provider state
  const { operatorRequest, setOperatorRequest } = useOperatorContext();

  // Errors provider state
  const { errors, setErrors } = useOperatorContext();

  // Loading local state management
  const [loading, setLoading] = React.useState<boolean>(false as boolean);

  // Alert provider state management
  const { setAlertOpen } = useOperatorContext();

  // Message provider state management
  const { setMessage } = useOperatorContext();

  // Reset the Operator request
  const { resetOperatorRequest } = useOperatorContext();

  // Operator ID provider state management
  const { operatorId, setOperatorId } = useOperatorContext();

  // Fetch the fetch Operator list provider state
  const { fetchOperatorsList } = useOperatorContext();

  // Pagination provider state
  const { pagination, setPagination } = useOperatorContext();

  // Error provider state
  const { error, setError } = useOperatorContext();

  // Handel change function
  const handleChange = (field: string, value: string | number) => {
    // Update the Operator request state
    setOperatorRequest({ ...operatorRequest, [field]: value });

    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.field !== field));
  };

  // Function to get the error message for a specific field
  const getError = (field: string) => {
    const error = errors.find((error) => error.field === field);
    return error ? error.message : "";
  };

  /**
   * Create a new Operator
   * @returns void
   */
  const createOperator = (payload: IOperatorRequest) => {
    // Set the loading to true
    setLoading(true);
    console.log(operatorRequest);
    createOperatorAPI(payload)
      .then((data) => {
        console.log(data);
        // Reset the Operator request
        resetOperatorRequest();
        // Close the form
        handleOpenForm();
        // Set the message
        setMessage({
          message: data.message,
          messageType: data.messageType,
        });
        // Set the alert open
        setAlertOpen(true);
        // Fetch the Operator list
        fetchOperatorsList(1, pagination.size);
      })
      .catch((data: IMyErrorResponse) => {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * GET Operator BY ID
   *
   * This function handel the get Operator by id
   *
   * @param {number} id The id of the Operator to get
   */
  const getOperatorById = (id: number) => {
    setLoading(true);
    getOperatorByIdAPI(id)
      .then((res:IMyResponse) => {
        console.log(res);
        setOperatorRequest({
          name: res.data.name
        });
      })
      .catch((data: IMyErrorResponse) => {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }


      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * UPDATE Operator
   *
   * This function handel the update Operator
   * @param {number} id The id of the Operator to update
   * @param {OperatorRequest} Operator The Operator request object
   * @returns void
   * @throws BasicResponse
   */

  const updateOperator = (id: number, payload: IOperatorRequest) => {
    setLoading(true);
    updateOperatorAPI(id, payload)
      .then((data) => {
        console.log(data);
        // Set message
        setMessage({
          message: data.message,
          messageType: data.messageType,
        });
        // Set alert open
        setAlertOpen(true);
        // Close the form
        handleOpenForm();
        // Fetch the Operator list
        fetchOperatorsList(1, pagination.size);
      })
      .catch((data: IMyErrorResponse) => {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Handel submit form function to create or update Operator
   * @returns void
   * @throws BasicResponse
   * @see createOperator
   * @see updateOperator
   */

  const handleSubmit = () => {
    if (operatorId) {
      updateOperator(operatorId, operatorRequest);
    } else {
      createOperator(operatorRequest);
    }
  };

  React.useEffect(() => {
    console.log("Error list", errors);
  }, [errors]);

  React.useEffect(() => {
    if (operatorId) {
      getOperatorById(operatorId);
    }
  }, [operatorId]);

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
                  {operatorId ? "Edit Operator" : "Create Operator"}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {operatorId ? "Edit the Operator" : "Create a new Operator"}
                </Typography>
                <DefaultInput
                  label="Name"
                  placeholder="Enter the Operator name"
                  value={operatorRequest.name}
                  error={getError("name")}
                  smallMessage="Your Operator will be unique"
                  onChange={(e) => handleChange("name", e.target.value)}
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
                  onClick={handleSubmit}
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  {operatorId ? "Update" : "Create "}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
}
