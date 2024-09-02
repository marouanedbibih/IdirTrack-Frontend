import React from "react";

import {
  Card,
  CardBody,
  Chip,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { getSubscriptionStatisticsByTimeLeftAPI } from "../SubscriptionService";
import { set } from "date-fns";
import { IMyResponse } from "@/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useFetchSubscriptionStatisticsByTimeLeft } from "../hooks/useFetchSubscription";
interface SubscripitonStatistiquesProps {}

const TABLE_HEAD = ["Status", "Total Subscriptions"];

export const SubscripitonStatistiques: React.FC<
  SubscripitonStatistiquesProps
> = () => {
  // Set color for the chip
  const setChipColor = (status: string) => {
    switch (status) {
      case "current":
        return "green";
      case "close":
        return "yellow";
      case "left":
        return "red";
      default:
        return "gray";
    }
  };

  const { data, tableLoading, total } =
    useFetchSubscriptionStatisticsByTimeLeft();
  return (
    <div className="flex flex-col justify-center items-center w-1/2 h-full">
      {tableLoading ? (
        <Spinner
          className="h-8 w-8"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : data && data.length > 0 ? (
        <Card
          className="h-full w-full"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
        >
          <CardBody
            className="px-0 h-full"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <div className="flex justify-start items-center w-full px-4">
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-bold"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                placeholder={undefined}
              >
                Total Subscriptions: {total}
              </Typography>
            </div>
            <table className="w-full min-w-max table-auto text-left h-full">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="leading-none opacity-70 font-bold"
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        placeholder={undefined}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map(({ status, totalSubscriptions }, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="lg"
                            value={status}
                            color={setChipColor(status)}
                            className="font-extrabold"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-medium"
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          placeholder={undefined}
                        >
                          {totalSubscriptions} Subscription
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      ) : (
        <Typography
          color="gray"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
        >
          No DeviceType Found
        </Typography>
      )}
    </div>
  );
};
