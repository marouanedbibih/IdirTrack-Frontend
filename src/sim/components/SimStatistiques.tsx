import axiosClient from "@/api/axiosClient";
import {
  Card,
  CardBody,
  Chip,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import * as React from "react";
import { SimStatus } from "../types/type";
import { getTotalSimCountByStatusAPI } from "../SimServices";
import { getDeviceQuantityOfStatusAPI } from "@/device/services/DeviceService";
import { IMyResponse } from "@/operators/types";

export interface ISimStatistiquesProps {}
const TABLE_HEAD = ["Status", "Total Devices"];

interface SimStatusCount {
  status: SimStatus;
  totalSims: number;
}

export default function SimStatistiques(props: ISimStatistiquesProps) {
  const getStatusColor = (status: SimStatus) => {
    switch (status) {
      case SimStatus.INSTALLED:
        return "green";
      case SimStatus.NON_INSTALLED:
        return "amber";
      case SimStatus.LOST:
        return "red";
      case SimStatus.PENDING:
        return "gray";
      default:
        return "gray";
    }
  };

  const [tableLoading, setTableLoading] = React.useState<boolean>(false);
  const [simsList, setSimsList] = React.useState<SimStatusCount[]>([]);

  const fetchStatusWithQuantity = async () => {
    setTableLoading(true);
    getTotalSimCountByStatusAPI()
      .then((res: IMyResponse) => {
        setSimsList([
          {
            status: SimStatus.INSTALLED,
            totalSims: res.data.installed,
          },
          {
            status: SimStatus.NON_INSTALLED,
            totalSims: res.data.nonInstalled,
          },
          { status: SimStatus.LOST, totalSims: res.data.lost },
          { status: SimStatus.PENDING, totalSims: res.data.pending },
        ]);
      })
      .catch((error) => {
        console.error("Get device quantity of status Error", error);
      })
      .finally(() => {
        setTableLoading(false);
      });
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
      ) : simsList && simsList.length > 0 ? (
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
                {simsList.map(({ status, totalSims }, index) => {
                  const isLast = index === simsList.length - 1;
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
                            color={getStatusColor(status)}
                            className="font-extrabold"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-extrabold"
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          placeholder={undefined}
                        >
                          {totalSims} Devices
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
