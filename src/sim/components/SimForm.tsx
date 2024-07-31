import FormField from "@/components/form/FormField";
import SelectField from "@/components/form/SelectField";
import {
  Button,
  Card,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { FormEvent, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { error } from "console";
import { useSimContext } from "../SimProvider";

export const SimForm: React.FC = () => {
  const {
    sim,
    setSim,
    operators,
    fetchOperators,
    createSim,
    setIsCreateSimModalOpen,
    message,
    resetMessage,
    // fetchSimById,
    simId,
    // updateSim,
    setSimId,
    fetchSimById,
    updateSim,
  } = useSimContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (simId != null) {
      console.log("Update sim");
      updateSim(simId, sim);
    } else {
      createSim(sim);
    }
  };

  const handleModalClose = () => {
    setIsCreateSimModalOpen(false);
    resetMessage();
    setSimId(0);
  };

  useEffect(() => {
    if (simId != null) {
      fetchSimById(simId);
    }
    fetchOperators(1, 10);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full h-full"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Card
        className="w-2/5 max-w-md p-4  "
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          variant="text"
          color="white"
          className="absolute top-2 right-2 "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={handleModalClose}
        >
          <XMarkIcon className="h-6 w-6" color="red" />
        </Button>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full gap-4 flex flex-col mt-4"
        >
          <div className="w-full">
            <FormField
              label="CCID"
              placeholder="Enter IMEI"
              type="text"
              value={sim.ccid as string}
              onChange={(e) => {
                setSim({
                  ...sim,
                  ccid: e.target.value,
                });
              }}
              error={message?.messagesObject?.ccid}
            />
          </div>

          <div className="w-full">
            <FormField
              label="Phone"
              placeholder="Enter IMEI"
              type="text"
              value={sim.phone as string}
              onChange={(e) => {
                setSim({
                  ...sim,
                  phone: e.target.value,
                });
              }}
              error={message?.messagesObject?.phone}
            />
          </div>

          <div className="w-full">
            <FormField
              label="PIN"
              placeholder="Enter IMEI"
              type="text"
              value={sim.pin as string}
              onChange={(e) => {
                setSim({
                  ...sim,
                  pin: e.target.value,
                });
              }}
              error={message?.messagesObject?.pin}
            />
          </div>

          <div className="w-full">
            <FormField
              label="PUK"
              placeholder="Enter IMEI"
              type="text"
              value={sim.puk as string}
              onChange={(e) => {
                setSim({
                  ...sim,
                  puk: e.target.value,
                });
              }}
              error={message?.messagesObject?.puk}
            />
          </div>
          <div className="w-72">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Select Operator
            </Typography>
            <Select
              size="lg"
              label="Select Operator"
              onChange={(val) =>
                setSim({
                  ...sim,
                  operatorId: parseInt(val as string),
                })
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              error={message.messagesObject?.deviceTypeId ? true : false}
            >
              <Option value={""} disabled>
                Select Operator
              </Option>
              {operators.map(({ id, name }) => (
                <Option
                  key={id}
                  value={id.toString()}
                  className="flex items-center gap-2"
                >
                  {name}
                </Option>
              ))}
            </Select>
            <small className="text-red-500">
              {message?.messagesObject?.operatorId}
            </small>
          </div>
          <Button
            className="flex items-center gap-3"
            type="submit"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="green"
          >
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
};
