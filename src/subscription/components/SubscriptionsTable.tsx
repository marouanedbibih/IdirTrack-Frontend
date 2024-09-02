import React from "react";
import {
  CardBody,
  Spinner,
  Typography,
  Chip,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useFetchListOfSubscriptions } from "../hooks/useFetchSubscription";
import { SubscriptionTableDTO } from "../subscription";
import { SmallTextTable } from "@/components/text/SmallTextTable";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Pagination from "@/components/pagination/Pagination";
import DefaultSelect from "@/components/inputs/DefaultSelect";

// Define the interface for the component's props
interface SubscriptionsTableProps {}

// Define the table head
const TABLE_HEAD = [
  "Boitier",
  "Matricule",
  "Client",
  "Date Start",
  "Date End",
  "Day Left",
];

// Table Sizes
const sizes = [
  { id: 5, name: "5" },
  { id: 10, name: "10" },
  { id: 20, name: "25" },
  { id: 50, name: "50" },
  { id: 100, name: "100" },
];

// Define the SubscriptionsTable component
export const SubscriptionsTable: React.FC<
  SubscriptionsTableProps
> = ({}: SubscriptionsTableProps) => {
  // Fetch states from the Hooks
  const {
    fetchListOfSubscriptions,
    loading,
    pagination,
    subscriptionsList,
    setPagination,
  } = useFetchListOfSubscriptions();

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

  // Set the chip value
  const setChipValue = (timeLeft: string) => {
    switch (timeLeft) {
      case "left":
        return "Left";
      default:
        return timeLeft;
    }
  };

  // Handle change function
  const onChangeSize = (key: string, value: string | number) => {
    // Convert to number if the key is "deviceTypeId"
    if (key === "size") {
      value = Number(value);
    }
    // Update the Device request state
    setPagination({ ...pagination, [key]: value });
  };

  return (
    <CardBody
      className="px-0"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex-1 p-4 w-1/5">
        <DefaultSelect
          label="Select Size"
          value={pagination.size.toString()}
          onChange={(val) => onChangeSize("size", val)}
          options={sizes}
          loading={false}
          smallMessage="Select the Size of the table"
          className="w-60"
        />
      </div>
      <table className="w-full min-w-max table-auto text-left">
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
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading.table ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <div className="w-full flex flex-1 justify-center items-center">
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </td>
            </tr>
          ) : subscriptionsList && subscriptionsList.length > 0 ? (
            subscriptionsList.map((subscription: SubscriptionTableDTO) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={subscription.id}>
                  <td className={classes}>
                    <div className="">
                      <SmallTextTable text={subscription.imei} />
                      <SmallTextTable text={subscription.phone} />
                    </div>
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={subscription.matricule} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={subscription.clientName} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={subscription.startDate} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={subscription.endDate} />
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        value={setChipValue(subscription.timeLeft)}
                        color={setChipColor(subscription.status)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onPageChange={(page) => {
          setPagination({ ...pagination, currentPage: page });
        }}
      />
    </CardBody>
  );
};
