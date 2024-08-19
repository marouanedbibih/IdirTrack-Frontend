import axiosClient from "@/api/axiosClient";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import * as React from "react";
import { DeviceStatus } from "../types/DeviceType";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useDeviceTypeContext } from "../contexts/DeviceTypeProvider";
import { getDeviceQuantityOfStatusAPI } from "../services/DeviceService";

export interface IDevicesStatistiquesProps {}
const TABLE_HEAD = ["Status", "Total Devices"];

interface DeviceStatusCount {
  status: DeviceStatus;
  totalDevices: number;
}

export default function DevicesStatistiques(props: IDevicesStatistiquesProps) {
  const getStatusColor = (status: DeviceStatus) => {
    switch (status) {
      case DeviceStatus.INSTALLED:
        return "green";
      case DeviceStatus.NON_INSTALLED:
        return "amber";
      case DeviceStatus.LOST:
        return "red";
      case DeviceStatus.PENDING:
        return "gray";
      default:
        return "gray";
    }
  };

  const [tableLoading, setTableLoading] = React.useState<boolean>(false);
  const [DevicesList, setDevicesList] = React.useState<DeviceStatusCount[]>([]);

  const fetchStatusWithQuantity = async () => {
    try {
      const data = await getDeviceQuantityOfStatusAPI();
      console.log("Get device quantity of status Response", data);
      // Mapping the API response to the expected format
      setDevicesList([
        {
          status: DeviceStatus.INSTALLED,
          totalDevices: data.content.installed,
        },
        {
          status: DeviceStatus.NON_INSTALLED,
          totalDevices: data.content.nonInstalled,
        },
        { status: DeviceStatus.LOST, totalDevices: data.content.lost },
        { status: DeviceStatus.PENDING, totalDevices: data.content.pending },
      ]);
    } catch (error) {
      console.error("Get device quantity of status Error", error);
    } finally {
      setTableLoading(false);
    }
  };

  React.useEffect(() => {
    setTableLoading(true);
    fetchStatusWithQuantity();
  }, []);




  return (
    <div className="flex flex-col justify-center items-center w-1/2 h-full">
      {tableLoading ? (
        <Spinner
          className="h-8 w-8"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ) : DevicesList && DevicesList.length > 0 ? (
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
                        className="font-normal leading-none opacity-70"
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
                {DevicesList.map(({ status, totalDevices }, index) => {
                  const isLast = index === DevicesList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            value={status}
                            color={getStatusColor(status)}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          placeholder={undefined}
                        >
                          {totalDevices} Devices
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
}
